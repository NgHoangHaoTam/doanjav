$(document).ready(function () {
    // Kiểm tra và lấy token từ localStorage
    const token = localStorage.getItem('token');
    if (!token) {
        alert('You are not logged in. Redirecting to login page.');
        window.location.href = '/login.html'; // Chuyển hướng đến trang đăng nhập nếu không có token
        return; // Dừng thực thi nếu chưa đăng nhập
    }

    // Lấy userId từ localStorage
    const userId = localStorage.getItem('userId');
    if (!userId) {
        console.error('User ID not found in localStorage');
        return; // Nếu không có userId trong localStorage, dừng thực thi
    }

    // Fetch all orders from the server
    function fetchAllOrders() {
        $.ajax({
            url: 'http://localhost:8080/order', // API endpoint for fetching all orders
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}` // Thêm xác thực Bearer token
            },
            success: function (response) {
                if (response && response.data && Array.isArray(response.data)) {
                    displayOrders(response.data); // Populate orders in the table
                } else {
                    $('#orders-list').html('<tr><td colspan="5">No orders found</td></tr>');
                }
            },
            error: function (error) {
                console.error('Error fetching orders:', error);
                $('#orders-list').html('<tr><td colspan="5">Error fetching orders. Try again later.</td></tr>');
            }
        });
    }

    // Display orders in the table
    function displayOrders(orders) {
        let ordersHtml = '';
        orders.forEach(order => {
            // Lưu userId và orderId vào localStorage khi xuất đơn hàng
            localStorage.setItem('userId', order.userId); // Lưu userId tương ứng với đơn hàng
            localStorage.setItem('orderId', order.orderId); // Lưu orderId tương ứng với đơn hàng
            
            ordersHtml += `
                <tr>
                    <td>${order.orderId}</td>
                    <td>${order.productName}</td>
                    <td>${order.quantity}</td>
                    <td>${order.totalAmount}</td>
                    <td><button onclick="fetchOrderItems(${order.userId})">View Items</button></td>
                </tr>
                <tr id="order-items-${order.orderId}" style="display: none;">
                    <td colspan="5">
                        <div class="order-items-content"></div>
                    </td>
                </tr>
            `;
        });
        $('#orders-list').html(ordersHtml);
    }

    // Fetch and display items for a specific user
    function fetchOrderItems(userId) {
        const token = localStorage.getItem('token');
        if (!token) {
            alert('You are not logged in. Redirecting to login page.');
            window.location.href = '/login.html'; // Chuyển hướng đến trang đăng nhập nếu không có token
            return;
        }

        $.ajax({
            url: `http://localhost:8080/order/${userId}/Items`, // Lấy items cho userId
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}` // Thêm xác thực Bearer token
            },
            success: function (response) {
                if (response && response.data && Array.isArray(response.data)) {
                    displayOrderItems(userId, response.data); // Hiển thị danh sách order items
                } else {
                    $(`#order-items-${userId} .order-items-content`).html('<p>No items found for this user.</p>');
                    $(`#order-items-${userId}`).show();
                }
            },
            error: function (error) {
                console.error('Error fetching order items:', error);
                $(`#order-items-${userId} .order-items-content`).html('<p>Failed to fetch items. Please try again.</p>');
                $(`#order-items-${userId}`).show();
            }
        });
    }

    // Display items for a specific user in a collapsible row
    function displayOrderItems(userId, items) {
        let itemsHtml = '<ul>';
        items.forEach(item => {
            itemsHtml += `
                <li>Order Item ID: ${item.orderItemId} - ProductId: ${item.productId} - Quantity: ${item.quantity} - Price: ${item.price}</li>
            `;
        });
        itemsHtml += '</ul>';

        // Hiển thị chi tiết items vào phần tử con
        $(`#order-items-${userId} .order-items-content`).html(itemsHtml);
        $(`#order-items-${userId}`).show(); // Hiển thị phần tử chi tiết khi có dữ liệu
    }

    // Fetch orders khi trang đã sẵn sàng
    fetchAllOrders();
});
