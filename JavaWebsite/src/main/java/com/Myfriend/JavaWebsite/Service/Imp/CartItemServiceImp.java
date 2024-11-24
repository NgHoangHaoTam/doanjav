package com.Myfriend.JavaWebsite.Service.Imp;

import com.Myfriend.JavaWebsite.Entity.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CartItemServiceImp  {
    void addItemToCart(int cart_id, int product_id, int quantity);
    void removeItemToCart(int cart_id, int product_id);
    void updateItemQuantity(int cart_id, int product_id, int quantity);
    CartItem getCartItem(int cart_id, int product_id);
}
