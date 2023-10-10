const url = 'http://localhost:3400/clientes'

// Modal ===================================================================================

let listaCliente = []
let modoEdicao = false
let modalCliente =  new bootstrap.Modal(document.getElementById("modal-cliente"), {})
let modalTitle = document.querySelector('h4.modal-title')
let btnAdcionar = document.getElementById('adcionar')
let btnSalvar = document.getElementById('btn-salvar')
let btnCancelar = document.getElementById('btn-cancelar')
let formModal = {
    id: document.getElementById('modal-id'),
    nome: document.getElementById('modal-nome'),
    email: document.getElementById('modal-email'),
    telefone: document.getElementById('modal-telefone'),
    cpf: document.getElementById('modal-cpf'),
    dataCadastro: document.getElementById('dataCadastro')
}

// Tabela =================================================================================

let tabelaCliente = document.querySelector('table>tbody')

// Event Listener ==========================================================================

btnAdcionar.addEventListener('click', () => {
    modoEdicao = false
    limparModalCliente()
    modalTitle.textContent = "Adcionar Cliente"
    modalCliente.show()
})

btnSalvar.addEventListener('click', () => {
    let cliente = obterClienteModal()
    if(!cliente.email || !cliente.nome || !cliente.cpfOuCnpj){
        window.alert("Email, Cpf e Nome são obrigatórios")
        return
    }
    adcionarClienteBackend(cliente)
})

btnCancelar.addEventListener('click', () => {
    modoEdicao = false
    modalCliente.hide()
})

// Functions ===============================================================================
function obterClienteModal(){
    return new Cliente({
        id: formModal.id.value,
        nome:formModal.nome.value,
        email:formModal.email.value,
        telefone:formModal.telefone.value,
        cpfOuCnpj:formModal.cpf.value,
    })
}

function editarCliente(id){
    modoEdicao = true
    let cliente = listaCliente.find(cliente => cliente.id == id)
    atualizarModalCliente(cliente)
    modalTitle.textContent = "Editar Cliente"
    modalCliente.show()
}

function atualizarModalCliente(cliente){
    formModal.id.value = cliente.id
    formModal.nome.value = cliente.nome
    formModal.cpf.value = cliente.cpfOuCnpj
    formModal.telefone.value = cliente.telefone
    formModal.email.value = cliente.email
}

function excluirCliente(id){
    alert('Excluindo o cliente ' + id)
}

function limparModalCliente(){
    formModal.id.value = ""
    formModal.nome.value = ""
    formModal.cpf.value = ""
    formModal.email.value = ""
    formModal.telefone.value = ""
}

function criarLinhaNaTable(cliente){
    let tr = document.createElement('td')
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
    tabelaCliente.textContent = ""
    clientes.forEach(cliente => {
        criarLinhaNaTable(cliente)
    });

}

function adcionarClienteBackend(cliente){

    cliente.dataCadastro = new Date().toISOString()

    fetch(url, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Aurhorization': "token"
        },
        body: JSON.stringify(cliente)
    })
    .then(response => response.json())
    .then(response => {
        let novoCliente = new Cliente(response)
        listaCliente.push(novoCliente)
        popularTabela(listaCliente)
        modalCliente.hide()
    })
    .catch(error => {
        console.log(error)
    })
}

function obterCliente(){
    fetch(url, {
        method: 'GET'
    })
    .then(response => response.json())
    .then(clientes => {
        listaCliente = clientes
        popularTabela(clientes)
    })
    .fetch()
}

obterCliente()