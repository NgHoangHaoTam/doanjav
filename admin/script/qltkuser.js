function checkLogin() {
    var token = localStorage.getItem("token");

    if (!token) {
        // If there's no token, redirect to the login page
        window.location.href = "login.html";
    } else {
        console.log("User is logged in with token:", token);
    }
}

window.onload = function () {
    checkLogin(); // Call the checkLogin function when the page loads
}
$(document).ready(function () {
    var LinkUser = "http://localhost:8080/user"; // Endpoint API của bạn để lấy danh sách người dùng
    var token = localStorage.getItem("token");

    if (!token) {
        alert("Bạn chưa đăng nhập.");
        window.location.href = "login.html"; // Chuyển hướng về trang đăng nhập nếu không có token
        return;
    }

    console.log("Token:", token);

    // Hàm lấy danh sách người dùng
    function loadUsers() {
        $.ajax({
            method: "GET",
            url: LinkUser,
            headers: {
                'Authorization': `Bearer ${token}` // Thêm từ khóa Bearer vào header Authorization
            },
            success: function (msg) {
                console.log("Phản hồi từ API:", msg); // In ra toàn bộ phản hồi từ API

                // Kiểm tra xem API có trả về dữ liệu hay không
                if (msg && Array.isArray(msg)) {  // Nếu API trả về một mảng
                    // Xóa dữ liệu cũ nếu là lần tải lại
                    $("#User_show").empty();

                    // Duyệt qua dữ liệu người dùng và hiển thị
                    $.each(msg, function (index, value) {
                        console.log("Dữ liệu người dùng:", value); // Hiển thị dữ liệu của từng người dùng

                        // Hiển thị thông tin người dùng, lọc theo role_id
                        if (value.role_id === 2) { // Ví dụ: Chỉ hiển thị người dùng có role_id = 1 (admin)
                            var html = `<tr>
                                            <td>${value.id}</td>
                                            <td>${value.username}</td>
                                            <td>${value.password}</td>
                                            <td>${value.fullname}</td>
                                            <td>
                                                <button class="btn btn-danger btn-delete" data-id="${value.id}">
                                                    Xóa
                                                </button>
                                            </td>
                                        </tr>`;

                            $("#User_show").append(html);
                        }
                    });

                    // Thêm sự kiện click cho nút xóa
                    $(".btn-delete").click(function () {
                        var userId = $(this).data("id");
                        deleteUser(userId);
                    });
                } else {
                    alert("Không có dữ liệu người dùng hoặc phản hồi không đúng.");
                }
            },
            error: function (xhr, status, error) {
                console.error("Lỗi khi lấy danh sách người dùng:", error);
                alert("Có lỗi xảy ra khi lấy dữ liệu người dùng.");
            }
        });
    }

    // Gọi hàm loadUsers để hiển thị danh sách người dùng
    loadUsers();

    // Hàm xóa người dùng
    function deleteUser(userId) {
        $.ajax({
            method: "DELETE",
            url: `${LinkUser}/${userId}/deleteuser`,
            headers: {
                'Authorization': `Bearer ${token}`
            },
            success: function (msg) {
                if (msg) {
                    alert("Xóa người dùng thành công!");
                    loadUsers(); // Tải lại danh sách người dùng sau khi xóa
                } else {
                    alert("Xóa người dùng không thành công.");
                }
            },
            error: function (xhr, status, error) {
                console.error("Lỗi khi xóa người dùng:", error);
                alert("Có lỗi xảy ra khi xóa người dùng.");
            }
        });
    }
});
