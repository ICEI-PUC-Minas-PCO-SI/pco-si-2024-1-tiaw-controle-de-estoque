
    const rascunhoList = document.getElementById('rascunho-list');

    function getRascunhosLocal() {
        return JSON.parse(localStorage.getItem('rascunhos')) || [];
    }

    function saveRascunhosLocal(rascunhos) {
        localStorage.setItem('rascunhos', JSON.stringify(rascunhos));
    }

    function renderRascunhos() {
        const rascunhos = getRascunhosLocal();
        let lista_rascunhos = '';
        for (let i = 0; i < rascunhos.length; i++) {
            lista_rascunhos += `
                <tr>
                    <th>${rascunhos[i].id}</th>
                    <td>${rascunhos[i].prioridade}</td>
                    <td>${rascunhos[i].nome}</td>
                    <td>${rascunhos[i].end}</td>
                    <td>${rascunhos[i].ctt}</td>
                    <td>
                        <a onclick="getRascunho(${rascunhos[i].id});" 
                        class="btn btn-info btn-xs" 
                        data-bs-toggle="modal" data-bs-target="#rascunho-modal">
                        <i class="fa fa-edit"></i>  Editar
                        </a>

                        <a onclick="$('#id-rasc').text(${rascunhos[i].id});" class="btn btn-danger btn-xs" 
                        data-bs-toggle="modal" data-bs-target="#modal-delete">
                        <i class="fa fa-trash"></i> Remover
                        </a>
                    </td>
                </tr>
            `;
        }
        rascunhoList.innerHTML = lista_rascunhos; 
    }

    renderRascunhos();

    // DELETE - PROCEDIMENTO PARA EXCLUIR UM rascunho
    const rascunhoDelete = document.getElementById('btn-delete');

    rascunhoDelete.addEventListener('click', (e) => {
        const id = $('#id-rasc').text();
        let rascunhos = getRascunhosLocal();
        rascunhos = rascunhos.filter(r => r.id != id);
        saveRascunhosLocal(rascunhos);
        location.reload();
    });

    // PROCEDIMENTO PARA RECUPERAR OS DADOS DE UM rascunho
    function getRascunho(id) {
        if(id == 0){
            $('#edit-rasc-id').text("");
            $( "#rascunho-id" ).prop( "disabled", false );
            $('#rascunho-id').val("");
            $('#rascunho-prioridade').val("");
            $('#rascunho-nome').val("");
            $('#rascunho-end').val("");
            $('#rascunho-ctt').val("");
        } else {
            $('#edit-rasc-id').text(id);
            const rascunhos = getRascunhosLocal();
            const rascunho = rascunhos.find(r => r.id == id);
            if (rascunho) {
                $( "#rascunho-id" ).prop( "disabled", true );
                $('#rascunho-id').val(rascunho.id);
                $('#rascunho-prioridade').val(rascunho.prioridade);
                $('#rascunho-nome').val(rascunho.nome);
                $('#rascunho-end').val(rascunho.end);
                $('#rascunho-ctt').val(rascunho.ctt);
            }
        }    
    }

    // CREATE or UPDATE - PROCEDIMENTO PARA CRIAR OU EDITAR UM rascunho
    const rascunhoForm = document.getElementById('rascunho-form');

    rascunhoForm.addEventListener('submit', (e) => {
        e.preventDefault();

        let id = parseInt($('#edit-rasc-id').text());
        let rascunhos = getRascunhosLocal();

        const novoRascunho = {
            id: document.getElementById('rascunho-id').value,
            prioridade: document.getElementById('rascunho-prioridade').value,
            nome: document.getElementById('rascunho-nome').value,
            end: document.getElementById('rascunho-end').value,
            ctt: document.getElementById('rascunho-ctt').value
        };

        if (id >= 0) {
            const index = rascunhos.findIndex(r => r.id == id);
            if (index !== -1) {
                rascunhos[index] = novoRascunho;
            }
        } else {
            rascunhos.push(novoRascunho);
        }

        saveRascunhosLocal(rascunhos);
        location.reload();
    });
