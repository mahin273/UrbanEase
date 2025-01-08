axios.interceptors.request.use((request) => {
    console.log('Starting Request:', request);
    return request;
});

axios.interceptors.response.use((response) => {
    console.log('Response:', response);
    return response;
});

const registerForm = document.getElementById('registerForm');

registerForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    console.log('Form submitted'); 

 
    const data = {
        firstname: document.querySelector('[name="firstname"]').value,
        lastname: document.querySelector('[name="lastname"]').value,
        username: document.querySelector('[name="username"]').value,
        nid_num: document.querySelector('[name="nid_num"]').value,
        email: document.querySelector('[name="email"]').value,
        dob: document.querySelector('[name="dob"]').value,
        password: document.querySelector('[name="password"]').value,
        confirmPassword: document.querySelector('[name="confirmPassword"]').value,
    };

    console.log('Form data:', data); 

    if (data.password !== data.confirmPassword) {
        alert('Passwords do not match!');
        return;
    }

    try {
        const response = await axios.post('http://localhost:4001/api/users/register', data, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }, 
        });

        console.log('Response:', response);
        alert('Registration successful! Welcome, ' + data.username + '!');
        window.location.href = 'http://localhost:5173';
        event.target.reset();
    } catch (error) {
        console.error('Error:', error); 
        if (error.response) {
            alert('Error: ' + (error.response.data.error || 'Something went wrong!'));
        } else {
            alert('Error connecting to the server. Please try again later.');
        }
    }
});
