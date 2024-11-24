document.addEventListener("DOMContentLoaded", function () {
    const LinkProduct = "http://localhost:8080/product";
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get("id") || 1; // Lấy ID sản phẩm từ URL hoặc mặc định là 1
    const apiUrl = `${LinkProduct}`; // Endpoint lấy danh sách tất cả sản phẩm

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error("Không thể lấy dữ liệu sản phẩm!");
            }
            return response.json();
        })
        .then(data => {
            console.log(data); // Kiểm tra phản hồi từ API
            const products = data.data; // Giả sử trả về danh sách các sản phẩm
            const product = products.find(p => p.id === parseInt(productId)); // Tìm sản phẩm theo ID

            if (!product) {
                console.error("Sản phẩm không tồn tại!");
                return;
            }

            // Hiển thị thông tin sản phẩm
            var mainImage = product.image
                ? `${LinkProduct}/files/${product.image}`
                : './images/default-image.jpg'; // Đường dẫn ảnh mặc định ở client

            document.getElementById("MainImg").src = mainImage;
            document.getElementById("productName").textContent = product.name || "Tên sản phẩm";
            document.getElementById("productPrice").textContent = `${product.price.toLocaleString()}.000đ` || "Giá sản phẩm";
            document.getElementById("productDescription").textContent = product.product_desc || "Mô tả sản phẩm";

            // Hiển thị các ảnh nhỏ nếu có
            if (product.smallImages && product.smallImages.length > 0) {
                const smallImgGroup = document.getElementById("smallImgGroup");
                smallImgGroup.innerHTML = ""; // Xóa nội dung cũ

                product.smallImages.forEach(imageUrl => {
                    const imgElement = document.createElement("img");
                    imgElement.src = imageUrl;
                    imgElement.width = 80;
                    imgElement.classList.add("small-img");

                    // Gắn sự kiện click để thay đổi ảnh chính
                    imgElement.addEventListener("click", function () {
                        document.getElementById("MainImg").src = imageUrl;
                    });

                    smallImgGroup.appendChild(imgElement);
                });
            }
        })
        .catch(error => {
            console.error("Lỗi khi gọi API:", error);
        });
});
