$(document).ready(function () {
    // Bắt sự kiện click cho nút đăng nhập
    $("#btn-signin").click(function (event) {
        // Lấy giá trị từ input
        var username = $("#username").val();
        var password = $("#password").val();

        // Kiểm tra xem đã nhập đủ thông tin chưa
        if (!username || !password) {
            alert("Please enter both username and password!");
            return; // Dừng lại nếu input trống
        }

        // Gửi yêu cầu đăng nhập với AJAX
        $.ajax({
            method: "POST",
            url: "http://localhost:8080/login/signin",
            data: {
                username: username,
                password: password
            }
        })
            .done(function (msg) {
                console.log(msg); // Chỉ gọi console.log bên trong done
                if (msg.success) {
                    // Lưu token và userId vào localStorage nếu đăng nhập thành công
                    localStorage.setItem("token", msg.data.token); // Giả sử trả về token trong msg.data
                    localStorage.setItem("username", username); // Lưu tên người dùng vào localStorage
                    localStorage.setItem("userId", msg.data.userId); // Lưu userId vào localStorage

                    // Chuyển hướng về trang chính sau khi đăng nhập
                    window.location.href = "/doanjav-master/index.html";
                } else {
                    alert("Login failed!");
                }
            })
            .fail(function () {
                alert("Error connecting to server!");
            });
    });

    // Kiểm tra nếu có username trong localStorage thì hiển thị tên người dùng trong navbar
    const loggedInUser = localStorage.getItem("username");
    const usernameDisplay = document.getElementById("username-display");
    const logoutButton = document.getElementById("logout-button");

    if (loggedInUser) {
        // Cập nhật phần tử hiển thị tên người dùng
        usernameDisplay.textContent = `Hi, ${loggedInUser}`;
    }

    // Xử lý sự kiện đăng xuất
    if (logoutButton) {
        logoutButton.addEventListener("click", (e) => {
            e.preventDefault();
            localStorage.removeItem("username");
            localStorage.removeItem("token"); // Xóa token khi đăng xuất
            localStorage.removeItem("userId"); // Xóa userId khi đăng xuất

            // Chuyển hướng về trang index sau khi đăng xuất
            window.location.href = "/doanjav-master/index.html";
        });
    }

    // Cập nhật navbar với tên người dùng nếu đã đăng nhập
    if (loggedInUser) {
        const userLink = document.querySelector("#navbar .fa-user");
        userLink.parentElement.innerHTML = `<a class="username" href="login.html">Hi, ${loggedInUser}</a>`;
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const loggedInUser = localStorage.getItem("username");
    if (loggedInUser) {
        document.querySelector("#navbar .fa-user").parentElement.innerHTML = `<a class="username" href="login.html">Hi, ${loggedInUser}</a>`;
    }
});
