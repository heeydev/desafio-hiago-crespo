class CaixaDaLanchonete {
         calcularValorDaCompra(formaDePagamento, itens) {
    const cardapio = [
        { codigo: 'cafe', valor: 3.00 },
        { codigo: 'chantily', valor: 1.50 },
        { codigo: 'suco', valor: 6.20 },
        { codigo: 'sanduiche', valor: 6.50 },
        { codigo: 'queijo', valor: 2.00 },
        { codigo: 'salgado', valor: 7.25 },
        { codigo: 'combo1', valor: 9.50 },
        { codigo: 'combo2', valor: 7.50 }
        // Adicione mais itens e preços aqui, se necessário
    ];

    const formasValidas = ['dinheiro', 'debito', 'credito'];

    if (!formasValidas.includes(formaDePagamento)) {
        return 'Forma de pagamento inválida!';
    }

    if (itens.length === 0) {
        return 'Não há itens no carrinho de compra!';
    }

    // Criando o mapeamento de códigos para preços usando a função split()
    const precos = {};
    for (const item of cardapio) {
        precos[item.codigo] = item.valor;
    }

    const itensPrincipais = [];
    const itensExtras = [];
    let valorTotal = 0;

    for (const itemInfo of itens) {
        const [codigoItem, quantidade] = itemInfo.split(',');

        if (!(codigoItem in precos)) {
            return 'Item inválido!';
        }

        const quantidadeParseada = parseInt(quantidade);
        if (isNaN(quantidadeParseada) || quantidadeParseada <= 0) {
            return 'Quantidade inválida!';
        }

        if ((codigoItem === 'chantily' && !itens.includes('cafe')) ||
            (codigoItem === 'queijo' && !itens.includes('sanduiche'))) {
            return 'Item extra não pode ser pedido sem o principal!';
        }

        if (!codigoItem.startsWith('combo')) {
            itensPrincipais.push(codigoItem);
        } else if (codigoItem.endsWith('extra')) {
            itensExtras.push(codigoItem);
        }
    }

    for (const codigoPrincipal of itensPrincipais) {
        valorTotal += precos[codigoPrincipal];
    }

    for (const codigoExtra of itensExtras) {
        valorTotal += precos[codigoExtra];
    }

    if (formaDePagamento === 'dinheiro') {
        valorTotal *= 0.95; // Desconto de 5%
    } else if (formaDePagamento === 'credito') {
        valorTotal *= 1.03; // Acréscimo de 3%
    }

    return `R$ ${valorTotal.toFixed(2)}`;
}

export { CaixaDaLanchonete };
