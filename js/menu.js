"use strict"


// nav h2 como selecionar no JS 
const botaoMenu = document.querySelector("nav h2");



// selecionando a lista/menu através da classe 
const menu = document.querySelector(".menu");



// Selecionando link que está dentro do nav h2
const textoBotao = botaoMenu.querySelector("a")


botaoMenu.addEventListener("click", function (event){


    /*  Anular/prevenir o comportamento do link */
    event.preventDefault();
    menu.classList.toggle("aberto");
})