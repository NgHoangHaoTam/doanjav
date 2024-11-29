// Lấy danh sách sản phẩm
$(document).ready(function () {
    const LinkProduct = "http://localhost:8080/product";
    const token = localStorage.getItem("token");

    if (!token) {
        alert("Bạn chưa đăng nhập. Vui lòng đăng nhập để tiếp tục.");
        window.location.href = "login.html";
        return;
    }

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
                // Lấy 8 sản phẩm đầu tiên
                const products = msg.data.slice(4, 8); 

                $.each(products, function (index, value) {
                    const html = `
                    <div class="prod">
                    <a href="product.html?id=${value.id}" class="product-link">
                    <style>
                    .product-link{text-decoration: none;}
                    </style>
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

                // Thêm sự kiện click cho các nút "add-to-cart"
                $(".add-to-cart").off("click").on("click", function () {
                    const $this = $(this);
                    if ($this.hasClass("disabled")) return;

                    $this.addClass("disabled"); // Ngăn double click
                    const productId = $this.data("id");
                    const productName = $this.data("name");
                    const productPrice = $this.data("price");
                    const productImage = $this.data("image");

                    const product = {
                        id: productId,
                        name: productName,
                        price: productPrice,
                        image: productImage,
                        quantity: 1
                    };

                    addProductToCartApi(product).then(() => {
                        $this.removeClass("disabled"); // Kích hoạt lại nút
                    }).catch(() => {
                        $this.removeClass("disabled"); // Kích hoạt lại nút nếu lỗi
                    });
                });
            } else {
                alert("Không thể tải danh sách sản phẩm.");
            }
        })
        .fail(function () {
            alert("Có lỗi khi tải danh sách sản phẩm.");
        });
});

// Thêm sản phẩm vào giỏ hàng
function addProductToCartApi(product) {
    return new Promise((resolve, reject) => {
        const token = localStorage.getItem("token");
        let cartId = localStorage.getItem("cartId");

        console.log("cartId hiện tại:", cartId);

        if (!token) {
            alert("Bạn chưa đăng nhập. Vui lòng đăng nhập để tiếp tục.");
            window.location.href = "login.html";
            reject();
            return;
        }

        if (cartId) {
            validateCartAndAddProduct(cartId, product, token).then(resolve).catch(reject);
        } else {
            createCartAndAddProduct(product, token).then(resolve).catch(reject);
        }
    });
}
