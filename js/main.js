const supabaseUrl = 'https://jtwjazpjsnkwprykcwcr.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp0d2phenBqc25rd3ByeWtjd2NyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjAzODE3MTUsImV4cCI6MjAzNTk1NzcxNX0.i3_Nxh7EdcWXIwNGTiwtaqwwfN4RtNGMm7cWUx77A98'
const _supabase = supabase.createClient(supabaseUrl, supabaseKey)

window.onload = async function () {
    const { data, error } = await _supabase.from('users').select()
    if(!error && data.length>0){
        const container = document.getElementById('cards-container');
        data.forEach(user => {
            const card = document.createElement('div');
            card.classList.add('card');
            card.innerHTML = `
                <h3>Name: ${user.name}</h3>
                <h3>Email: ${user.email}</p>
                <h3>Date: ${user.date}</p>
                <h3>Time: ${user.time}</p>
            `;
            container.appendChild(card);
        });
        return;
    }
    const container = document.getElementById('cards-container');
    const card = document.createElement('div');
    card.innerHTML = `
        <p>No Appointments booked for now, Click on Consult Doctor to book new appointment.</p>
    `;
    container.appendChild(card);
}
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
   
    let response = createRecordInDB(name,email,date,time);

    if(response){
        alert(`Appointment booked for ${name} on ${date} at ${time}. Confirmation sent to ${email}.`);
        window.location.href = "index.html";
    }

    // Hide the appointment form
    document.getElementById('appointmentFormContainer').classList.remove('show');
});
// 
async function createRecordInDB(name,email,date,time){
    const { error } = await _supabase.from('users').insert({ name: name, email: email, date:date, time:time });
    console.log(error)
    if(error){
        return false;
    }
    return true;
}
// Simple email validation function
function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
// micro-project;