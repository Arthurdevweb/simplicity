"use strict"

const formulario = document.querySelector("form");
const campoCep = formulario.querySelector("#cep");
const campoEndereco =  formulario.querySelector("#endereco");
const campoBairro = formulario.querySelector("#bairro");
const campoCidade = formulario.querySelector("#cidade");
const campoEstado = formulario.querySelector("#estado");
const botaoBuscar = formulario.querySelector("#buscar");
const mensagem = formulario.querySelector("#status");

// Seleção do campo telefone usando JS puro 
const campoTelefone = formulario.querySelector("#telefone");

// Seleção do campo telefone usando jQuery
// const campoTelefone = $("#telefone");


// Ativando a máscara para o telefone 

$(campoTelefone).mask("(00) 00000-0000")









// Detectando o evento de CLICK no botão buscar


botaoBuscar.addEventListener("click", async function(event){
    event.preventDefault();

    let cep; // undefined

    /* Vereficando se o CEP não tem 8 dígitos */

    if(campoCep.value.length !== 8){
        // Alerte o usuário sobre o erro de digitação
        mensagem.textContent = "Digite um CEP válido!";
        mensagem.style.color = "red"
      
        
        //Para a execução
        return;

    } else {
        // Caso contrário (ou seja, tem 8 dígitos), guarde o valor
        cep = campoCep.value;
    }

    /* Técnica de comunicação assíncrona para acessar uma API (www.viacep.com.br) */

    //Etapa 1: preparar a URL da API com o CEP digitado
    const url = `http://viacep.com.br/ws/${cep}/json/`;

   // Etapa 2: acessar a API (com a URL) e aguardar o retorno dela 

   const resposta = await fetch(url);

   // Etapa 3: exttrair os dados da resposta em formato JSON
   const dados = await resposta.json();


   //Etapa 4: Lidar com os dados de resposta (em caso de erro ou sucesso)

   if("erro" in dados ){
    mensagem.textContent = "CEP inexistente";
    mensagem.style.color = "orange"
    
   } else {
    mensagem.textContent = "CEP encontrado"
    mensagem.style.color = "green"


    campoEndereco.value = dados.logradouro;
    campoBairro.value = dados.bairro
    campoCidade.value =  dados.localidade
    campoEstado.value =  dados.uf
   }
})


/* programação do Formspree */

async function handleSubmit(event) {
  event.preventDefault();
  var status = document.getElementById("my-form-status");
  var data = new FormData(event.target);
  fetch(event.target.action, {
    method: formulario.method,
    body: data,
    headers: {
        'Accept': 'application/json'
    }
  }).then(response => {
    if (response.ok) {
      status.innerHTML = "Obrigado por entrar em contato conosco, retornarememos em breve";
      formulario.reset()
    } else {
      response.json().then(data => {
        if (Object.hasOwn(data, 'errors')) {
          status.innerHTML = data["errors"].map(error => error["message"]).join(", ")
        } else {
          status.innerHTML = "Percebemos um erro, tente novamente mais tarde"
        }
      })
    }
  }).catch(error => {
    status.innerHTML = "Percebemos um erro, tente novamente mais tarde"
  });
}
formulario.addEventListener("submit", handleSubmit)