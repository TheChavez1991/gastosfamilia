document.getElementById('transactionForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const tipo = document.getElementById('type').value;
    const categoria = tipo === 'gasto' ? document.getElementById('categoria').value : 'entrada';
    const monto = parseFloat(document.getElementById('monto').value);
    const observacion = document.getElementById('observacion').value;

    const tableBody = document.querySelector('#transactionsTable tbody');
    const newRow = document.createElement('tr');

    newRow.innerHTML = `
        <td>${tipo.charAt(0).toUpperCase() + tipo.slice(1)}</td>
        <td class="${categoria}">${categoria.replace('_', ' ')}</td>
        <td>${monto.toFixed(2)}</td>
        <td>${observacion}</td>
    `;

    tableBody.appendChild(newRow);

    actualizarResumen(tipo, monto);

    document.getElementById('transactionForm').reset();
});

function actualizarResumen(tipo, monto) {
    let totalGastos = parseFloat(document.getElementById('totalGastos').textContent);
    let totalEntradas = parseFloat(document.getElementById('totalEntradas').textContent);
    let saldoNeto = parseFloat(document.getElementById('saldoNeto').textContent);

    if (tipo === 'gasto') {
        totalGastos += monto;
    } else {
        totalEntradas += monto;
    }

    saldoNeto = totalEntradas - totalGastos;

    document.getElementById('totalGastos').textContent = totalGastos.toFixed(2);
    document.getElementById('totalEntradas').textContent = totalEntradas.toFixed(2);
    document.getElementById('saldoNeto').textContent = saldoNeto.toFixed(2);
}
