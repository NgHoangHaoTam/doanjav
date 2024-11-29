package com.Myfriend.JavaWebsite.Controller;

import com.Myfriend.JavaWebsite.Repository.CartRepository;
import com.Myfriend.JavaWebsite.Service.CartItemService;
import com.Myfriend.JavaWebsite.Service.CartService;
import com.Myfriend.JavaWebsite.dto.CartItemDTO;
import com.Myfriend.JavaWebsite.payload.ReponseData;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/cartItem")
public class CartItemController {

    @Autowired
    private CartItemService cartItemService;

    @Autowired
    private CartService cartService;

    private Integer cartId; // Updated to Integer wrapper class

    @PostMapping("/item/add")
    public ResponseEntity<?> addItemToCart(
            @RequestParam(required = false) Integer cartId,
            @RequestParam(required = false) Integer productId,
            @RequestParam int quantity) {
        ReponseData reponseData = new ReponseData();

        // Log giá trị các tham số
        System.out.println("cartId: " + cartId);
        System.out.println("productId: " + productId);
        System.out.println("quantity: " + quantity);

        try {
            if (productId == null) {
                reponseData.setData("Product ID is required");
                return new ResponseEntity<>(reponseData, HttpStatus.BAD_REQUEST);
            }

            if (quantity <= 0) {
                reponseData.setData("Quantity must be greater than 0");
                return new ResponseEntity<>(reponseData, HttpStatus.BAD_REQUEST);
            }

            if (cartId == null || cartId <= 0) {
                cartId = cartService.initializeNewCart();
            }

            cartItemService.addItemToCart(cartId, productId, quantity);
            reponseData.setData("Item added to cart successfully");
            return new ResponseEntity<>(reponseData, HttpStatus.OK);

        } catch (Exception e) {
            e.printStackTrace();
            reponseData.setData("Error: add: " + e.getMessage());
            return new ResponseEntity<>(reponseData, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/cart/{cartId}/item/{itemId}/remove")
    public ResponseEntity<?> removeItemFromCart(
            @PathVariable Integer cartId
            , @PathVariable Integer itemId) {
        ReponseData reponseData = new ReponseData();
        try {
            cartItemService.removeItemToCart(cartId, itemId);
            reponseData.setData("Item removed from cart successfully");
            return new ResponseEntity<>(reponseData, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            reponseData.setData("Error: remove " + e.getMessage());
            return new ResponseEntity<>(reponseData, HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/cart/{cartId}/item/{itemId}/update")
    public ResponseEntity<?> updateItemQuantity(
            @PathVariable Integer cartId,
            @PathVariable Integer itemId,
            @RequestParam int quantity) {
        ReponseData reponseData = new ReponseData();

        try {
            cartItemService.updateItemQuantity(cartId, itemId, quantity);
            reponseData.setData("Item updated successfully");
            return new ResponseEntity<>(reponseData, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            reponseData.setData("Error: update:  " + e.getMessage());
            return new ResponseEntity<>(reponseData, HttpStatus.BAD_REQUEST);
        }
    }
    @GetMapping("/cartItems")
    public ResponseEntity<?> getAllCartItems() {
        try {
            List<CartItemDTO> cartItems = cartItemService.getAllCartItems();
            return new ResponseEntity<>(cartItems, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>("Error fetching cart items", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
