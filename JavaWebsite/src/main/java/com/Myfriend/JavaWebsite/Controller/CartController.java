package com.Myfriend.JavaWebsite.Controller;

import com.Myfriend.JavaWebsite.Entity.Cart;
import com.Myfriend.JavaWebsite.Service.CartService;
import com.Myfriend.JavaWebsite.payload.ReponseData;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;

@CrossOrigin("*")
@RestController
@RequestMapping("/cart")
public class CartController {
    private CartService cartService;

    @GetMapping("/{cart_id}/my_cart")
    public ResponseEntity<?> getCart(@PathVariable Integer cart_id) {
        // Lấy thông tin giỏ hàng bằng id
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


    @DeleteMapping("/{id}/clear")
    public ResponseEntity<?> clearCart(@PathVariable Integer id,@RequestBody Cart cart) {

        cartService.ClearCartById(id);
        return new ResponseEntity<>(cart, HttpStatus.OK);

    }

    @GetMapping("/{id}/cart/total_price")
    public ResponseEntity<?> getTotalAmount(@PathVariable Integer id) {

        BigDecimal totalPrice = cartService.getCartTotal(id);

        return new ResponseEntity<>(totalPrice, HttpStatus.OK);
    }

}
