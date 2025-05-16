const form = document.getElementById('form-catalogo');
const list = document.getElementById('listaItens');
form.addEventListener('submit', function(event) {
    event.preventDefault();
    const nome = document.getElementById('nomeItem').value;
    const categoria = document.getElementById('categoriaItem').value;
    const novoItem = document.createElement('li');
    novoItem.innerHTML = `<strong>${nome}</strong> <em>(${categoria})</em>
    <button class="editar" id="btn">Editar</button>
    <button class="remover" id="btnRemover">Remover</button>` ;
    list.appendChild(novoItem);
    form.reset();
});

list.addEventListener('click', function(event) {
    if (event.target.classList.contains('remover')) {
        if (confirm("Tem certeza que deseja remover este item?")) {
        event.target.parentElement.remove();
    }
}

    if (event.target.classList.contains('editar')) {
        const li = event.target.parentElement;

        const textoOriginal = li.querySelector('strong').textContent;
        const categoriaOriginal = li.querySelector('em').textContent.replace(/[()]/g, '');

        const novoNome = prompt("Editar nome:", textoOriginal);
        const novaCategoria = prompt("Editar categoria:", categoriaOriginal);

    if (novoNome && novaCategoria) {
        li.innerHTML = `
        <strong>${novoNome}</strong> <em>(${novaCategoria})</em>
        <button class="editar">Editar</button>
        <button class="remover">Remover</button>`;
    }
}
});

document.getElementById('exportar').addEventListener('click', function() {
    const itens = [];

    list.querySelectorAll('li').forEach(li => {
    const nome = li.querySelector('strong')?.textContent;
    const categoria = li.querySelector('em')?.textContent.replace(/[()]/g, '');

    itens.push({ nome, categoria });
});

    const json = JSON.stringify(itens, null, 2); // transforma em JSON formatado
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

        list.innerHTML = ''; // limpa a lista atual

        dados.forEach(item => {
        const novoItem = document.createElement('li');
        novoItem.innerHTML = `
            <strong>${item.nome}</strong> <em>(${item.categoria})</em>
            <button class="editar">Editar</button>
            <button class="remover">Remover</button>
        `;
        list.appendChild(novoItem);
    });

    } catch (erro) {
        alert("Erro ao ler o arquivo JSON.");
    }
};

    leitor.readAsText(arquivo);
});