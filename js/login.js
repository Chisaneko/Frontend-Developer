let email =  document.getElementById('input-email')
let senha =  document.getElementById('input-password')
let btnEntrar = document.getElementById('btn-entrar')

const emailBanco = "admin@admin"
const senhaBanco = "123"

btnEntrar.addEventListener('click', () => {
    let temail = email.value
    let tsenha = senha.value

    if (temail == emailBanco && tsenha ==senhaBanco){
        window.open('cadastro-usuário.html', '_self')
    } else {
        window.alert('Senha incorreta')
    }
})