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

  console.log(dadosUsuario);

  fetch('http://localhost:3000/usuario/cadastro', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(dadosUsuario),
  }).then(response => alert('Cadartro efetuado com sucesso!'))
    .catch(error => alert('Erro ao cadastral usuario!'))
    .finally(async function() {
      formularioCadastro.trigger('reset');
    });

});
