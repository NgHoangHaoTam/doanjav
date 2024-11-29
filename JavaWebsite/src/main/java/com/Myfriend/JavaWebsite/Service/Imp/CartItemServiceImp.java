package com.Myfriend.JavaWebsite.Service.Imp;

import com.Myfriend.JavaWebsite.Entity.CartItem;
import com.Myfriend.JavaWebsite.dto.CartItemDTO;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CartItemServiceImp  {
    void addItemToCart(int cart_id, int product_id, int quantity);
    void removeItemToCart(int cart_id, int product_id);
    void updateItemQuantity(int cart_id, int product_id, int quantity);
    CartItem getCartItem(int cart_id, int product_id);

    List<CartItemDTO> getAllCartItems();
}
