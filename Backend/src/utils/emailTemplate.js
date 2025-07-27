const BookingConformationTemplate = function (username, Location, Checkin_date, Checkout_date) {
    return `<h2>Hello ${username},</h2>
     <p>Thank you for your booking!</p>
     <h3>Booking Details:</h3>
     <ul>
         <li><strong>Property:</strong> property- ${Location}</li>
         <li><strong>Check-in:</strong> ${Checkin_date}</li>
         <li><strong>Check-out:</strong> ${Checkout_date}</li>
     </ul>
     <p>If you have any questions, feel free to reach out to our support team.</p>
     <p>We hope you have a great stay!</p>`
};

const PaymentConformationTemplate = function (username, Location, Status, Amount) {
    return `<h2>Hello, ${username}</h2>
    <p>Your payment has been successfully processed!</p>
    <h3>Payment Details:</h3>
    <ul>
        <li><strong>Property:</strong> ${Location}</li>
        <li><strong>Payment status:</strong> ${Status}</li>
        <li><strong>Amount:</strong> ₹${Amount}</li>
    </ul>
    <p>Thank you for choosing us!</p>
    <p>We look forward to hosting you soon.</p>`
};

const ResetPasswordConformationTemplate = function(username, link){
    return `<h2>Hello, ${username}</h2>
    <p>Reset password link :-</p>
    <ul>
        <li><strong>Reset link:</strong> ${link}</li>
    </ul>`
};

module.exports = {
    BookingConformationTemplate,
    PaymentConformationTemplate,
    ResetPasswordConformationTemplate,
};