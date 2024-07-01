
    const fornecedorList = document.getElementById('fornecedor-list');

    function getFornecedoresLocal() {
        return JSON.parse(localStorage.getItem('fornecedores')) || [];
    }

    function saveFornecedoresLocal(fornecedores) {
        localStorage.setItem('fornecedores', JSON.stringify(fornecedores));
    }

    function renderFornecedores() {
        const fornecedores = getFornecedoresLocal();
        let lista_fornecedores = '';
        for (let i = 0; i < fornecedores.length; i++) {
            lista_fornecedores += `
                <tr>
                    <th>${fornecedores[i].id}</th>
                    <td>${fornecedores[i].prioridade}</td>
                    <td>${fornecedores[i].nome}</td>
                    <td>${fornecedores[i].end}</td>
                    <td>${fornecedores[i].ctt}</td>
                    <td>
                        <a onclick="getFornecedor(${fornecedores[i].id});" 
                        class="btn btn-info btn-xs" 
                        data-bs-toggle="modal" data-bs-target="#fornecedor-modal">
                        <i class="fa fa-edit"></i>  Editar
                        </a>

                        <a onclick="$('#id-forn').text(${fornecedores[i].id});" class="btn btn-danger btn-xs" 
                        data-bs-toggle="modal" data-bs-target="#modal-delete">
                        <i class="fa fa-trash"></i> Remover
                        </a>
                    </td>
                </tr>
            `;
        }
        fornecedorList.innerHTML = lista_fornecedores; 
    }

    renderFornecedores();

    // DELETE - PROCEDIMENTO PARA EXCLUIR UM fornecedor
    const fornecedorDelete = document.getElementById('btn-delete');

    fornecedorDelete.addEventListener('click', (e) => {
        const id = $('#id-forn').text();
        let fornecedores = getFornecedoresLocal();
        fornecedores = fornecedores.filter(f => f.id != id);
        saveFornecedoresLocal(fornecedores);
        $('#modal-delete').modal('hide');  // Fecha o modal após a exclusão
        location.reload();
    });

    // PROCEDIMENTO PARA RECUPERAR OS DADOS DE UM fornecedor
    function getFornecedor(id) {
        if(id == 0){
            $('#edit-forn-id').text("");
            $("#fornecedor-id").prop("disabled", false);
            $('#fornecedor-id').val("");
            $('#fornecedor-prioridade').val("");
            $('#fornecedor-nome').val("");
            $('#fornecedor-end').val("");
            $('#fornecedor-ctt').val("");
        } else {
            $('#edit-forn-id').text(id);
            const fornecedores = getFornecedoresLocal();
            const fornecedor = fornecedores.find(f => f.id == id);
            if (fornecedor) {
                $("#fornecedor-id").prop("disabled", true);
                $('#fornecedor-id').val(fornecedor.id);
                $('#fornecedor-prioridade').val(fornecedor.prioridade);
                $('#fornecedor-nome').val(fornecedor.nome);
                $('#fornecedor-end').val(fornecedor.end);
                $('#fornecedor-ctt').val(fornecedor.ctt);
            }
        }    
    }

    // CREATE or UPDATE - PROCEDIMENTO PARA CRIAR OU EDITAR UM fornecedor
    const fornecedorForm = document.getElementById('fornecedor-form');

    fornecedorForm.addEventListener('submit', (e) => {
        e.preventDefault();  // Evita o comportamento padrão do formulário

        let id = parseInt($('#edit-forn-id').text());
        let fornecedores = getFornecedoresLocal();

        const novoFornecedor = {
            id: document.getElementById('fornecedor-id').value,
            prioridade: document.getElementById('fornecedor-prioridade').value,
            nome: document.getElementById('fornecedor-nome').value,
            end: document.getElementById('fornecedor-end').value,
            ctt: document.getElementById('fornecedor-ctt').value
        };

        if (id >= 0) {
            const index = fornecedores.findIndex(f => f.id == id);
            if (index !== -1) {
                fornecedores[index] = novoFornecedor;
            }
        } else {
            fornecedores.push(novoFornecedor);
        }

        saveFornecedoresLocal(fornecedores);
        $('#fornecedor-modal').modal('hide');  // Fecha o modal após a criação ou atualização
        location.reload();
    });
