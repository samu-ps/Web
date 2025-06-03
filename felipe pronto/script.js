document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('form-catalogo2');
    const formEditar = document.getElementById('form-editar');
    const lista = document.getElementById('listaItens');

    const contador = {
        Colorama: 0,
        Impala: 0,
        Dailus: 0,
        Revlon: 0,
        Risque: 0
    };

    let linhaEmEdicao = null;

    function atualizarContador(marca) {
        const contadorElemento = document.getElementById(`contador-${marca}`);
        if (contadorElemento) {
            contadorElemento.textContent = contador[marca] || 0;
        }
    }

    function salvarDados() {
        const itens = [];
        lista.querySelectorAll('tr').forEach(linha => {
            const nome = linha.children[0].textContent.trim();
            const marca = linha.children[1].textContent.trim();
            itens.push({ nome, marca });
        });
        localStorage.setItem('catalogoEsmaltes', JSON.stringify(itens));
    }

    function carregarDados() {
        const dados = JSON.parse(localStorage.getItem('catalogoEsmaltes')) || [];

        dados.forEach(item => {
            const linha = criarLinha(item.nome, item.marca);
            lista.appendChild(linha);
            contador[item.marca] = (contador[item.marca] || 0) + 1;
        });

        Object.keys(contador).forEach(marca => atualizarContador(marca));
    }

document.getElementById('exportar').addEventListener('click', function() {
    const itens = [];
    lista.querySelectorAll('tr').forEach(tr => {
        const nome = tr.children[0]?.textContent.trim();
        const marca = tr.children[1]?.textContent.trim();
        itens.push({ nome, marca });
    });

    const json = JSON.stringify(itens, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = "catalogo.json";
    link.click();
});



document.getElementById('botaoImportar').addEventListener('click', function() {
  document.getElementById('inputImportar').click(); // força o clique no input invisível
});


document.getElementById('inputImportar').addEventListener('change', function(event) {
    const arquivo = event.target.files[0];
    if (!arquivo) return;

    const leitor = new FileReader();
    leitor.onload = function(e) {
        const conteudo = e.target.result;
        try {
            const dados = JSON.parse(conteudo);

            lista.innerHTML = ''; // limpa a tabela

            // Zera os contadores
            Object.keys(contador).forEach(marca => contador[marca] = 0);

            dados.forEach(item => {
                if (item.nome && item.marca) {
                    const linha = criarLinha(item.nome, item.marca);
                    lista.appendChild(linha);
                    contador[item.marca] = (contador[item.marca] || 0) + 1;
                }
            });

            Object.keys(contador).forEach(marca => atualizarContador(marca));
            salvarDados();

        } catch (erro) {
            alert("Erro ao ler o arquivo JSON.");
        }
    };

    leitor.readAsText(arquivo);
});

    function criarLinha(nome, marca) {
        const linha = document.createElement('tr');
        linha.innerHTML = `
            <td><strong>${nome}</strong></td>
            <td class="text-center"><em>${marca}</em></td>
            <td class="text-center">
                <button class="btn btn-warning btn-sm editar">Editar</button>
                <button class="btn btn-outline-danger btn-sm remover">Remover</button>
            </td>
        `;

        adicionarEventosBotoes(linha);
        return linha;
    }

    form.addEventListener('submit', function (e) {
        e.preventDefault();

        const nome = document.getElementById('nomeItem').value.trim();
        const marca = document.getElementById('categoriaItem').value;

        if (nome === '' || !marca) {
            alert('Por favor, preencha todos os campos.');
            return;
        }

        const linha = criarLinha(nome, marca);
        lista.appendChild(linha);

        contador[marca]++;
        atualizarContador(marca);

        salvarDados();

        form.reset();
        const modal = bootstrap.Modal.getInstance(document.getElementById('modalEsmalte'));
        modal.hide();
    });

    function adicionarEventosBotoes(linha) {
        const btnRemover = linha.querySelector('.remover');
        const btnEditar = linha.querySelector('.editar');

        btnRemover.addEventListener('click', function () {
            const marca = linha.children[1].textContent.trim();
            linha.remove();
            contador[marca]--;
            atualizarContador(marca);
            salvarDados();
        });

        btnEditar.addEventListener('click', function () {
            linhaEmEdicao = linha;
            const nome = linha.children[0].textContent.trim();
            const marca = linha.children[1].textContent.trim();

            document.getElementById('nomeItemEditar').value = nome;
            document.getElementById('categoriaItemEditar').value = marca;

            const modalEditar = new bootstrap.Modal(document.getElementById('modalEditar'));
            modalEditar.show();
        });
    }

    formEditar.addEventListener('submit', function (e) {
        e.preventDefault();

        const novoNome = document.getElementById('nomeItemEditar').value.trim();
        const novaMarca = document.getElementById('categoriaItemEditar').value;

        if (novoNome === '' || !novaMarca) {
            alert('Por favor, preencha todos os campos.');
            return;
        }

        if (linhaEmEdicao) {
            const marcaAntiga = linhaEmEdicao.children[1].textContent.trim();

            linhaEmEdicao.children[0].innerHTML = `<strong>${novoNome}</strong>`;
            linhaEmEdicao.children[1].innerHTML = `<em>${novaMarca}</em>`;

            if (marcaAntiga !== novaMarca) {
                contador[marcaAntiga]--;
                contador[novaMarca] = (contador[novaMarca] || 0) + 1;
                atualizarContador(marcaAntiga);
                atualizarContador(novaMarca);
            }

            salvarDados();
        }

        linhaEmEdicao = null;

        const modal = bootstrap.Modal.getInstance(document.getElementById('modalEditar'));
        modal.hide();
    });

    carregarDados();
});

document.getElementById('filtroEsmalte').addEventListener('change', function () {
    const filtro = this.value;
    document.querySelectorAll('#listaItens tr').forEach(tr => {
        const marca = tr.children[1]?.textContent || '';
        if (!filtro || marca === filtro) {
            tr.style.display = '';
        } else {
            tr.style.display = 'none';
        }
    });
});

function filtrarPorCor() {
    const filtro = document.getElementById('filtroCor').value.trim().toLowerCase();
    document.querySelectorAll('#listaItens tr').forEach(tr => {
        const cor = tr.children[0]?.textContent.toLowerCase() || '';
        if (!filtro || cor.includes(filtro)) {
            tr.style.display = '';
        } else {
            tr.style.display = 'none';
        }
    });
}

// Filtrar ao clicar no botão
document.getElementById('button-addon2').addEventListener('click', filtrarPorCor);