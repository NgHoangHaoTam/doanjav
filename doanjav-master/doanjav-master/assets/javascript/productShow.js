document.addEventListener("DOMContentLoaded", function () {
    const LinkProduct = "http://localhost:8080/product";
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get("id") || 1; // Lấy ID sản phẩm từ URL hoặc mặc định là 1
    const token = localStorage.getItem("token");

    // Kiểm tra trạng thái đăng nhập
    if (!token) {
        alert("Bạn cần đăng nhập để truy cập trang này.");
        window.location.href = "login.html";
        return;
    }

    const apiUrl = `${LinkProduct}`; // Endpoint lấy danh sách tất cả sản phẩm

    fetch(apiUrl, {
        method: "GET",
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
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
            const mainImage = product.image
                ? `${LinkProduct}/files/${product.image}`
                : './images/default-image.jpg'; // Đường dẫn ảnh mặc định

            document.getElementById("MainImg").src = mainImage;
            document.getElementById("productName").textContent = product.name || "Tên sản phẩm";
            document.getElementById("productPrice").textContent = `${product.price.toLocaleString()}đ` || "Giá sản phẩm";
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

            // Gắn sự kiện "Thêm vào giỏ hàng"
            const addToCartButton = document.getElementById("addToCartButton");
            addToCartButton.addEventListener("click", function () {
                addProductToCartApi(product);
            });
        })
        .catch(error => {
            console.error("Lỗi khi gọi API:", error);
        });

    // Hàm thêm sản phẩm vào giỏ hàng thông qua API
    function addProductToCartApi(product) {
        let cartId = localStorage.getItem("cartId");

        if (cartId) {
            validateCartAndAddProduct(cartId, product, token);
        } else {
            createCartAndAddProduct(product, token);
        }
    }

    // Kiểm tra giỏ hàng có hợp lệ và thêm sản phẩm
    function validateCartAndAddProduct(cartId, product, token) {
        fetch(`http://localhost:8080/cart/check/${cartId}`, {
            method: "GET",
            headers: { 'Authorization': `Bearer ${token}` }
        })
            .then(response => response.json())
            .then(data => {
                if (data.success && data.data) {
                    addToCart(cartId, product, token); // Giỏ hàng hợp lệ
                } else {
                    console.log("Giỏ hàng không hợp lệ. Tạo giỏ hàng mới.");
                    createCartAndAddProduct(product, token); // Tạo giỏ hàng mới
                }
            })
            .catch(() => {
                console.error("Lỗi khi kiểm tra giỏ hàng. Giả định không hợp lệ.");
                createCartAndAddProduct(product, token);
            });
    }

    // Tạo giỏ hàng mới và thêm sản phẩm
    function createCartAndAddProduct(product, token) {
        const userId = localStorage.getItem("userId");

        if (!userId) {
            alert("Không tìm thấy thông tin người dùng. Vui lòng đăng nhập lại.");
            window.location.href = "login.html";
            return;
        }

        fetch("http://localhost:8080/cart/create", {
            method: "POST",
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams({ userId })
        })
            .then(response => response.json())
            .then(data => {
                if (data.id) {
                    localStorage.setItem("cartId", data.id);
                    addToCart(data.id, product, token);
                } else {
                    alert("Không thể tạo giỏ hàng. Vui lòng thử lại sau.");
                }
            })
            .catch(error => {
                console.error("Lỗi khi tạo giỏ hàng:", error);
                alert("Có lỗi xảy ra khi tạo giỏ hàng. Vui lòng thử lại.");
            });
    }

    // Thêm sản phẩm vào giỏ hàng
    function addToCart(cartId, product, token) {
        fetch("http://localhost:8080/cartItem/item/add", {
            method: "POST",
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams({
                cartId,
                productId: product.id,
                quantity: product.quantity || 1
            })
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert("Thêm sản phẩm vào giỏ hàng thành công!");
                } else {
                    alert("Không thể thêm sản phẩm vào giỏ hàng.");
                }
            })
            .catch(() => {
                console.error("Lỗi khi thêm sản phẩm vào giỏ hàng.");
                alert("Có lỗi xảy ra khi thêm vào giỏ hàng.");
            });
    }
});
