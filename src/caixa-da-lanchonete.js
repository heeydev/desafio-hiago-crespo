class CaixaDaLanchonete {
            calcularValorDaCompra(formaDePagamento, itens) {

        const bibliotecaCardapio = {
            'cafe': 3.00,
            'chantily': 1.50,
            'suco': 6.20,
            'sanduiche': 6.50,
            'queijo': 2.00,
            'salgado': 7.25,
            'combo1': 9.50,
            'combo2': 7.50
            // Adicione mais itens e preços aqui, se necessário
        };

        const formasValidas = ['dinheiro', 'debito', 'credito'];

        if (!formasValidas.includes(formaDePagamento)) {
            return 'Forma de pagamento inválida!';
        }

        if (itens.length === 0) {
            return 'Não há itens no carrinho de compra!';
        }

        // Criando o mapeamento de códigos para preços usando a função split()
        const precos = {};
        for (const item in bibliotecaCardapio) {
            precos[item] = bibliotecaCardapio[item];
        }

        var todosCodigoItem = [];
        let valorTotal = 0;

        for (const itemInfo of itens) {
            const [codigoItem, quantidade] = itemInfo.split(',');
            todosCodigoItem.push(codigoItem);

            if (!(codigoItem in precos)) {
                return 'Item inválido!';
            }

            const quantidadeParseada = parseInt(quantidade);
            if (isNaN(quantidadeParseada) || quantidadeParseada <= 0) {
                return 'Quantidade inválida!';
            }

            if ((codigoItem === 'chantily' && !todosCodigoItem.includes('cafe')) ||
                (codigoItem === 'queijo' && !todosCodigoItem.includes('sanduiche'))) {
                return 'Item extra não pode ser pedido sem o principal';
            }

            valorTotal += bibliotecaCardapio[codigoItem] * quantidadeParseada;
        }

        if (formaDePagamento === 'dinheiro') {
            valorTotal *= 0.95; // Desconto de 5%
        } else if (formaDePagamento === 'credito') {
            valorTotal *= 1.03; // Acréscimo de 3%
        }

        return `R$ ${valorTotal.toFixed(2)}`.replace('.', ',');
    }
}

export { CaixaDaLanchonete };