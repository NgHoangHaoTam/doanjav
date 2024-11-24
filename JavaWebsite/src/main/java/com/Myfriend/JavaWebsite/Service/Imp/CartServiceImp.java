package com.Myfriend.JavaWebsite.Service.Imp;

import com.Myfriend.JavaWebsite.Entity.Cart;
import org.springframework.data.jpa.repository.JpaRepository;

import java.math.BigDecimal;

public interface CartServiceImp  {
    Cart getCartById(Integer cart_id);
    void ClearCartById(int id);
    BigDecimal getCartTotal(int id);

    int initializeNewCart();
}
