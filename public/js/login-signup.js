const loginFormHandler = async (event) => {
    event.preventDefault();
  
    // get values from the login form
    const email = document.querySelector('#email-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();
  
    if (email && password) {
      // POST request to the API endpoint
      const response = await fetch('/api/users/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        // If successful, redirect the browser to the profile page
        document.location.replace('/dashboard');
      } else {
        let result = await response.json()
        alert(result.message);
      }
    }
};
  
document.querySelector('.login-form').addEventListener('submit', loginFormHandler);
