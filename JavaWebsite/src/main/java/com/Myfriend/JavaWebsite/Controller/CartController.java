package com.Myfriend.JavaWebsite.Controller;

import com.Myfriend.JavaWebsite.Entity.Cart;
import com.Myfriend.JavaWebsite.Service.CartService;
import com.Myfriend.JavaWebsite.payload.ReponseData;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/cart")
public class CartController {

    @Autowired
    private CartService cartService;

    // Sử dụng constructor injection
    public CartController(CartService cartService) {
        this.cartService = cartService;
    }

    @GetMapping("/{cart_id}/my_cart")
    public ResponseEntity<?> getCart(@PathVariable Integer cart_id) {
        Cart cart = cartService.getCartById(cart_id);
        ReponseData responseData = new ReponseData();

        // Kiểm tra giỏ hàng có tồn tại hay không
        if (cart != null) {
            responseData.setData(cart);
            return new ResponseEntity<>(responseData, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(responseData, HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{cart_id}/clear")
    public ResponseEntity<?> clearCart(@PathVariable Integer cart_id) {
        ReponseData responseData = new ReponseData();
        cartService.ClearCartById(cart_id);
        return new ResponseEntity<>(responseData, HttpStatus.OK);
    }


    @GetMapping("{cart_id}/cart/total_price")
    public ResponseEntity<?> getTotalAmount(@PathVariable Integer cart_id) {
        System.out.println("Error" + cart_id);
        BigDecimal totalPrice = cartService.getCartTotal(cart_id);
        return new ResponseEntity<>(totalPrice, HttpStatus.OK);
    }

}

