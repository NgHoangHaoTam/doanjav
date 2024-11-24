//thêm

function addNewItem() {
    window.location.href = '/admin/chucnangadmin/them.html'; 
}
document.addEventListener("DOMContentLoaded", function () {
    const table = document.getElementById("dataTable"); 
    const rows = table.getElementsByTagName("tbody")[0].rows;

    const headerRow = table.getElementsByTagName("thead")[0].rows[0];
    const actionHeader = document.createElement("th");
    actionHeader.innerText = "Hành động";
    headerRow.appendChild(actionHeader);

    Array.from(rows).forEach((row, index) => {
        const actionCell = document.createElement("td");
        actionCell.innerHTML = `
            <button class="btn btn-warning btn-sm" onclick="editItem(${index + 1})">Sửa</button>
            <button class="btn btn-danger btn-sm" onclick="deleteItem(${index + 1})">Xóa</button>
        `;
        row.appendChild(actionCell);
    });
});

function editItem(id) {
    window.location.href = `/admin/chucnangadmin/sua.html?id=${id}`;
}

function deleteItem(id) {
    const confirmDelete = confirm(`Bạn có chắc muốn xóa sản phẩm với ID: ${id}?`);
    if (confirmDelete) {
        alert(`Đã xóa sản phẩm với ID: ${id}`);

    }
}



