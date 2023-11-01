
const form = document.getElementById('form')
campoNome = document.getElementById('nome')
campoEmail = document.getElementById('email')
campoComentario = document.getElementById('comentario')
botao = document.getElementById('botaoenviar')

fechaCarregando()

function comentar(){
	iniciaCarregando()
	enviaComentario(campoNome.value,campoEmail.value,campoComentario.value)
}

function enviaComentario(nome, email, comentario){
	firebase.firestore().collection('comentarios-web').add({
		"nome": nome,
		"email": email,
		"comentario": comentario,
		"curtidas": 0
	}).then((val) => (fechaCarregando(),
			campoComentario.value = "",
			campoEmail.value = "",
			campoNome.value = "",
			carregaComentarios())
	).catch((err) => console.error(err));
}

function iniciaCarregando(){
	document.getElementById("load-comentar").style.display = "inline"
	campoComentario.disabled = true
	campoNome.disabled = true
	campoEmail.disabled = true
	botao.disabled = true
}

function fechaCarregando(){
	document.getElementById('load-comentar').style.display = "none"
	campoComentario.disabled = false
	campoNome.disabled = false
	campoEmail.disabled = false
	botao.disabled = false
}

function carregaComentarios(){
	document.getElementById('load-comentarios').style.display = "inline"
	firebase.firestore().collection('comentarios-web').get()
	.then(snapshot => {
		const comentarios = snapshot.docs.map(doc => doc.data())
		criaComentario(comentarios)
	})
	document.getElementById('load-comentarios').style.display = "none"
}

carregaComentarios()

function criaComentario(coment)
{
	var secao = document.getElementById("comentarios")
	secao.innerText = ""
	for(i=0; i < coment.length; i++){
		var div = document.createElement("div")
		var comentario = document.createElement("p")
		
		comentario.innerHTML = coment[i].nome +": " +coment[i].comentario
	
		div.appendChild(comentario)
		secao.appendChild(div)
	}
}