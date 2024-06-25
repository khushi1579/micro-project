document.getElementById('symptomForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const symptoms = document.getElementById('symptoms').value.toLowerCase();
    let result = '';
    if (symptoms.includes('headache')) {
        result += 'For headache, you can take ibuprofen or acetaminophen. Rest and stay hydrated.<br>';
    }
    if (symptoms.includes('fever')) {
        result += 'For fever, take acetaminophen or ibuprofen, and stay hydrated. See a doctor if it persists.<br>';
    }
    if (symptoms.includes('cough')) {
        result += 'For cough, try a cough suppressant or expectorant. Honey and warm fluids can help soothe the throat.<br>';
    }
    if (result === '') {
        result = 'Please consult a healthcare professional for proper diagnosis and treatment.';
    }
    document.getElementById('result').innerHTML = result;
});
document.getElementById('consultDoctorButton').addEventListener('click', function() {
    document.getElementById('appointmentFormContainer').classList.add('show');
});
document.getElementById('appointmentForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const date = document.getElementById('date').value;
    const time = document.getElementById('time').value;
    // Basic email validation (can be improved)
    if (!isValidEmail(email)) {
        alert('Please enter a valid email address.');
        return;
    }
    // Process appointment booking (example placeholder)
    alert(`Appointment booked for ${name} on ${date} at ${time}. Confirmation sent to ${email}.`);
    // Hide the appointment form
    document.getElementById('appointmentFormContainer').classList.remove('show');
});
// Simple email validation function
function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}