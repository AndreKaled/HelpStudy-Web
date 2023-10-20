

const list = JSON.parse(localStorage.getItem("flashcards"))||[];
const lista = document.getElementById('lista');
const form = document.getElementById("criarFlashcard");

list.forEach(element => {
    criarElemento(element);
});

form.addEventListener('submit', function(evento){
    evento.defaultPrevented();
    
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
        itens[itens.findIndex( elemento => elemento.id === existe.id)] = itemAtual;
    }else{
        itemAtual.id = itens[itens.length-1] ? (itens[itens.length-1].id) +1 : 0
        criarElemento(itemAtual);

        //armazenando dados no localstorage do navegador
        //adicionando na lista
        list.push(itemAtual);
    }

     //adicionando lista no localstorage, com chave e valor
     localStorage.setItem("itens", JSON.stringify(itens));

}
);

//criando e adicionando elemento com os dados na lista
function criarElemento(item){
    const novoItem = document.createElement('li');

    novoItem.classList.add('item');

    const nomeItem = document.createElement('strong');
    nomeItem.innerHTML = item.titulo;

    //adicionando id do elemento para fazer busca e atualização
    nomeItem.dataset.id = item.id;

    novoItem.appendChild(nomeItem);
    novoItem.innerHTML += item.resposta;

    novoItem.appendChild(botaoDeletar(item.id));

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

    return elementBotao
}

function deletaElemento(tag, id){
    //remove item da lista
    tag.remove();

    //removendo item do array e sobreescrevendo o localstorage
    itens.splice(itens.findIndex( elemento => elemento.id === id), 1);
    console.log(itens)
    localStorage.setItem("flashcards", JSON.stringify(itens));
}