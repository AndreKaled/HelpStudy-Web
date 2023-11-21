

const list = JSON.parse(localStorage.getItem("flashcards"))||[];
const lista = document.getElementById("lista");
const form = document.getElementById("criarFlashcard");

list.forEach(element => {
    criarElemento(element);
});

form.addEventListener('submit', (evento) =>{
    //evento.defaultPrevented()
    
    const titulo_flashcard = evento.target.elements["titulo_flashcard"];
    const resposta_flashcard = evento.target.elements["resposta_flashcard"];
    
    //verificando existencia na lista
    const existe = list.find( (elemento) => elemento.titulo === titulo_flashcard.value);

    const itemAtual = {
        "titulo": titulo_flashcard.value,
        "resposta": resposta_flashcard.value,
    }

    //testando condição de existencia para atualizar ou adicionar
    if(existe){
        itemAtual.id = existe.id
        atualizarItem(itemAtual);
        list[list.findIndex( elemento => elemento.id === existe.id)] = itemAtual;
    }else{
        itemAtual.id = list[list.length-1] ? (list[list.length-1].id) +1 : 0
        criarElemento(itemAtual);

        //armazenando dados no localstorage do navegador
        //adicionando na lista
        list.push(itemAtual);
    }

     //adicionando lista no localstorage, com chave e valor
     localStorage.setItem("flashcards", JSON.stringify(list));

}
);

//criando e adicionando elemento com os dados na lista
function criarElemento(item){

    const novoItem = document.createElement('div');
    const itemFront = document.createElement('div');
    const itemBack = document.createElement('div');
    const conteudoFront = document.createElement('div');
    const conteudoBack = document.createElement('div');

    itemBack.classList.add("resposta");
    itemFront.classList.add("pergunta");
    novoItem.classList.add("flashcard");

    conteudoFront.innerHTML = item.titulo;
    conteudoBack.innerHTML = item.resposta;

    //adicionando id do elemento para fazer busca e atualização
    conteudoFront.dataset.id = item.id;

    itemFront.appendChild(conteudoFront);
    itemBack.appendChild(conteudoBack);
    
    novoItem.appendChild(itemFront);
    novoItem.appendChild(itemBack);

    lista.appendChild(novoItem);
}
function atualizarItem(item){
    document.querySelector("[data-id='"+item.id+"']").innerHTML = item.resposta;
}

//adicionado botoes de exclusao para os itens
function botaoDeletar(id){
    const elementBotao = document.createElement("button");

    elementBotao.innerText = "X"

    elementBotao.addEventListener("click", function(){
        deletaElemento(this.parentNode, id)
    })
    elementBotao.classList.add("botao-flash")

    return elementBotao
}

function deletaElemento(tag, id){
    //remove item da lista
    tag.remove();

    //removendo item do array e sobreescrevendo o localstorage
    list.splice(list.findIndex( elemento => elemento.id === id), 1);
    console.log(list)
    localStorage.setItem("flashcards", JSON.stringify(list));
}