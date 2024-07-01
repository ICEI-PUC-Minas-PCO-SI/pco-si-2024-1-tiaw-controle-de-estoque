
    const clienteList = document.getElementById('cliente-list');

    function getClientesLocal() {
        return JSON.parse(localStorage.getItem('clientes')) || [];
    }

    function saveClientesLocal(clientes) {
        localStorage.setItem('clientes', JSON.stringify(clientes));
    }

    function renderClientes() {
        const clientes = getClientesLocal();
        let lista_clientes = '';
        for (let i = 0; i < clientes.length; i++) {
            lista_clientes += `
                <tr>
                    <th>${clientes[i].id}</th>
                    <td>${clientes[i].prioridade}</td>
                    <td>${clientes[i].nome}</td>
                    <td>${clientes[i].end}</td>
                    <td>${clientes[i].ctt}</td>
                    <td>
                        <a onclick="getCliente(${clientes[i].id});" 
                        class="btn btn-info btn-xs" 
                        data-bs-toggle="modal" data-bs-target="#cliente-modal">
                        <i class="fa fa-edit"></i>  Editar
                        </a>

                        <a onclick="$('#id-cli').text(${clientes[i].id});" class="btn btn-danger btn-xs" 
                        data-bs-toggle="modal" data-bs-target="#modal-delete">
                        <i class="fa fa-trash"></i> Remover
                        </a>
                    </td>
                </tr>
            `;
        }
        clienteList.innerHTML = lista_clientes; 
    }

    renderClientes();

    // DELETE - PROCEDIMENTO PARA EXCLUIR UM cliente
    const clienteDelete = document.getElementById('btn-delete');

    clienteDelete.addEventListener('click', (e) => {
        const id = $('#id-cli').text();
        let clientes = getClientesLocal();
        clientes = clientes.filter(c => c.id != id);
        saveClientesLocal(clientes);
        location.reload();
    });

    // PROCEDIMENTO PARA RECUPERAR OS DADOS DE UM cliente
    function getCliente(id) {
        if(id == 0){
            $('#edit-cli-id').text("");
            $("#cliente-id").prop("disabled", false);
            $('#cliente-id').val("");
            $('#cliente-prioridade').val("");
            $('#cliente-nome').val("");
            $('#cliente-end').val("");
            $('#cliente-ctt').val("");
        } else {
            $('#edit-cli-id').text(id);
            const clientes = getClientesLocal();
            const cliente = clientes.find(c => c.id == id);
            if (cliente) {
                $("#cliente-id").prop("disabled", true);
                $('#cliente-id').val(cliente.id);
                $('#cliente-prioridade').val(cliente.prioridade);
                $('#cliente-nome').val(cliente.nome);
                $('#cliente-end').val(cliente.end);
                $('#cliente-ctt').val(cliente.ctt);
            }
        }    
    }

    // CREATE or UPDATE - PROCEDIMENTO PARA CRIAR OU EDITAR UM cliente
    const clienteForm = document.getElementById('cliente-form');

    clienteForm.addEventListener('submit', (e) => {
        e.preventDefault();

        let id = parseInt($('#edit-cli-id').text());
        let clientes = getClientesLocal();

        const novoCliente = {
            id: document.getElementById('cliente-id').value,
            prioridade: document.getElementById('cliente-prioridade').value,
            nome: document.getElementById('cliente-nome').value,
            end: document.getElementById('cliente-end').value,
            ctt: document.getElementById('cliente-ctt').value
        };

        if (id >= 0) {
            const index = clientes.findIndex(c => c.id == id);
            if (index !== -1) {
                clientes[index] = novoCliente;
            }
        } else {
            clientes.push(novoCliente);
        }

        saveClientesLocal(clientes);
        location.reload();
    });

