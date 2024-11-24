$(document).ready(function () {
    var LinkProduct = "http://localhost:8080/product";
    var token = localStorage.getItem("token");
    console.log(token);

    // Lấy danh sách sản phẩm
    $.ajax({
        method: "GET",
        url: LinkProduct,
        headers: {
            'Authorization': `${token}`
        }
    })
        .done(function (msg) {
            if (msg.success) {
                $.each(msg.data, function (index, value) {
                    console.log(value);

                    // HTML sản phẩm
                    var html = `<div class="prod">
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
                                    <h4>${value.price}</h4>
                                </div>
                                <a href="javascript:void(0)" class="add-to-cart" data-id="${value.id}" data-name="${value.name}" data-price="${value.price}" data-image="${value.image}">
                                    <i class="fa-solid fa-cart-shopping cart"></i> Add to Cart
                                </a>
                            </div>`;

                    $("#Product_famous").append(html); 
                });

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
                        quantity: 1 // Số lượng mặc định
                    };

                    addProductToCartApi(product); // Gọi hàm thêm sản phẩm vào giỏ hàng mà không cần tạo mới giỏ hàng
                });
            }
        });
});

// Hàm thêm sản phẩm vào giỏ hàng thông qua API
function addProductToCartApi(product) {
    const token = localStorage.getItem("token");
    let cartId = localStorage.getItem("cartId");

    // Nếu không có cartId trong localStorage
    if (!cartId) {
        alert("You need to create a cart first.");
        return;
    }

    $.ajax({
        method: "POST",
        url: "http://localhost:8080/cartItem/item/add", // API thêm sản phẩm vào giỏ hàng
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
            if (response.data === "Item added to cart successfully") {
                alert("Product added to cart!");
            } else {
                alert("Failed to add product to cart!");
            }
        },
        error: function (error) {
            console.error("Error adding to cart:", error);
            alert("Failed to add product to cart!");
        }
    });
}
