const $ = window.jQuery;

document.addEventListener("DOMContentLoaded", async () => {
  await loadData();
});

async function loadData(){
  try {
    const response = await fetch("http://localhost:3000/usuario");
    if (response.ok) {
      const usuarios = await response.json();
      renderizarUsuarios(usuarios);
    } else {
      alert("Erro ao buscar usuários.");
    }
  } catch (error) {
    alert("Erro na comunicação com a API:", error);
  }
}

function renderizarUsuarios(usuarios) {
  const userList = document.querySelector("#userTable tbody");

  usuarios.forEach((usuario) => {    
    
    const html = ` <tr>
                              <td>${usuario.nome}</td>
                              <td>${usuario.email}</td>
                              <td>
                                     <a href="http://localhost:3000/usuario/cadastro/${usuario._id}">Editar</a> |
                                     <a href="#" onclick="deletar('${usuario._id}')">Excluir</a>
                              </td>
                          </tr>`;
    userList.insertAdjacentHTML("beforeend", html);
  });
}

function deletar(id) {
  fetch(`http://localhost:3000/usuario/cadastro/${id}`, {
    method: 'DELETE',
  }).then(async response => {
    alert('Excluído com sucesso!');
    window.location.href ="http://localhost:3000/usuario/listar";
  })
    .catch(error => alert('Erro ao excluir usuario!'));
}