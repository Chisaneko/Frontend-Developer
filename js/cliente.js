const url = 'http://localhost:3400/clientes'

let modalCliente =  new bootstrap.Modal(document.getElementById("modal-cliente"), {})
let btnAdcionar = document.getElementById('adcionar')
let modoEdicao = false
let modalTitle = document.querySelector('h4.modal-title')


let tabelaCliente = document.querySelector('table>tbody')

btnAdcionar.addEventListener('click', () => {
    modoEdicao = false
    modalTitle.textContent = "Adcionar Cliente"
    modalCliente.show()
})
function fecharModal(){
    modalCliente.hide()
    modoEdicao = false
}

function editarCliente(id){
    modoEdicao = true
    modalTitle.textContent = "Editar Cliente"
    modalCliente.show()
}

function excluirCliente(id){
    alert('Excluindo o cliente ' + id)
}

function obterCliente(){
    fetch(url, {
        method: 'GET'
    })
    .then(response => response.json())
    .then(clientes => {
        popularTabela(clientes)
    })
    .fetch()
}
function criarLinhaNaTable(cliente){
    let tr = document.createElement('tr')
    let tdId = document.createElement('td')
    let tdNome = document.createElement('td')
    let tdCpf = document.createElement('td')
    let tdEmail = document.createElement('td')
    let tdTelefone = document.createElement('td')
    let tdDataCadastro = document.createElement('td')
    let tdAcoes = document.createElement('td')

    tdId.textContent = cliente.id
    tdNome.textContent = cliente.nome
    tdCpf.textContent = cliente.cpfOuCnpj
    tdNome.textContent = cliente.nome
    tdEmail.textContent = cliente.email
    tdTelefone.textContent = cliente.telefone
    tdDataCadastro.textContent = cliente.dataCadastro
    tdAcoes.innerHTML = `<button class="btn mr-5 btn-outline-primary btn-sm" onclick="editarCliente(${cliente.id})">Editar</button><button class="btn mr-5 btn-outline-primary btn-sm" onclick="excluirCliente(${cliente.id})">Excluir</button>`

    tr.appendChild(tdId)
    tr.appendChild(tdNome)
    tr.appendChild(tdCpf)
    tr.appendChild(tdEmail)
    tr.appendChild(tdTelefone)
    tr.appendChild(tdDataCadastro)
    tr.appendChild(tdAcoes)
    tabelaCliente.appendChild(tr)

}
function popularTabela(clientes){
    clientes.forEach(cliente => {
        criarLinhaNaTable(cliente)
    });

}




obterCliente()