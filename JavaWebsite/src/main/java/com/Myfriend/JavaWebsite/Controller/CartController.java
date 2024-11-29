package com.Myfriend.JavaWebsite.Controller;

import com.Myfriend.JavaWebsite.Entity.Cart;
import com.Myfriend.JavaWebsite.Entity.Users;
import com.Myfriend.JavaWebsite.Service.CartService;
import com.Myfriend.JavaWebsite.Service.UserService;
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

    @Autowired
    private UserService userService;
    // Sử dụng constructor injection
    public CartController(CartService cartService) {
        this.cartService = cartService;
    }

    @GetMapping("/{cart_id}/my_cart")
    public ResponseEntity<?> getCart(@PathVariable Integer cart_id) {
        Cart cart = cartService.getCartById(cart_id);
        ReponseData responseData = new ReponseData();

        if (cart != null) {
            responseData.setSuccess(true);  // Đánh dấu thành công
            responseData.setData(cart);
            return new ResponseEntity<>(responseData, HttpStatus.OK);
        } else {
            responseData.setSuccess(false);  // Đánh dấu thất bại
            return new ResponseEntity<>(responseData, HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{cart_id}/clear")
    public ResponseEntity<?> clearCart(@PathVariable Integer cart_id) {
        ReponseData responseData = new ReponseData();
        cartService.ClearCartById(cart_id);
        return new ResponseEntity<>(responseData, HttpStatus.OK);
    }

    @GetMapping("/check/{cart_id}")
    public ResponseEntity<?> checkCart(@PathVariable Integer cart_id) {
        ReponseData responseData = new ReponseData();

        try {
            // Trả về chi tiết giỏ hàng nếu tồn tại, null nếu không tồn tại
            Cart cart = cartService.getCartById(cart_id);

            if (cart != null) {
                responseData.setSuccess(true);
                responseData.setData(cart); // Đưa chi tiết giỏ hàng vào response
                System.out.println("Giỏ hàng hợp lệ: " + cart);
            } else {
                responseData.setSuccess(false);
                responseData.setData(null); // Trả về null nếu không có giỏ hàng
                System.out.println("Giỏ hàng không tồn tại.");
            }

            return new ResponseEntity<>(responseData, HttpStatus.OK);

        } catch (Exception e) {
            responseData.setSuccess(false);
            responseData.setData(null);
            System.out.println("Lỗi khi kiểm tra giỏ hàng: " + e.getMessage());
            return new ResponseEntity<>(responseData, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }



    @GetMapping("{cart_id}/cart/total_price")
    public ResponseEntity<?> getTotalAmount(@PathVariable Integer cart_id) {
        System.out.println("Error" + cart_id);
        BigDecimal totalPrice = cartService.getCartTotal(cart_id);
        return new ResponseEntity<>(totalPrice, HttpStatus.OK);
    }
    @PostMapping("/create")
    public ResponseEntity<?> createCartForUser(@RequestParam Integer userId) {
        Users user = userService.findUserById(userId);
        Cart cart = cartService.createCartForUser(user);
        return new ResponseEntity<>(cart, HttpStatus.CREATED);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<?> getCartByUserId(@PathVariable Integer userId) {
        List<Cart> carts = cartService.getAllCarts();
        return new ResponseEntity<>(carts, HttpStatus.OK);
    }

}

