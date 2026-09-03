const listaProdutos = document.getElementById("lista-produtos");
let produtos = [];
async function buscarProdutos() {
    const resposta = await fetch("assets/data/produtos.json");
    produtos = await resposta.json();
    mostrarProdutos(produtos);
}
function mostrarProdutos(lista) {
    listaProdutos.innerHTML = "";
    lista.forEach(produto => {
        const col = document.createElement("div");
        col.classList.add("col-md-4");
        col.innerHTML = `
            <div class="card h-100 shadow-sm">
                <img src="assets/${produto.imagem}" class="card-img-top" alt="${produto.nome}">
                <div class="card-body d-flex flex-column">
                    <h5 class="card-title">${produto.nome}</h5>
                    <p class="card-text"><strong>${produto.descricao.substring(0, 80)}</strong>...</p>
                    <p class="fw-bold text-success">R$ ${produto.preco.toFixed(2)}</p>
                    <div class="mt-auto">
                        <button class="btn btn-dark w-100 mb-2 btn-detalhes">Ver Detalhes</button>
                        <button class="btn btn-success w-100">Comprar</button>
                    </div>
                </div>
            </div>
        `;
        const botaoDetalhes = col.querySelector(".btn-detalhes");
        botaoDetalhes.addEventListener("click", () => {
            window.location.href = `pages/detalhe.html?produto=${produto.slug}`;
        });
        listaProdutos.appendChild(col);
    });
}
document.addEventListener("DOMContentLoaded", buscarProdutos);