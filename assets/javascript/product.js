// Dữ liệu sản phẩm
const products = {
    1: {
        name: "Áo polo nam nữ",
        breadcrumb: "Home / Áo Polo",
        price: "159.000đ",
        mainImg: "./assets/img/products/f1.jpg",
        images: [
            "./assets/img/products/f1.jpg",
            "./assets/img/products/f2.jpg",
            "./assets/img/products/f3.jpg",
            "./assets/img/products/f4.jpg"
        ],
        description: "Áo polo nam nữ phong cách trẻ trung, thích hợp cho mọi dịp."
    },
    2: {
        name: "Áo thun unisex nam nữ",
        breadcrumb: "Home / Áo Thun",
        price: "129.000đ",
        mainImg: "./assets/img/products/f2.jpg",
        images: [
            "./assets/img/products/f2.jpg",
            "./assets/img/products/f3.jpg",
            "./assets/img/products/f4.jpg",
            "./assets/img/products/f1.jpg"
        ],
        description: "Áo thun unisex, thời trang trẻ trung, phù hợp cho mọi lứa tuổi."
    },
    3: {
        name: "Áo thun unisex nam nữ",
        breadcrumb: "Home / Áo Thun",
        price: "99.000đ",
        mainImg: "./assets/img/products/f3.jpg",
        images: [
            "./assets/img/products/f3.jpg",
            "./assets/img/products/f2.jpg",
            "./assets/img/products/f4.jpg",
            "./assets/img/products/f1.jpg"
        ],
        description: "Áo thun unisex, thiết kế đơn giản, dễ dàng kết hợp với nhiều trang phục."
    },
    4: {
        name: "Áo sơ mi nam tay ngắn",
        breadcrumb: "Home / Áo Sơ Mi",
        price: "299.000đ",
        mainImg: "./assets/img/products/f4.jpg",
        images: [
            "./assets/img/products/f4.jpg",
            "./assets/img/products/f5.jpg",
            "./assets/img/products/f6.jpg",
            "./assets/img/products/f7.jpg"
        ],
        description: "Áo sơ mi nam tay ngắn, chất liệu vải mềm mại, phù hợp cho mùa hè."
    },
    5: {
        name: "Áo sơ mi nam tay ngắn",
        breadcrumb: "Home / Áo Sơ Mi",
        price: "300.000đ",
        mainImg: "./assets/img/products/f5.jpg",
        images: [
            "./assets/img/products/f5.jpg",
            "./assets/img/products/f6.jpg",
            "./assets/img/products/f7.jpg",
            "./assets/img/products/f8.jpg"
        ],
        description: "Áo sơ mi nam tay ngắn, thiết kế trẻ trung, dễ phối hợp với nhiều loại trang phục."
    },
    6: {
        name: "Áo sơ mi nam Basic chất kaki",
        breadcrumb: "Home / Áo Sơ Mi",
        price: "259.000đ",
        mainImg: "./assets/img/products/f6.jpg",
        images: [
            "./assets/img/products/f6.jpg",
            "./assets/img/products/f5.jpg",
            "./assets/img/products/f7.jpg",
            "./assets/img/products/f8.jpg"
        ],
        description: "Áo sơ mi nam chất kaki, kiểu dáng đơn giản nhưng rất thanh lịch."
    },
    7: {
        name: "Áo len nam phong cách Hàn Quốc",
        breadcrumb: "Home / Áo Len",
        price: "329.000đ",
        mainImg: "./assets/img/products/f7.jpg",
        images: [
            "./assets/img/products/f7.jpg",
            "./assets/img/products/f6.jpg",
            "./assets/img/products/f5.jpg",
            "./assets/img/products/f4.jpg"
        ],
        description: "Áo len nam phong cách Hàn Quốc, ấm áp và thời trang cho mùa đông."
    },
    8: {
        name: "Áo len nam thu đông",
        breadcrumb: "Home / Áo Len",
        price: "299.000đ",
        mainImg: "./assets/img/products/f8.jpg",
        images: [
            "./assets/img/products/f8.jpg",
            "./assets/img/products/f7.jpg",
            "./assets/img/products/f6.jpg",
            "./assets/img/products/f5.jpg"
        ],
        description: "Áo len nam thu đông, chất liệu mềm mại, thích hợp cho thời tiết lạnh."
    },
    9: {
        name: "Áo thun nam Cardigan dài tay",
        breadcrumb: "Home / Áo Thun",
        price: "289.000đ",
        mainImg: "./assets/img/products/n1.jpg",
        images: [
            "./assets/img/products/n1.jpg",
            "./assets/img/products/n2.jpg",
            "./assets/img/products/n3.jpg",
            "./assets/img/products/n4.jpg"
        ],
        description: "Áo thun nam Cardigan dài tay, giữ ấm tốt, phong cách trẻ trung."
    },
    10: {
        name: "Áo khoác Cardigan",
        breadcrumb: "Home / Áo Khoác",
        price: "259.000đ",
        mainImg: "./assets/img/products/n2.jpg",
        images: [
            "./assets/img/products/n2.jpg",
            "./assets/img/products/n3.jpg",
            "./assets/img/products/n4.jpg",
            "./assets/img/products/n5.jpg"
        ],
        description: "Áo khoác Cardigan, thiết kế ấm áp và thời trang."
    },
    11: {
        name: "Áo khoác dạ nam",
        breadcrumb: "Home / Áo Khoác",
        price: "359.000đ",
        mainImg: "./assets/img/products/n3.jpg",
        images: [
            "./assets/img/products/n3.jpg",
            "./assets/img/products/n4.jpg",
            "./assets/img/products/n5.jpg",
            "./assets/img/products/n6.jpg"
        ],
        description: "Áo khoác dạ nam, thiết kế thời trang, phù hợp cho mùa đông."
    },
    12: {
        name: "Áo khoác thể thao tay dài",
        breadcrumb: "Home / Áo Khoác",
        price: "319.000đ",
        mainImg: "./assets/img/products/n4.jpg",
        images: [
            "./assets/img/products/n4.jpg",
            "./assets/img/products/n5.jpg",
            "./assets/img/products/n6.jpg",
            "./assets/img/products/n7.jpg"
        ],
        description: "Áo khoác thể thao tay dài, chất liệu thoải mái và linh hoạt cho mọi hoạt động."
    },
    13: {
        name: "Áo khoác JEAN nam",
        breadcrumb: "Home / Áo Khoác",
        price: "359.000đ",
        mainImg: "./assets/img/products/n5.jpg",
        images: [
            "./assets/img/products/n5.jpg",
            "./assets/img/products/n6.jpg",
            "./assets/img/products/n7.jpg",
            "./assets/img/products/n8.jpg"
        ],
        description: "Áo khoác JEAN nam, phong cách năng động và cá tính."
    },
    14: {
        name: "Áo Hoodie zip",
        breadcrumb: "Home / Áo Hoodie",
        price: "299.000đ",
        mainImg: "./assets/img/products/n6.jpg",
        images: [
            "./assets/img/products/n6.jpg",
            "./assets/img/products/n7.jpg",
            "./assets/img/products/n8.jpg",
            "./assets/img/products/n1.jpg"
        ],
        description: "Áo Hoodie zip, ấm áp và thoải mái cho những ngày lạnh."
    },
    15: {
        name: "Áo thun phối thể thao",
        breadcrumb: "Home / Áo Thun",
        price: "129.000đ",
        mainImg: "./assets/img/products/n7.jpg",
        images: [
            "./assets/img/products/n7.jpg",
            "./assets/img/products/n8.jpg",
            "./assets/img/products/n1.jpg",
            "./assets/img/products/n2.jpg"
        ],
        description: "Áo thun phối thể thao, trẻ trung và năng động."
    },
    16: {
        name: "Áo thun Boxy",
        breadcrumb: "Home / Áo Thun",
        price: "119.000đ",
        mainImg: "./assets/img/products/n8.jpg",
        images: [
            "./assets/img/products/n8.jpg",
            "./assets/img/products/n1.jpg",
            "./assets/img/products/n2.jpg",
            "./assets/img/products/n3.jpg"
        ],
        description: "Áo thun Boxy, thiết kế đơn giản nhưng rất hiện đại."
    }
};



