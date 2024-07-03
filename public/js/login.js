document.getElementById('loginForm').addEventListener('submit', async (event) => {
  event.preventDefault();
  const formData = new FormData(event.target);
  const credentials = {
    email: formData.get('email'),
    senha: formData.get('senha'),
  };

  try {
    const response = await fetch('http://localhost:3000/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });

    if (response.ok) {
      
      response.json().then(data => {
        localStorage.setItem("was_token", data.token);
        window.location.href='http://localhost:3000/usuario/listar'
      });
      
    } else {
      window.location.href='http://localhost:3000/';
    }
  } catch (error) {
    window.location.href='http://localhost:3000/';
  }
});