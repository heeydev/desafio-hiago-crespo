class CaixaDaLanchonete {

    /**
     * Calcula o valor total do pedido feito no caixa da lanchonete
     * 
     * @param {string} formaDePagamento Forma de pagamento selecionada pelo cliente
     * @param {array} itens Itens no pedido do cliente
     * 
     * @returns {string}
     */
    calcularValorDaCompra(formaDePagamento, itens) 
    {
    
        // Cardapio da lanchonete com os itens e valores referentes
        const cardapio = {
            'cafe': 3.00,
            'chantily': 1.50,
            'suco': 6.20,
            'sanduiche': 6.50,
            'queijo': 2.00,
            'salgado': 7.25,
            'combo1': 9.50,
            'combo2': 7.50
        };

        // Formas de pagamento que estao disponiveis
        const formasDePagamentoValidas = [
            'dinheiro',
            'debito',
            'credito'
        ];

        // Validando a forma de pagamento
        if (!formasDePagamentoValidas.includes(formaDePagamento)) {
            return 'Forma de pagamento inválida!';
        }

        // Verificando se existem itens no carrinho
        if (itens.length === 0) {
            return 'Não há itens no carrinho de compra!';
        }

        // Criando o mapeamento de pedidos disponiveis
        const pedidosDisponiveis = {};
        for (const item in cardapio) {
            pedidosDisponiveis[item] = cardapio[item];
        }

        let todosCodigoItem = [];
        let valorTotal = 0;

        // Percorre os itens do pedido e realiza das validacoes necessarias para retornar o valor total
        for (const item of itens) {
            const [codigoItem, quantidadeStr] = item.split(',');
            todosCodigoItem.push(codigoItem);

            // Validando se o item do pedido existe no cardapio
            if (!(codigoItem in pedidosDisponiveis)) {
                return 'Item inválido!';
            }

            // Validando a quantidade de itens
            let quantidade = parseInt(quantidadeStr);
            if (isNaN(quantidade) || quantidade <= 0) {
                return 'Quantidade inválida!';
            }
            
            valorTotal += cardapio[codigoItem] * quantidade;
        }

        // Validando se o item extra sempre é acompanhado do item principal
        if ((todosCodigoItem.includes('chantily') && !todosCodigoItem.includes('cafe')) ||
            (todosCodigoItem.includes('queijo') && !todosCodigoItem.includes('sanduiche'))) {
            return 'Item extra não pode ser pedido sem o principal';
        }

        // Atualizando o valor da compra de acordo com a forma de pagamento
        if (formaDePagamento === 'dinheiro') {
            valorTotal *= 0.95; // Desconto de 5%
        } else if (formaDePagamento === 'credito') {
            valorTotal *= 1.03; // Acréscimo de 3%
        }

        return `R$ ${valorTotal.toFixed(2)}`.replace('.', ',');
    }
}

export { CaixaDaLanchonete };