package com.Myfriend.JavaWebsite.Service.Imp;

import com.Myfriend.JavaWebsite.Entity.Cart;
import com.Myfriend.JavaWebsite.Entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;

import java.math.BigDecimal;
import java.util.List;

public interface CartServiceImp  {
    Cart getCartById(Integer cart_id);

    List<Cart> getAllCarts();

    void ClearCartById(Integer card_id);

    BigDecimal getCartTotal(int id);

    int initializeNewCart();

    Cart createCartForUser(Users user);

    Cart getCartByUserId(Integer userId);

    Cart getOrCreateCartByUserId(Integer userId);
    public boolean checkCartById(Integer cartId);
}