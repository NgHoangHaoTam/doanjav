
function fetchAndDisplayProducts() {
    fetch("http://localhost:8080/product", {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token') // Nếu cần xác thực token
        }
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const productsContainer = document.getElementById("product-list");
            if (!productsContainer) return;

            productsContainer.innerHTML = ""; // Xóa danh sách sản phẩm cũ
            const products = data.data || []; // Mảng sản phẩm

            if (products.length === 0) {
                productsContainer.innerHTML = "<p>Không có sản phẩm nào!</p>";
            } else {
                const productListContainer = document.getElementById('product-list');

                products.forEach(product => {
                    const productHTML = `
                        <div class="product-card">
                            <img src="http://localhost:8080/product/files/${product.image}" alt="${product.name}" class="product-image" />
                            <h3>${product.name}</h3>
                            <p>Giá: $${product.price}</p>
                            <button onclick="addItemToCart(${product.id})">Thêm vào giỏ hàng</button>
                        </div>
                    `;
                    productListContainer.innerHTML += productHTML;
                });
            }
        })
        .catch(error => console.error("Error fetching products:", error));
}

// Khởi chạy khi tải trang
document.addEventListener("DOMContentLoaded", function () {
    fetchAndDisplayProducts(); // Hiển thị danh sách sản phẩm
});

// Lấy giỏ hàng của người dùng
function getCart(cartId) {
    if (!cartId) {
        console.error("Không có cartId hợp lệ.");
        return;
    }

    fetch(`http://localhost:8080/cartItem/cartItems`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token') // Xác thực token
        }
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            if (data && data.length > 0) {
                displayCartItems(data, cartId);
            } else {
                document.getElementById("cart-items").innerHTML = "<tr><td colspan='6'>Giỏ hàng của bạn đang trống</td></tr>";
            }
        })
        .catch(error => {
            console.error('Error fetching cart:', error);
            document.getElementById("cart-items").innerHTML = "<tr><td colspan='6'>Có lỗi xảy ra khi lấy giỏ hàng.</td></tr>";
        });
}
// Hiển thị các sản phẩm trong giỏ hàng
function displayCartItems(cartItems, cartId) {
    const cartItemsContainer = document.getElementById("cart-items");
    if (!cartItemsContainer) {
        console.error("Không tìm thấy phần tử 'cart-items'");
        return;
    }
    cartItemsContainer.innerHTML = ""; // Xóa các sản phẩm hiện tại

    // Duyệt qua từng sản phẩm trong giỏ hàng
    cartItems.forEach(item => {
        fetch(`http://localhost:8080/product/detail/${item.productId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token') // Nếu sử dụng token xác thực
            }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(result => {
                const product = result.data; // Lấy dữ liệu sản phẩm từ API
                const price = product.price && !isNaN(product.price) ? product.price : 0; // Giá sản phẩm
                const totalPrice = (price * item.quantity).toFixed(2); // Tổng giá trị sản phẩm

                // Tạo dòng hiển thị sản phẩm
                const row = document.createElement("tr");

                // URL ảnh với xử lý dự phòng
                const imageUrl = product.product_image
                    ? `http://localhost:8080/product/files/${product.product_image}`
                    : 'http://localhost:8080/product/files/default-image.jpg';

                // Tạo HTML cho từng sản phẩm
                row.innerHTML = `
                    <td><button class="remove-btn" onclick="removeItemFromCart(${cartId}, ${item.productId})">Xóa</button></td>
                    <td>
                        <a href="product.html?id=${product.id}">
                            <img src="${imageUrl}" alt="${product.product_name || 'No image'}" width="50" 
                                onerror="this.src='http://localhost:8080/product/files/default-image.jpg'">
                        </a>
                    </td>
                    <td><a href="product.html?id=${product.id}">${product.product_name || 'Tên sản phẩm không có'}</a></td>
                    <td>${price.toLocaleString()} đ</td> <!-- Hiển thị giá với định dạng tiền tệ -->
                    <td>
                        <input type="number" value="${item.quantity}" min="1" 
                            onchange="updateItemQuantity(${cartId}, ${item.productId}, this.value)">
                    </td>
                    <td>${totalPrice.toLocaleString()} đ</td> <!-- Hiển thị tổng tiền với định dạng tiền tệ -->
                `;

                // Thêm dòng vào bảng giỏ hàng
                cartItemsContainer.appendChild(row);
            })
            .catch(error => {
                console.error('Error fetching product:', error);

                // Hiển thị thông báo lỗi nếu không thể lấy thông tin sản phẩm
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td colspan="6" class="text-center">Lỗi khi lấy thông tin sản phẩm. Vui lòng thử lại.</td>
                `;
                cartItemsContainer.appendChild(row);
            });
    });

    // Cập nhật tổng tiền sau khi hiển thị giỏ hàng
    updateTotalPrice(cartId);
}

function updateItemQuantity(cartId, productId, quantity) {
    if (quantity < 1) {
        alert("Số lượng phải lớn hơn 0");
        return;
    }

    fetch(`http://localhost:8080/cartItem/cart/${cartId}/item/${productId}/update?quantity=${quantity}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        body: JSON.stringify({ cartId, productId, quantity })
    })
        .then(response => {
            console.log("HTTP Response:", response.status, response.statusText);
            return response.json();
        })
        .then(result => {
            console.log("Response từ API updateItemQuantity:", result);

            if (result.success) {
                // Tự động hiển thị lại giỏ hàng và cập nhật tổng tiền
                fetch(`http://localhost:8080/cartItem/cartItems`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + localStorage.getItem('token')
                    }
                })
                    .then(cartResponse => cartResponse.json())
                    .then(cartData => {
                        console.log("Giỏ hàng mới:", cartData);
                        displayCartItems(cartData.items, cartId);
                        updateTotalPrice(cartId);
                    })
                    .catch(error => console.error("Lỗi khi làm mới giỏ hàng:", error));
            } else {
                console.error("Cập nhật số lượng thất bại:", result.message);
            }
        })
        .catch(error => {
            console.error("Lỗi khi cập nhật số lượng:", error);
        });
}




