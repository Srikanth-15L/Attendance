document.addEventListener('DOMContentLoaded', () => {

    // ========== EmailJS Configuration ==========
    // IMPORTANT: Replace these with your actual EmailJS credentials
    const EMAILJS_PUBLIC_KEY = 'ufo1P3z1gyJ4jteWa';
    const EMAILJS_SERVICE_ID = 'service_k5b8pzz';
    const EMAILJS_TEMPLATE_ID = 'template_le6qlx7';

    // Initialize EmailJS
    emailjs.init(EMAILJS_PUBLIC_KEY);

    // Time updating
    const updateTime = () => {
        const now = new Date();
        const timeEl = document.getElementById('current-time');
        const dateEl = document.getElementById('current-date');
        
        timeEl.textContent = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
        dateEl.textContent = now.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' });
    };
    
    updateTime();
    setInterval(updateTime, 1000);

    // Button event listeners
    const btnPresent = document.getElementById('btn-present');
    const btnLogout = document.getElementById('btn-logout');

    const handleAction = async (button, type, successMessage) => {
        const textSpan = button.querySelector('.btn-text');
        const spinner = button.querySelector('.spinner');
        
        // UI Loading state
        button.disabled = true;
        textSpan.classList.add('hidden');
        spinner.classList.remove('hidden');

        try {
            const timeStr = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
            
            let subject, message;
            if (type === 'login') {
                subject = 'Login update';
                message = `Dear HR Team,\n\nI am writing to confirm my attendance for Today \nEmp Id: CIN-73880\nLogin Time: ${timeStr}\n\n\n\nRegards,\nSrikanth Pandaraboina\nPhone: +91 8340032723\nEmail: srikanthpandaraboina38@gmail.com\n`;
            } else {
                subject = 'Logout Update';
                message = `Dear HR Team,\n\nI am writing to confirm my attendance for Today \nEmp Id: CIN-73880\nLogout Time: ${timeStr}\n\n\n\nRegards,\nSrikanth Pandaraboina\nPhone: +91 8340032723\nEmail: srikanthpandaraboina38@gmail.com\n`;
            }

            await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
                to_email: 'n.poojitha098@gmail.com',
                from_name: 'Srikanth Pandaraboina',
                subject: subject,
                message: message
            });

            showToast(successMessage);
        } catch (error) {
            console.error('Error:', error);
            alert('Failed to send email: ' + (error.text || error.message || 'Unknown error'));
        } finally {
            // Restore UI state
            button.disabled = false;
            textSpan.classList.remove('hidden');
            spinner.classList.add('hidden');
        }
    };

    btnPresent.addEventListener('click', () => {
        handleAction(btnPresent, 'login', 'Login email sent successfully!');
    });

    btnLogout.addEventListener('click', () => {
        handleAction(btnLogout, 'logout', 'Logout email sent successfully!');
    });

    // Toast logic
    const showToast = (message) => {
        const toast = document.getElementById('toast');
        const toastMsg = document.getElementById('toast-message');
        
        toastMsg.textContent = message;
        toast.classList.remove('hidden');
        
        // small delay for css parsing 
        setTimeout(() => toast.classList.add('show'), 10);
        
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.classList.add('hidden'), 400); // waiting for transition
        }, 3000);
    };
});
