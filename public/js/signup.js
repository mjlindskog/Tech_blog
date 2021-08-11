const signupFormHandler = async (event) => {
    event.preventDefault();
  
    const username = document.querySelector('#name-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
  
    if (username && email && password) {
      const response = await fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify({ username, email, password }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        alert('Account made!');
        document.location.replace('/dashboard');
      } else {
        let result = await response.json()
        alert(result.message);
      }
    }
};

document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);