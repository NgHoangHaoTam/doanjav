// Hàm xử lý phân trang
function changePage(pageNumber) {
    // Thay đổi URL và tải lại trang với tham số 'page'
    window.location.href = "shop.html?page=" + pageNumber;
}

// Khi trang được tải, kiểm tra tham số 'page' từ URL và hiển thị sản phẩm tương ứng
window.onload = function() {
    // Lấy tham số 'page' từ URL
    const urlParams = new URLSearchParams(window.location.search);
    const page = urlParams.get('page') || 1;  // Mặc định là trang 1 nếu không có tham số 'page'

    // Ẩn tất cả các sản phẩm có class 'prod page'
    const products = document.querySelectorAll('.prod.page');
    products.forEach(product => {
        const productPage = product.getAttribute('data-page');
        if (productPage === page.toString()) {
            product.style.display = 'block';  // Hiển thị sản phẩm của trang tương ứng
        } else {
            product.style.display = 'none';  // Ẩn các sản phẩm của các trang khác
        }
    });

    // Cập nhật phân trang (nếu cần)
    updatePagination(page);
};

// Cập nhật phân trang, làm nổi bật trang hiện tại
function updatePagination(currentPage) {
    const pageLinks = document.querySelectorAll('.page-link');
    pageLinks.forEach(link => {
        const pageNumber = link.innerText;
        if (pageNumber === currentPage.toString()) {
            link.classList.add('active');  // Nổi bật trang hiện tại
        } else {
            link.classList.remove('active');
        }
    });
}
