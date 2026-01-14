let orders = [];
let page = 1;

request('/orders').then(d => {
    orders = d;
    render();
});

function render() {
    ordersTable.innerHTML = '';
    orders.slice((page - 1) * 5, page * 5).forEach((o, i) => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${i + 1}</td>
            <td>${o.course_id}</td>
            <td>${o.date_start}</td>
            <td>${o.price}</td>
            <td><button class="btn btn-danger btn-sm">Удалить</button></td>`;
        tr.querySelector('button').onclick = () => remove(o.id);
        ordersTable.append(tr);
    });
}

function remove(id) {
    request(`/orders/${id}`, { method: 'DELETE' }).then(() => {
        orders = orders.filter(o => o.id !== id);
        render();
        alertMsg('Заявка удалена');
    });
}
