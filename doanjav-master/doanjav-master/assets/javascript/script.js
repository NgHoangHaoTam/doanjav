// Lấy phần tử header
let header = document.getElementById("header");

// Biến lưu trữ vị trí cuộn trước đó
let lastScrollTop = 0;

// Lắng nghe sự kiện cuộn trang
window.addEventListener("scroll", function() {
    let currentScroll = window.pageYOffset || document.documentElement.scrollTop;

    if (currentScroll > lastScrollTop) {
        // Nếu cuộn xuống thì ẩn header
        header.style.top = "-80px"; // Điều chỉnh giá trị này để vừa với chiều cao của header
    } else {
        // Nếu cuộn lên thì hiển thị header
        header.style.top = "0";
    }

    // Cập nhật vị trí cuộn trước đó
    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll; // Đảm bảo không bị âm
});
