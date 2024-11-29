$(document).ready(function () {
    // Kiểm tra trạng thái đăng nhập
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");

    if (!token || !username) {
        alert("Bạn cần đăng nhập để truy cập trang này.");
        window.location.href = "login.html";
    } else {
        $("#username-display").text(`Hi, ${username}`);
        $(".dropdown-menu").show();

        // Xử lý logout
        $("#logout-button").on("click", function () {
            localStorage.removeItem("token");
            localStorage.removeItem("username");
            localStorage.removeItem("cartId");
            alert("Bạn đã đăng xuất.");
            window.location.href = "login.html";
        });
    }

    // Lấy danh sách sản phẩm
    const LinkProduct = "http://localhost:8080/product";

    console.log("Token hiện tại:", token);

    $.ajax({
        method: "GET",
        url: LinkProduct,
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
        .done(function (msg) {
            if (msg.success) {
                const productsToShow = msg.data.slice(0, 4); // Hiển thị 4 sản phẩm đầu
                $.each(productsToShow, function (index, value) {
                    const html = `
                        <div class="prod">
                            <a href="product.html?id=${value.id}" class="product-link">
                                <img src="${LinkProduct}/files/${value.image}" alt=""/>
                                <div class="des">
                                    <span>${value.name}</span>
                                    <h5>${value.description}</h5>
                                    <div class="star">
                                        <i class="fas fa-star"></i>
                                        <i class="fas fa-star"></i>
                                        <i class="fas fa-star"></i>
                                        <i class="fas fa-star"></i>
                                        <i class="fas fa-star"></i>
                                    </div>
                                    <h4>${Number(value.price).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</h4>
                                </div>
                            </a>
                            <a href="javascript:void(0)" class="add-to-cart" 
                               data-id="${value.id}" 
                               data-name="${value.name}" 
                               data-price="${value.price}" 
                               data-image="${value.image}">
                                <i class="fa-solid fa-cart-shopping cart"></i>
                            </a>
                        </div>`;
                    $("#Product_famous").append(html);
                });

                // Sự kiện thêm sản phẩm vào giỏ hàng
                $(".add-to-cart").click(function () {
                    const productId = $(this).data("id");
                    const productName = $(this).data("name");
                    const productPrice = $(this).data("price");
                    const productImage = $(this).data("image");

                    const product = {
                        id: productId,
                        name: productName,
                        price: productPrice,
                        image: productImage,
                        quantity: 1
                    };
                    addProductToCartApi(product);
                });
            } else {
                alert("Không thể tải danh sách sản phẩm.");
            }
        })
        .fail(function () {
            alert("Có lỗi khi tải danh sách sản phẩm.");
        });
});

// Thêm sản phẩm vào giỏ hàng qua API
function addProductToCartApi(product) {
    const token = localStorage.getItem("token");
    let cartId = localStorage.getItem("cartId");

    console.log("cartId hiện tại:", cartId);

    if (!token) {
        alert("Bạn chưa đăng nhập. Vui lòng đăng nhập để tiếp tục.");
        window.location.href = "login.html";
        return;
    }

    if (cartId) {
        validateCartAndAddProduct(cartId, product, token);
    } else {
        createCartAndAddProduct(product, token);
    }
}

// Kiểm tra giỏ hàng và thêm sản phẩm nếu hợp lệ
function validateCartAndAddProduct(cartId, product, token) {
    $.ajax({
        method: "GET",
        url: `http://localhost:8080/cart/check/${cartId}`,
        headers: { 'Authorization': `Bearer ${token}` },
        success: function (response) {
            console.log("Phản hồi kiểm tra giỏ hàng:", response);

            if (response.success && response.data) {
                addToCart(cartId, product, token); // Giỏ hàng hợp lệ
            } else {
                console.log("Giỏ hàng không hợp lệ. Tạo giỏ hàng mới.");
                createCartAndAddProduct(product, token); // Tạo giỏ hàng mới
            }
        },
        error: function () {
            console.error("Lỗi khi kiểm tra giỏ hàng. Giả định không hợp lệ.");
            createCartAndAddProduct(product, token);
        }
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

    $.ajax({
        method: "POST",
        url: "http://localhost:8080/cart/create",
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: { userId: userId },
        success: function (response) {
            if (response.id) {
                localStorage.setItem("cartId", response.id);
                addToCart(response.id, product, token);
            } else {
                alert("Không thể tạo giỏ hàng. Vui lòng thử lại sau.");
            }
        },
        error: function (xhr) {
            console.error("Lỗi khi tạo giỏ hàng:", xhr.responseText);
            alert("Có lỗi xảy ra khi tạo giỏ hàng. Vui lòng thử lại.");
        }
    });
}

// Thêm sản phẩm vào giỏ hàng
function addToCart(cartId, product, token) {
    $.ajax({
        method: "POST",
        url: "http://localhost:8080/cartItem/item/add",
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data: {
            cartId: cartId,
            productId: product.id,
            quantity: product.quantity
        },
        success: function (response) {
            if (response.success) {
                alert("Thêm sản phẩm vào giỏ hàng thành công!");
                console.log("Phản hồi từ API:", response);
            } else {
                alert("Không thể thêm sản phẩm vào giỏ hàng.");
                console.error("Lỗi phản hồi từ API:", response);
            }
        },
        error: function (xhr) {
            console.error("Lỗi khi thêm sản phẩm vào giỏ hàng:", xhr.responseText);
            alert("Có lỗi xảy ra khi thêm vào giỏ hàng.");
        }
    });
}
