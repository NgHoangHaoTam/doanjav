    document.addEventListener("DOMContentLoaded", function () {
        const form = document.getElementById("productForm");

        form.addEventListener("submit", async function (e) {
            e.preventDefault(); 
            

            // Get values from the form
            const file = document.getElementById("photo").files[0];
            const productName = document.getElementById("product_name").value;
            const description = document.getElementById("descriptions").value;
            const price = document.getElementById("price").value;
            const quantity = document.getElementById("quantity").value;
            const productDesc = document.getElementById("product_desc").value;

            // Get productId from somewhere (e.g., form field, localStorage, or URL)
            const productId = document.getElementById("product_id") ? document.getElementById("product_id").value : null;

            // Debugging: Log the productId
            console.log("Product ID: " + productId);

            // Check if a file is selected
            if (!file) {
                alert("Please select a file.");
                return;
            }

            // Prepare the request body
            const formData = new FormData();
            formData.append("file", file);
            formData.append("product_name", productName);
            formData.append("description", description);
            formData.append("price", price);
            formData.append("quantity", quantity);
            formData.append("product_desc", productDesc);
            if (productId) {
                formData.append("product_id", productId); // Add productId if available
            }

            // Debugging: Log FormData content
            console.log("FormData content:");
            for (let pair of formData.entries()) {
                console.log(`${pair[0]}: ${pair[1]}`);
            }

            try {
                // Get token from localStorage and remove all whitespace
                let token = localStorage.getItem('token');

                if (token) {
                    token = token.replace(/\s+/g, ''); // Remove any whitespaces from token
                } else {
                    alert("Authentication token is missing. Please log in.");
                    return;
                }

                // Send the request
                const response = await fetch("http://localhost:8080/product", {
                    method: "POST",
                    headers: {
                        'Authorization': `Bearer ${token}`,  // Make sure token doesn't have any extra spaces
                    },
                    body: formData,
                });

                // Handle response
                if (response.ok) {
                    alert("Product added successfully!");
                    window.location.href = "../qlsanpham.html";
                } else {
                    const errorText = await response.text();
                    alert(`Failed to add product: ${errorText}`);
                }
            } catch (error) {
                console.error("Error:", error);
                alert("An error occurred while adding the product.");
            }
        });
    });
