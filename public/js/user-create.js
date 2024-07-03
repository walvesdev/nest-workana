const $ = window.jQuery;

const formularioCadastro = $('#formulario-cadastro');
formularioCadastro.submit(async function(event) {
  event.preventDefault();

  const dadosUsuario = {
    nome: $('#nome').val(),
    email: $('#email').val(),
    senha: $('#senha').val(),
    endereco: {
      rua: $('#rua').val(),
      bairro: $('#bairro').val(),
      numero: $('#numero').val(),
      cidade: $('#cidade').val(),
      estado: $('#estado').val(),
      cep: $('#cep').val(),
    },
  };

  fetch('http://localhost:3000/usuario/cadastro', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem("was_token")}`, // notice the Bearer before your token
    },
    body: JSON.stringify(dadosUsuario),
  }).then(response =>{
    alert('Cadartro efetuado com sucesso!');
    window.location.href ="http://localhost:3000/usuario/listar";
  } )
    .catch(error => window.location.href='http://localhost:3000/');

});
