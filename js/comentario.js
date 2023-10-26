const form = document.getElementById('form')
campoNome = document.getElementById('nome')
campoEmail = document.getElementById('email')
campoComentario = document.getElementById('comentario')

form.addEventListener('submit', (event) => {
	var nome = campoNome.value,
	email = campoEmail.value,
	comentario = campoComentario.value;
	enviaComentario(nome,email,comentario)
})

function enviaComentario(nome, email, comentario){
	database.ref('comentarios/' +1).set({
		"nome": nome,
		"email": email,
		"comentario": comentario
	})
}