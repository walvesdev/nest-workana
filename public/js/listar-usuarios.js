const $ = window.jQuery;

document.addEventListener('DOMContentLoaded', async () => {
  await loadData();
});

async function loadData() {
  fetch('http://localhost:3000/usuario', {
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('was_token')}`,
    },
  }).then(response => {
      
      response.json().then(usuarios => {
        renderizarUsuarios(usuarios);
      }).catch(error => console.log(error));
      
  });
}

function renderizarUsuarios(usuarios) {
  const userList = document.querySelector('#userTable tbody');

  usuarios.forEach((usuario) => {

    const html = ` <tr>
                              <td>${usuario.nome}</td>
                              <td>${usuario.email}</td>
                              <td>
                                     <a href="http://localhost:3000/usuario/cadastro/${usuario._id}">Editar</a> |
                                     <a href="#" onclick="deletar('${usuario._id}')">Excluir</a>
                              </td>
                          </tr>`;
    userList.insertAdjacentHTML('beforeend', html);
  });
}

function deletar(id) {
  fetch(`http://localhost:3000/usuario/cadastro/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('was_token')}`,
    },
  }).then(async response => {
    alert('Excluído com sucesso!');
    window.location.href = 'http://localhost:3000/usuario/listar';
  });
}

function loadApp() {
  let token = localStorage.getItem('was_token');
  if (!token) {
    window.location.href = 'http://localhost:3000/login';
  }
}

function logout() {
  localStorage.removeItem('was_token')
  window.location.href = 'http://localhost:3000/login';
}