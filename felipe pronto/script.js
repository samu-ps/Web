document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('form-catalogo2');
    const formEditar = document.getElementById('form-editar');
    const lista = document.getElementById('listaItens');

    const contador = {
        Colorama: 0,
        Impala: 0,
        Dailus: 0,
        Revlon: 0,
        Vult: 0
    };

    function atualizarContador(marca) {
        const contadorElemento = document.getElementById(`contador-${marca}`);
        if (contadorElemento) {
            contadorElemento.textContent = contador[marca];
        }
    }

    let linhaEmEdicao = null;
    let marcaOriginal = '';

    // Adicionar item
    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const nome = document.getElementById('nomeItem').value.trim();
        const marca = document.getElementById('categoriaItem').value;

        if (nome === '' || !marca) {
            alert('Por favor, preencha todos os campos.');
            return;
        }

        const novaLinha = document.createElement('tr');
        novaLinha.innerHTML = `
            <td><strong>${nome}</strong></td>
            <td class="text-center"><em>${marca}</em></td>
            <td class="text-center">
                <button class="btn btn-warning btn-sm editar">Editar</button>
                <button class="btn btn-outline-danger btn-sm remover">Remover</button>
            </td>
        `;
        lista.appendChild(novaLinha);

        contador[marca]++;
        atualizarContador(marca);

        adicionarEventosBotoes(novaLinha);

        form.reset();
        const modal = bootstrap.Modal.getInstance(document.getElementById('modalEsmalte'));
        modal.hide();
    });

    // Função para adicionar eventos de editar e remover
    function adicionarEventosBotoes(linha) {
        const btnRemover = linha.querySelector('.remover');
        const btnEditar = linha.querySelector('.editar');

        btnRemover.addEventListener('click', function () {
            const marca = linha.children[1].textContent.trim();
            linha.remove();
            contador[marca]--;
            atualizarContador(marca);
        });

        btnEditar.addEventListener('click', function () {
            linhaEmEdicao = linha;
            const nome = linha.children[0].textContent.trim();
            const marca = linha.children[1].textContent.trim();

            marcaOriginal = marca;

            document.getElementById('nomeItemEditar').value = nome;
            document.getElementById('categoriaItemEditar').value = marca;

            const modalEditar = new bootstrap.Modal(document.getElementById('modalEditar'));
            modalEditar.show();
        });
    }

    // Salvar edição
    formEditar.addEventListener('submit', function (e) {
        e.preventDefault();

        const novoNome = document.getElementById('nomeItemEditar').value.trim();
        const novaMarca = document.getElementById('categoriaItemEditar').value;

        if (novoNome === '' || !novaMarca) {
            alert('Por favor, preencha todos os campos.');
            return;
        }

        if (linhaEmEdicao) {
            const nomeAntigo = linhaEmEdicao.children[0].textContent.trim();
            const marcaAntiga = linhaEmEdicao.children[1].textContent.trim();

            linhaEmEdicao.children[0].innerHTML = `<strong>${novoNome}</strong>`;
            linhaEmEdicao.children[1].innerHTML = `<em>${novaMarca}</em>`;

            // Atualizar contadores se a marca foi alterada
            if (marcaAntiga !== novaMarca) {
                contador[marcaAntiga]--;
                contador[novaMarca]++;
                atualizarContador(marcaAntiga);
                atualizarContador(novaMarca);
            }
        }

        linhaEmEdicao = null;
        marcaOriginal = '';

        const modal = bootstrap.Modal.getInstance(document.getElementById('modalEditar'));
        modal.hide();
    });
});
