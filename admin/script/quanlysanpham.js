// Function to check if the user is logged in
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
    var LinkProduct = "http://localhost:8080/product";
    var token = localStorage.getItem("token");

    if (!token) {
        alert("You are not logged in.");
        window.location.href = "login.html"; // Redirect to login if no token found
        return;
    }

    console.log("Token:", token);

    // Fetch product list
    function loadProducts() {
        $.ajax({
            method: "GET",
            url: LinkProduct,
            headers: {
                'Authorization': `Bearer ${token}` // Added Bearer keyword for Authorization header
            },
            success: function (msg) {
                console.log("Response from API:", msg); // Log the API response to inspect the structure

                if (msg.success) {
                    // Clear previous data in case this is a reload
                    $("#Product_show").empty();

                    // Iterate through the product data and display them
                    $.each(msg.data, function (index, value) {
                        console.log("Product data:", value); // Log each product's data

                        // HTML for product row with delete button
                        var html = `<tr>
                                        <td>${value.id}</td>
                                        <td>${value.brand}</td>
                                        <td>${value.name}</td>
                                        <td><img src="${LinkProduct}/files/${value.image}" alt="Product Image" width="50" height="50"></td>
                                        <td>${value.price}</td>
                                        <td>${value.description}</td>
                                        <td>
                                            <button class="btn btn-danger btn-delete" data-id="${value.id}">
                                                Xóa
                                            </button>
                                        </td>
                                    </tr>`;

                        $("#Product_show").append(html);
                    });

                    // Add click event to delete buttons
                    $(".btn-delete").click(function () {
                        var productId = $(this).data("id");
                        deleteProduct(productId);
                    });
                } else {
                    alert("Failed to fetch products");
                }
            },
            error: function (xhr, status, error) {
                console.error("Error fetching products:", error);
                alert("An error occurred while fetching the product data.");
            }
        });
    }

    // Function to delete a product
    function deleteProduct(productId) {
        if (confirm("Bạn có chắc chắn muốn xóa sản phẩm này không?")) {
            $.ajax({
                method: "DELETE",
                url: `${LinkProduct}/${productId}/remove`,
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                success: function (response) {
                    console.log("Delete response:", response);

                    if (response.success) {
                        alert("Xóa sản phẩm thành công!");
                        loadProducts(); // Reload the product list after deletion
                    } else {
                        alert("Xóa sản phẩm thất bại.");
                    }
                },
                error: function (xhr, status, error) {
                    console.error("Error deleting product:", error);
                    alert("Có lỗi xảy ra khi xóa sản phẩm.");
                }
            });
        }
    }
    // Load the products when the page is ready
    loadProducts();
});
