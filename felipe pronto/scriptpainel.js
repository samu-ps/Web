// document.addEventListener('DOMContentLoaded', function () {
//     const form = document.getElementById('form-catalogo2');
//     const listaItens = document.getElementById('listaItens');

//     const contador = {
//         Colorama: 0,
//         Impala: 0,
//         Dailus: 0,
//         Revlon: 0,
//         Vult: 0
//     };

//     function atualizarContador(marca) {
//         const contadorElemento = document.getElementById(`contador-${marca}`);
//         if (contadorElemento) {
//             contadorElemento.textContent = contador[marca];
//         }
//     }

//     form.addEventListener('submit', function (e) {
//         e.preventDefault();

//         const nomeItemInput = document.getElementById('nomeItem');
//         const categoriaItemSelect = document.getElementById('categoriaItem');

//         const nomeItem = nomeItemInput.value.trim();
//         const marca = categoriaItemSelect.value;

//         const tr = document.createElement('tr');

//         tr.innerHTML = `
//             <td>${nomeItem}</td>
//             <td class="text-center">${marca}</td>
//             <td class="text-center">
//                 <button class="btn btn-danger btn-sm btn-remover">Remover</button>
//             </td>
//         `;

//         listaItens.appendChild(tr);

//         // Incrementa contador da marca
//         contador[marca]++;
//         atualizarContador(marca);

//         // Evento de remover item
//         const btnRemover = tr.querySelector('.btn-remover');
//         btnRemover.addEventListener('click', function () {
//             tr.remove();
//             contador[marca]--;
//             atualizarContador(marca);
//         });

//         // Resetar formulário e fechar modal
//         form.reset();
//         const modal = bootstrap.Modal.getInstance(document.getElementById('modalEsmalte'));
//         modal.hide();
//     });
// });
