// app.js
// Espera o DOM estar completamente carregado antes de executar o código
document.addEventListener('DOMContentLoaded', () => {
    // Seleciona elementos do DOM
    const searchInput = document.querySelector('input[type="search"]');
    const searchButton = document.querySelector('button');
    const resultadosContainer = document.querySelector('.resultados-pesquisa');

    // Função para buscar receitas baseado no termo de busca
    function buscarReceitas(termo) {
        return dados.filter(receita => 
            receita.nome.toLowerCase().includes(termo.toLowerCase()) ||
            receita.descricao.toLowerCase().includes(termo.toLowerCase())
        );
    }

    // Função para exibir os resultados da busca
    function exibirResultados(resultados) {
        // Limpa o conteúdo atual do container de resultados
        resultadosContainer.innerHTML = '';
        // Itera sobre cada receita nos resultados
        resultados.forEach(receita => {
            // Cria um novo elemento article para cada receita
            const artigo = document.createElement('article');
            artigo.className = 'item-resultado';
            // Preenche o artigo com os detalhes da receita
            artigo.innerHTML = `
                <h2>${receita.nome}</h2>
                <p class="descricao-meta">${receita.descricao}</p>
                <a href="#" target="_blank" rel="noopener noreferrer">Mais informações</a>
            `;
            // Adiciona o artigo ao container de resultados
            resultadosContainer.appendChild(artigo);
        });
    }

    // Adiciona um event listener ao botão de busca
    searchButton.addEventListener('click', () => {
        // Obtém o termo de busca do input
        const termo = searchInput.value;
        // Realiza a busca
        const resultados = buscarReceitas(termo);
        // Exibe os resultados
        exibirResultados(resultados);
        if (resultados.length === 0) {
            resultadosContainer.innerHTML = '<p>Nenhuma receita encontrada.</p>';
        } 
        else { 
            resultadosContainer.innerHTML = 'Nada foi encontrado';
        }
    });

    // Inicializa a página exibindo todas as receitas
    exibirResultados(dados);
});