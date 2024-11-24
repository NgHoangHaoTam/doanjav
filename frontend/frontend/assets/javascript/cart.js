$(document).ready(function () {
    // Hàm thêm sản phẩm vào giỏ hàng
    function addToCartAPI(product) {
        const token = localStorage.getItem("token");
        $.ajax({
            method: "POST",
            url: "http://localhost:8080/cartItem/item/add",
            headers: {
                'Authorization': `${token}`,
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: {
                cartId: localStorage.getItem("cartId") || null,
                productId: product.id,
                quantity: product.quantity
            },
            success: function (response) {
                if (response.data === "Item added to cart successfully") {
                    alert("Product added to cart!");
                    if (!localStorage.getItem("cartId")) {
                        const cartId = response.cartId || response.data.cartId;
                        localStorage.setItem("cartId", cartId);
                    }
                }
            },
            error: function (error) {
                console.error("Error adding to cart:", error);
                alert("Failed to add product to cart!");
            }
        });
    }

    // Lấy giỏ hàng từ API
    const token = localStorage.getItem("token");
    const cartId = localStorage.getItem("cartId");
    if (!cartId) {
        $("#cart-items").html("<p>Your cart is empty!</p>");
        return;
    }

    $.ajax({
        method: "GET",
        url: `http://localhost:8080/cart/${cartId}/my_cart`,
        headers: {
            'Authorization': `${token}`
        },
        success: function (response) {
            const cart = response.data;
            if (!cart || !cart.cartItems || cart.cartItems.length === 0) {
                $("#cart-items").html("<p>Your cart is empty!</p>");
                return;
            }

            let totalPrice = 0;
            cart.cartItems.forEach(item => {
                totalPrice += item.product.price * item.quantity;
                const html = `
                    <tr>
                        <td><img src="http://localhost:8080/product/files/${item.product.image}" alt="${item.product.name}" width="50"></td>
                        <td>${item.product.name}</td>
                        <td>${item.product.price}</td>
                        <td>
                            <input type="number" class="quantity" data-id="${item.id}" value="${item.quantity}" min="1">
                        </td>
                        <td>${item.product.price * item.quantity}</td>
                        <td>
                            <button class="remove" data-id="${item.id}">Remove</button>
                        </td>
                    </tr>`;
                $("#cart-items").append(html);
            });

            $("#total-price").text(`Total Price: ${totalPrice}`);
        },  
        error: function (error) {
            console.error("Error fetching cart:", error);
            alert("Failed to load cart!");
        }
    });

    // Cập nhật số lượng sản phẩm
    $(document).on("change", ".quantity", function () {
        const itemId = $(this).data("id");
        const newQuantity = parseInt($(this).val());
        if (newQuantity > 0) {
            updateCartItem(cartId, itemId, newQuantity);
        }
    });

    // Xóa sản phẩm khỏi giỏ hàng
    $(document).on("click", ".remove", function () {
        const itemId = $(this).data("id");
        removeCartItem(cartId, itemId);
    });

    // Hàm cập nhật số lượng sản phẩm
    function updateCartItem(cartId, itemId, quantity) {
        const token = localStorage.getItem("token");
        $.ajax({
            method: "PUT",
            url: `http://localhost:8080/cartItem/cart/${cartId}/item/${itemId}/update`,
            headers: {
                'Authorization': `${token}`,
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: { quantity },
            success: function () {
                location.reload();
            },
            error: function (error) {
                console.error("Error updating item:", error);
                alert("Failed to update quantity!");
            }
        });
    }

    // Hàm xóa sản phẩm khỏi giỏ hàng
    function removeCartItem(cartId, itemId) {
        const token = localStorage.getItem("token");
        $.ajax({
            method: "DELETE",
            url: `http://localhost:8080/cartItem/cart/${cartId}/item/${itemId}/remove`,
            headers: {
                'Authorization': `${token}`
            },
            success: function () {
                location.reload();
            },
            error: function (error) {
                console.error("Error removing item:", error);
                alert("Failed to remove item!");
            }
        });
    }

    // Hàm tính tổng giá tiền
    function fetchTotalPrice(cartId) {
        const token = localStorage.getItem("token");
        $.ajax({
            method: "GET",
            url: `http://localhost:8080/cart/${cartId}/cart/total_price`,
            headers: {
                'Authorization': `${token}`
            },
            success: function (response) {
                $("#total-price").text(`Total Price: ${response}`);
            },
            error: function (error) {
                console.error("Error fetching total price:", error);
            }
        });
    }
});
