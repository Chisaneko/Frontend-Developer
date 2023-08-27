let email =  document.getElementById('input-email')
let senha =  document.getElementById('input-password')
let btnEntrar = document.getElementById('btn-entrar')

const emailBanco = "admin@admin"
const senhaBanco = "123"

btnEntrar.addEventListener('click', () => {
    let userEmail = email.value
    let userSenha = senha.value

    if (userEmail == "" || userSenha == ""){
        window.alert('O campo de e-mail e senha são obrigatórios')
        return
    }

    autenticar(userEmail, userSenha)
    
    /*if (userEmail != emailBanco || userSenha != senhaBanco){
        window.alert('Email ou senha incorreto')
        return
    }

    if (userEmail == emailBanco && userSenha == senhaBanco){
        window.open('cadastro-usuário.html', '_self')
    } 
    */
})

function autenticar(email, senha){
    const urlBase = 'http://localhost:3400'
    fetch(`${urlBase}/login`,{
        method:'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({email, senha})
        })
        .then(response => response = response.json())
        .then(response => {
            if(!!response.mensagem){
                alert (response.mensagem)
                return
            } else{
                alert ("Usuário autenticado com sucesso!")
                salvarToken(response.token)
                salvarUsuario(response.usuario)
                window.open('cliente.html', '_self')
            }
        })
}

function salvarToken (token){
    localStorage.setItem('token', token)
}

function salvarUsuario (usuario){
    localStorage.setItem('usuario', JSON.stringify(usuario))
}
