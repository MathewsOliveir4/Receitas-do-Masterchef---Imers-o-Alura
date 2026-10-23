// app.js
// Espera o DOM estar completamente carregado antes de executar o código
document.addEventListener('DOMContentLoaded', () => {
    // Seleciona elementos do DOM
    const searchInput = document.querySelector('input[type="search"]');
    const searchButton = document.querySelector('.search-section button');
    const resultadosContainer = document.querySelector('.resultados-pesquisa');

    // Remove acentos e deixa em minúsculas, para "sanduiche" achar "Sanduíche"
    function normalizar(texto) {
        return texto.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
    }

    // Função para buscar receitas baseado no termo de busca
    function buscarReceitas(termo) {
        const termoNormalizado = normalizar(termo.trim());
        return dados.filter(receita =>
            normalizar(receita.nome).includes(termoNormalizado) ||
            normalizar(receita.descricao).includes(termoNormalizado)
        );
    }

    // Função para exibir os resultados da busca
    function exibirResultados(resultados) {
        // Limpa o conteúdo atual do container de resultados
        resultadosContainer.innerHTML = '';

        // Se nada foi encontrado, mostra uma mensagem e para por aqui
        if (resultados.length === 0) {
            resultadosContainer.innerHTML = '<p>Nenhuma receita encontrada.</p>';
            return;
        }

        // Itera sobre cada receita nos resultados
        resultados.forEach(receita => {
            // Cria um novo elemento article para cada receita
            const artigo = document.createElement('article');
            artigo.className = 'item-resultado';
            // Preenche o artigo com os detalhes da receita
            artigo.innerHTML = `
                <h2>${receita.nome}</h2>
                <img width="200" height="200" src="${receita.imagem}" alt="${receita.nome}">
                <p class="descricao-meta">${receita.descricao}</p>
                <a href="${receita.link}" target="_blank" rel="noopener noreferrer">Mais informações</a>
            `;
            // Adiciona o artigo ao container de resultados
            resultadosContainer.appendChild(artigo);
        });
    }

    // Realiza a busca com o termo digitado e exibe os resultados
    function pesquisar() {
        exibirResultados(buscarReceitas(searchInput.value));
    }

    // Busca ao clicar no botão
    searchButton.addEventListener('click', pesquisar);

    // Busca também ao apertar Enter no campo de busca
    searchInput.addEventListener('keydown', (evento) => {
        if (evento.key === 'Enter') pesquisar();
    });

    // Inicializa a página exibindo todas as receitas
    exibirResultados(dados);
});
