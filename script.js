// Mobile Menu Toggle Functionality
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-links');

burger.addEventListener('click', () => {
    nav.classList.toggle('nav-active');
});

// WhatsApp Message Sending Function (Updated for Phone Number)
function sendToWhatsApp(event) {
    event.preventDefault(); // Form එක නිකම්ම submit වී පිටුව Refresh වීම නවත්වයි

    // පාරිභෝගිකයා ඇතුළත් කළ දත්ත ලබා ගැනීම
    const name = document.getElementById('senderName').value;
    const phone = document.getElementById('senderPhone').value; // email වෙනුවට phone ලබා ගනී
    const message = document.getElementById('senderMessage').value;

    // ඔබගේ WhatsApp දුරකථන අංකය
    const phoneNumber = "94775099361"; 

    // WhatsApp වෙත යවන පණිවිඩය (Email වෙනුවට Phone Number එක යවයි)
    const whatsappMessage = `*New Booking Inquiry - Nalaka Rest*%0A%0A*Name:* ${name}%0A*Phone Number:* ${phone}%0A*Message:* ${message}`;

    // WhatsApp Link එක සැකසීම
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${whatsappMessage}`;

    // අලුත් Tab එකකින් WhatsApp විවෘත කිරීම
    window.open(whatsappURL, '_blank');
}

// Modal (Pop-up) Functionality
function openModal(modalId) {
    document.getElementById(modalId).style.display = "block";
    document.body.style.overflow = "hidden"; // පිටුපස පිටුව scroll වීම නවත්වයි
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = "none";
    document.body.style.overflow = "auto"; // නැවත scroll කිරීම සක්‍රීය කරයි
}

// කොටුවෙන් පිටත Click කළ විට Pop-up එක වැසීම
window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = "none";
        document.body.style.overflow = "auto";
    }
}

// Google Sheets Reviews Fetching Function
async function fetchReviews() {
    const apiLink = "https://docs.google.com/spreadsheets/d/1nX6doxP8twmodCnWDkvCA-KKRZ_EQqVgfF8coRy4_mc/gviz/tq?tqx=out:json"; // පියවර 2 දී සැදූ API ลින්ක් එක මෙතනට දාන්න
    const container = document.getElementById('review-container');

    try {
        const response = await fetch(apiLink);
        const data = await response.text();
        
        // Google Sheets API එකෙන් එන JSON data එක පිරිසිදු කිරීම
        const json = JSON.parse(data.substr(47).slice(0, -2));
        const rows = json.table.rows;

        // රිවිවුස් Container එක හිස් කිරීම
        container.innerHTML = '';

        if (rows.length === 0) {
            container.innerHTML = '<p class="no-reviews">No reviews yet. Be the first!</p>';
            return;
        }

        // Sheet එකේ තියෙන හැම Row එකක් (Review) සඳහාම Card එකක් සෑදීම
        rows.forEach(row => {
            const name = row.c[1] ? row.c[1].v : "Anonymous"; // Name column (Col B)
            const rating = row.c[2] ? row.c[2].v : 0; // Rating column (Col C)
            const review = row.c[3] ? row.c[3].v : ""; // Review column (Col D)

            // Rating එක අනුව තරු (Stars) සෑදීම
            let starsHtml = '';
            for (let i = 1; i <= 5; i++) {
                if (i <= rating) {
                    starsHtml += '<span class="star-filled">★</span>';
                } else {
                    starsHtml += '<span class="star-empty">☆</span>';
                }
            }

            // Review Card එකේ HTML එක
            const reviewCard = `
                <div class="review-card">
                    <div class="stars">${starsHtml}</div>
                    <p>"${review}"</p>
                    <h4>- ${name}</h4>
                </div>
            `;
            
            // Card එක Container එකට එකතු කිරීම
            container.innerHTML += reviewCard;
        });

    } catch (error) {
        console.error("Error fetching reviews:", error);
        container.innerHTML = '<p class="error-reviews">Unable to load reviews at this moment.</p>';
    }
}

// වෙබ් අඩවිය Load වූ වහාම රිවිවුස් ලබා ගැනීම
window.addEventListener('DOMContentLoaded', fetchReviews);


// On-site Review Submission Function
const reviewForm = document.getElementById('onsiteReviewForm');
const reviewStatus = document.getElementById('reviewStatus');

if (reviewForm) {
    reviewForm.addEventListener('submit', function(event) {
        event.preventDefault(); // පිටුව Refresh වීම නවත්වයි
        reviewStatus.textContent = 'Submitting...';
        
        // Form එකෙන් දත්ත ලබා ගැනීම
        const name = document.getElementById('reviewName').value;
        const rating = document.querySelector('input[name="rating"]:checked').value;
        const review = document.getElementById('reviewMessage').value;
        
        // Google Form එකේ පසුබිම් SUBMIT ลින්ක් එක
        // ඔබ ලබා දුන් ලින්ක් එකෙන් ගත් Form ID එක
        const formId = "1FAIpQLSdq6FG-JM-1XlDV6wp3Ts7dm6muI_kfQUUkkFqJMg18RRtdXg"; 
        const submitUrl = `https://docs.google.com/forms/d/e/${formId}/formResponse`;
        
        // දත්ත යවන ආකෘතිය (Google Form Entry IDs)
        // ඔබ ලබා දුන් ලින්ක් එකෙන් ගත් නිවැරදි IDs මෙහි දමා ඇත
        const formData = new FormData();
        formData.append('entry.1003674076', name);   // Name Entry ID
        formData.append('entry.202819810', rating); // Rating Entry ID
        formData.append('entry.1609009157', review); // Review Entry ID
        
        // Google Form එකට පසුබිමින් දත්ත යැවීම (fetch API හරහා)
        // Note: Google Form එකෙන් CORS error එකක් ආවත්, දත්ත Sheet එකට සේව් වෙනවා.
        fetch(submitUrl, {
            method: 'POST',
            mode: 'no-cors', // CORS ප්‍රශ්නය මඟහරින්න
            body: formData
        })
        .then(() => {
            // සාර්ථක පණිවිඩය
            reviewStatus.textContent = 'Thank you for your review! It will appear on the site soon.';
            reviewStatus.style.color = '#2ecc71'; // Green color
            reviewForm.reset(); // Form එක හිස් කිරීම
            
            // විනාඩි කිහිපයකින් රිවිවුස් නැවත Load කිරීම (අලුත් එක පෙන්වීමට)
            setTimeout(fetchReviews, 2000); 
        })
        .catch((error) => {
            console.error('Error submitting review:', error);
            reviewStatus.textContent = 'Oops! Something went wrong. Please try again later.';
            reviewStatus.style.color = '#e74c3c'; // Red color
        });
    });
}
