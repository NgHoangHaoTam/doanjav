// Lấy các phần tử hình ảnh nhỏ và hình ảnh lớn
const mainImg = document.getElementById("MainImg");
const smallImgs = document.querySelectorAll(".small-img");

// Lưu lại đường dẫn ảnh mặc định của hình lớn
const defaultSrc = mainImg.src;

// Duyệt qua các hình nhỏ và thêm sự kiện
smallImgs.forEach((img) => {
    img.addEventListener("mouseover", () => {
        mainImg.src = img.src; // Thay đổi hình lớn khi di chuột vào hình nhỏ
    });

    img.addEventListener("mouseout", () => {
        mainImg.src = defaultSrc; // Trở về hình mặc định khi rời chuột khỏi hình nhỏ
    });
});