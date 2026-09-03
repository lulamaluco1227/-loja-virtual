const detalheProduto = document.getElementById("detalhe-produto");
function pegarSlug() {
    const params = new URLSearchParams(window.location.search);
    return params.get("produto");
}
async function buscarProdutos() {
    try {
        const resposta = await fetch("../assets/data/produtos.json");
        const produtos = await resposta.json();
        const slug = pegarSlug();
        const produto = produtos.find(p => p.slug === slug);
        if (!produto) {
            detalheProduto.innerHTML = "<p>Produto não encontrado</p>";
            return;
        }
        mostrarDetalhes(produto);
    } catch (erro) {
        console.error("Erro:", erro);
        detalheProduto.innerHTML = "<p>Erro ao carregar produto</p>";
    }
}
function mostrarDetalhes(produto) {
    detalheProduto.innerHTML = `
        <div class="col-md-6">
            <img src="../assets/${produto.imagem}" class="img-fluid rounded shadow" alt="${produto.nome}">
        </div>
        <div class="col-md-6">
            <h1>${produto.nome}</h1>
            <p><strong>${produto.descricao}</strong></p>
            <h3 class="text-success">R$ ${produto.preco.toFixed(2)}</h3>
            <button class="btn btn-success w-100 mb-3">Comprar</button>
            <a href="../index.html" class="btn btn-outline-secondary w-100">Voltar</a>
        </div>
    `;
    document.title = `${produto.nome} | Loja da Tropa da Mari`;
    const metaDescription = document.querySelector("meta[name='description']");
    if (metaDescription) {
        metaDescription.setAttribute(
            "content",
            `${produto.nome} - ${produto.descricao}`
        );
    }
}
document.addEventListener("DOMContentLoaded", buscarProdutos);