// =====================
// Cập nhật tổng tiền
// =====================
function updateTotalPrice(cartId) {
    fetch(`http://localhost:8080/cart/${cartId}/cart/total_price`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
    })
        .then(response => response.json())
        .then(data => {
            const totalPrice = data.total || 0;
            document.getElementById("total-price").textContent = totalPrice.toLocaleString() + " đ";
        })
        .catch(error => console.error("Lỗi khi cập nhật tổng tiền:", error));
}

// =====================
// Xóa sản phẩm khỏi giỏ hàng
// =====================
function removeItemFromCart(cartId, productId) {
    fetch(`http://localhost:8080/cartItem/cart/${cartId}/item/${productId}/remove`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        body: JSON.stringify({ cartId, productId })
    })
        .then(response => response.json())
        .then(result => {
            if (result.success) {
                // Tự động tải lại trang khi xóa thành công
                location.reload();
            } else {
                alert("Xóa sản phẩm thất bại!");
            }
        })
        .catch(error => console.error("Lỗi khi xóa sản phẩm:", error));
}


// =====================
// Khởi chạy khi tải trang
// =====================
document.addEventListener("DOMContentLoaded", () => {
    const cartId = localStorage.getItem('cartId') || 19;
    fetchAndDisplayProducts(); // Hiển thị sản phẩm
    getCart(cartId);           // Hiển thị giỏ hàng
});
// Hàm tạo đơn hàng
function createOrder(cartId) {
    fetch(`http://localhost:8080/order/create?userId=${cartId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token') // Xác thực token nếu cần
        }
    })
        .then(response => response.json())
        .then(result => {
            if (result.success) {
                // Thanh toán thành công, thông báo và làm trống giỏ hàng
                alert("Đơn hàng đã được thanh toán và tạo thành công.");
                // Xóa các sản phẩm trong giỏ hàng sau khi thanh toán
                document.getElementById("cart-items").innerHTML = "<tr><td colspan='6'>Giỏ hàng của bạn đã thanh toán và trống.</td></tr>";
                document.getElementById("total-price").textContent = "0 đ"; // Cập nhật lại tổng tiền
            } else {
                alert("Có lỗi xảy ra khi thanh toán.");
            }
        })
        .catch(error => {
            console.error("Lỗi khi tạo đơn hàng:", error);
            alert("Có lỗi xảy ra khi tạo đơn hàng.");
        });
}
// Xử lý khi nhấn nút thanh toán
function handleCheckout() {
    const cartId = localStorage.getItem('cartId'); // Lấy cartId từ localStorage

    if (!cartId) {
        alert("Không có giỏ hàng hợp lệ.");
        return;
    }

    createOrder(cartId); // Gọi hàm tạo đơn hàng
}
