const $ = window.jQuery;

function loadApp(){
  let token = localStorage.getItem('was_token');
  
  if (!token) {
    window.location.href='http://localhost:3000/login';
  }
}

function logout() {
  localStorage.removeItem('was_token')
  window.location.href = 'http://localhost:3000/login';
}
