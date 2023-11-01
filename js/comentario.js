
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
			campoNome.value = "")
	).catch((err) => console.error(err));
}

function iniciaCarregando(){
	document.getElementById("load").style.display = "inline"
	campoComentario.disabled = true
	campoNome.disabled = true
	campoEmail.disabled = true
	botao.disabled = true
}

function fechaCarregando(){
	document.getElementById('load').style.display = "none"
	campoComentario.disabled = false
	campoNome.disabled = false
	campoEmail.disabled = false
	botao.disabled = false
}