// Lấy ID sản phẩm từ URL
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');


// Nếu sản phẩm tồn tại, hiển thị thông tin và hình ảnh
if (products[productId]) {
    const product = products[productId];
    
    // Cập nhật ảnh chính
    const mainImg = document.getElementById("MainImg");
    MainImg.src = product.mainImg;  // Đặt ảnh chính mặc định
    
    // Cập nhật các ảnh nhỏ
    const smallImgGroup = document.getElementById("smallImgGroup");
    smallImgGroup.innerHTML = ""; // Xóa các ảnh mẫu nếu có

    
    product.images.forEach(imgSrc => {
        const imgDiv = document.createElement("div");
        imgDiv.classList.add("col-sm-3");
        
        
        // Tạo ảnh nhỏ
        const smallImg = document.createElement("img");
        smallImg.src = imgSrc;
        smallImg.classList.add("small-img");
        smallImg.width = 100;
        
        // Thêm sự kiện mouseover và mouseout
        smallImg.addEventListener("mouseover", () => {
            mainImg.src = imgSrc;  // Cập nhật ảnh chính khi hover qua ảnh nhỏ
        });
        
        // Khi chuột rời khỏi ảnh nhỏ, trở lại ảnh mặc định
        smallImg.addEventListener("mouseout", () => {
            mainImg.src = product.mainImg;  // Quay lại ảnh chính mặc định
        });
        
        imgDiv.appendChild(smallImg);
        smallImgGroup.appendChild(imgDiv);
    });

    // Cập nhật các thông tin khác
    document.getElementById("breadcrumb").textContent = product.breadcrumb;
    document.getElementById("productName").textContent = product.name;
    document.getElementById("productPrice").textContent = product.price;
    document.getElementById("productDescription").textContent = product.description;
} else {
    // Hiển thị thông báo nếu ID sản phẩm không hợp lệ
    document.querySelector(".single-pro-details h4").textContent = "Sản phẩm không tồn tại.";
}
