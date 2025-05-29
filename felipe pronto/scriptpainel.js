document.addEventListener('DOMContentLoaded', function () {

    const form = document.getElementById('form-catalogo2');
    const listaItens = document.getElementById('listaItens');

    // Objeto para controlar os contadores das marcas
    const contador = {
        Colorama: 0,
        Impala: 0,
        Dailus: 0,
        Revlon: 0,
        Vult: 0
    };

    // Função para atualizar o contador no card
    function atualizarContador(marca) {
        const contadorElemento = document.getElementById(`contador-${marca}`);
        if (contadorElemento) {
            contadorElemento.textContent = contador[marca];
        }
    }

        listaItens.appendChild(tr);

        // Incrementa o contador
        contador[marca]++;
        atualizarContador(marca);

        // Adiciona funcionalidade de remover
        const btnRemover = tr.querySelector('.btn-remover');
        btnRemover.addEventListener('click', function () {
            // Remove a linha
            tr.remove();

            // Decrementa o contador
            contador[marca]--;
            atualizarContador(marca);
        });
    })
