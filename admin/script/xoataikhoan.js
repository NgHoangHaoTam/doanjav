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
            <button class="btn btn-danger btn-sm" onclick="deleteItem(${index + 1})">Xóa</button>
        `;
        row.appendChild(actionCell);
    });
});
function deleteItem(id) {
    const confirmDelete = confirm(`Bạn có chắc muốn xóa sản phẩm với ID: ${id}?`);
    if (confirmDelete) {
        alert(`Đã xóa sản phẩm với ID: ${id}`);
    }
}