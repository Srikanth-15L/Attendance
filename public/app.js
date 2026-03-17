document.addEventListener('DOMContentLoaded', () => {
    
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

    const handleAction = async (button, endpoint, successMessage) => {
        const textSpan = button.querySelector('.btn-text');
        const spinner = button.querySelector('.spinner');
        
        // UI Loading state
        button.disabled = true;
        textSpan.classList.add('hidden');
        spinner.classList.remove('hidden');

        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' }
            });
            
            const data = await response.json();
            
            if (response.ok && data.success) {
                showToast(successMessage);
                // Optionally update the status indicator logic here
            } else {
                alert(`Error: ${data.message}`);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Failed to connect to the server.');
        } finally {
            // Restore UI state
            button.disabled = false;
            textSpan.classList.remove('hidden');
            spinner.classList.add('hidden');
        }
    };

    btnPresent.addEventListener('click', () => {
        handleAction(btnPresent, '/api/login', 'Login email sent successfully!');
    });

    btnLogout.addEventListener('click', () => {
        handleAction(btnLogout, '/api/logout', 'Logout email sent successfully!');
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
