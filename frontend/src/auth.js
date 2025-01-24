function checkAuth() {
    document.addEventListener('DOMContentLoaded', () => {
        const token = localStorage.getItem('authToken');
        // console.log('Token from localStorage:', token);

        const publicPages = ['login-user.html', 'index.html'];  // Add pages that don't need auth
        const currentPage = window.location.pathname.split('/').pop();

        if (!token && !publicPages.includes(currentPage)) {
            window.location.href = 'login-user.html';
        }
    });
}

checkAuth();
