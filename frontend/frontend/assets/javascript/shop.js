$(document).ready(function () {

    var LinkProduct = "http://localhost:8080/product"
    var token = localStorage.getItem("token")
    console.log(token)


    $.ajax({
        method: "GET",
        url: LinkProduct,
        Headers: {
            'Authorization': `${token}`
        }
    })
        .done(function (msg) {
            if (msg.success) {
                $.each(msg.data, function (index, value) {
                    console.log(value)
                    var html = `<div class="prod" onclick="window.location.href='product.html?id=${value.id}';">
                                    <img src="${LinkProduct}/files/${value.image}" alt="">
                                    <div class="des">
                                        <span>${value.name}</span>
                                        <h5>${value.description}</h5>
                                        <div class="star">
                                            <i class="fas fa-star"></i>
                                            <i class="fas fa-star"></i>
                                            <i class="fas fa-star"></i>
                                            <i class="fas fa-star"></i>
                                            <i class="fas fa-star"></i>
                                        </div>
                                        <h4>${value.price}</h4>
                                    </div>
                                    <a href="cart.html"><i class="fa-solid fa-cart-shopping cart"></i></a>
                                </div>`;


                    console.log(value.image)
                    console.log(html); // Xem chuỗi có vấn đề cú pháp không
                    $("#Product_famous").append(html);

                })


            }

            console.log(msg)
        })

})