$(document).ready(function () {
    $("#btn-signin").click(function (event) {
        event.preventDefault();
        
        var username = $("#username").val();
        var password = $("#password").val();

        if (!username || !password) {
            alert("Please enter both username and password!");
            return;
        }

        $.ajax({
            method: "POST",
            url: "http://localhost:8080/login/admin/signin",
            data: { username: username, password: password },
            success: function (msg) {
                console.log("Response from server:", msg);

                if (msg.success) {
                    localStorage.setItem("token", msg.data.token);
                    localStorage.setItem("username", username); // Lưu username vào localStorage
                    localStorage.setItem("adminId", msg.data.adminId);

                    window.location.href = "/admin/index.html"; // Chuyển đến trang admin
                } else {
                    alert("Login failed! Please check your credentials.");
                }
            },
            error: function () {
                alert("Error connecting to the server.");
            }
        });
    });

   
});
$("#btn-logout").click(function () {
    console.log("Logging out...");

    // Kiểm tra giá trị trước khi xóa
    console.log("Token before removal:", localStorage.getItem("token"));
    console.log("Username before removal:", localStorage.getItem("username"));
    console.log("Admin ID before removal:", localStorage.getItem("adminId"));

    // Xóa token và thông tin người dùng khỏi localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("adminId");

    // Kiểm tra giá trị sau khi xóa
    console.log("Token after removal:", localStorage.getItem("token"));
    console.log("Username after removal:", localStorage.getItem("username"));
    console.log("Admin ID after removal:", localStorage.getItem("adminId"));

    // Chuyển hướng về trang đăng nhập
    window.location.href = "/admin/login.html";
});


