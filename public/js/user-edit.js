﻿const $ = window.jQuery;

const formularioEditar = $('#formulario-editar');
formularioEditar.submit(async function(event) {
  event.preventDefault();

  const dadosUsuario = {
    _id: $('#_id').val(),
    id: $('#id').val(),
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

  fetch(`http://localhost:3000/usuario/cadastro/${dadosUsuario.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(dadosUsuario),
  }).then(response => {
    alert('Altereação efetuada com sucesso!');
    formularioEditar.trigger('reset');
  })
    .catch(error => alert('Erro ao alterar usuario!'));

});

function loadData(id){
  fetch(`http://localhost:3000/usuario/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  }).then(async response => {
    let data = await response.json();
    console.log(data);

    setFormData(data);

  })
    .catch(error => alert('Erro ao obter usuario!'));
}

function setFormData(data) {

  $('#_id').val(data._id);
  $('#id').val(data.id);
  $('#nome').val(data.nome);
  $('#email').val(data.email);
  $('#senha').val(data.senha);
  $('#rua').val(data.endereco.rua);
  $('#bairro').val(data.endereco.bairro);
  $('#numero').val(data.endereco.numero);
  $('#cidade').val(data.endereco.cidade);
  $('#estado').val(data.endereco.estado);
  $('#cep').val(data.endereco.cep);

}