// Mobile Menu Toggle Functionality
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-links');

burger.addEventListener('click', () => {
    nav.classList.toggle('nav-active');
});
// WhatsApp Message Sending Function
function sendToWhatsApp(event) {
    event.preventDefault(); // Form එක නිකම්ම submit වී පිටුව Refresh වීම නවත්වයි

    // පාරිභෝගිකයා ඇතුළත් කළ දත්ත ලබා ගැනීම
    const name = document.getElementById('senderName').value;
    const email = document.getElementById('senderEmail').value;
    const message = document.getElementById('senderMessage').value;

    // ඔබගේ WhatsApp දුරකථන අංකය (94 න් පටන් ගන්න, + ලකුණ එපා)
    const phoneNumber = "94775099361"; // මෙතනට ඔබේ අංකය දාන්න

    // WhatsApp වෙත යවන පණිවිඩය ලස්සනට පෙළගැස්වීම
    const whatsappMessage = `*New Booking Inquiry - Nalaka Rest*%0A%0A*Name:* ${name}%0A*Email:* ${email}%0A*Message:* ${message}`;

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
