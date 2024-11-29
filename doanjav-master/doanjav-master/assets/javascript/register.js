$(document).ready(function () {
    // Xử lý sự kiện nhấn nút đăng ký
    $(".form-box.register button").click(function (event) {
        event.preventDefault(); // Ngăn chặn form reload

        // Lấy dữ liệu từ các ô input
        const username = $(".form-box.register input[type='text']").val().trim();
        const email = $(".form-box.register input[type='email']").val().trim();
        const password = $(".form-box.register input[type='password']").val().trim();
        const termsAccepted = $(".form-box.register input[type='checkbox']").is(":checked");

        // Kiểm tra thông tin đầu vào
        if (!username || !email || !password) {
            alert("Vui lòng điền đầy đủ thông tin!");
            return;
        }
        if (!termsAccepted) {
            alert("Vui lòng chấp nhận điều khoản và điều kiện!");
            return;
        }

        // Hiển thị trạng thái loading (nếu cần)
        $(".form-box.register button").text("Đang xử lý...").attr("disabled", true);

        // Log thông tin người dùng và kiểm tra
        console.log("Dữ liệu gửi lên:", { username, email, password });

        // Gửi dữ liệu lên server
        $.ajax({
            method: "POST",
            url: "http://localhost:8080/login/signup",
            contentType: "application/json",
            data: JSON.stringify({
                username: username,
                email: email,
                password: password,
                role_id: 1
            }),
        })
            .done(function (response) {
                try {
                    // Kiểm tra và log toàn bộ phản hồi từ server
                    console.log("Full response from server:", response);

                    // Kiểm tra nếu response có success = true
                    if (response && response.success) {
                        alert("Đăng ký thành công!");
                        localStorage.setItem("username", username); // Lưu tên người dùng vào localStorage
                        window.location.href = "/doanjav-master/index.html"; // Chuyển hướng về trang chính
                    } else {
                        // Nếu response.success = false, thông báo lỗi
                        alert(response.data || "Đăng ký thất bại. Vui lòng thử lại!");
                    }
                } catch (error) {
                    console.error("Lỗi xử lý dữ liệu từ server:", error);
                    alert("Có lỗi xảy ra khi xử lý phản hồi từ server.");
                }
            })
            .fail(function (xhr, status, error) {
                console.error("Lỗi kết nối hoặc server trả về lỗi:", status, error);
                console.log("Chi tiết lỗi:", xhr.responseText); // In thông báo chi tiết lỗi từ server
                alert("Không thể kết nối đến máy chủ. Vui lòng thử lại sau.");
            })
            .always(function () {
                // Hoàn tất, khôi phục trạng thái nút
                $(".form-box.register button").text("Đăng ký").attr("disabled", false);
            });
    });

    // Hiển thị tên người dùng trong navbar nếu đã đăng ký
    const loggedInUser = localStorage.getItem("username");
    if (loggedInUser) {
        const userLink = document.querySelector("#navbar .fa-user");
        if (userLink) {
            console.log("Tên người dùng đã đăng nhập:", loggedInUser);
            userLink.parentElement.innerHTML = `<a class="username" href="login.html">Hi, ${loggedInUser}</a>`;
        }
    }

    // Xử lý sự kiện đăng xuất
    const logoutButton = document.getElementById("logout-button");
    if (logoutButton) {
        logoutButton.addEventListener("click", (e) => {
            e.preventDefault();
            localStorage.removeItem("username");

            // Chuyển hướng về trang chính sau khi đăng xuất
            window.location.href = "/doanjav-master/index.html";
        });
    }
});