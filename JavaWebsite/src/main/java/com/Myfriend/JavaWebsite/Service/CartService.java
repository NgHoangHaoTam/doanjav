package com.Myfriend.JavaWebsite.Service;

import com.Myfriend.JavaWebsite.Entity.Cart;
import com.Myfriend.JavaWebsite.Exception.ResourceNotFoundException;
import com.Myfriend.JavaWebsite.Repository.CartItemRepository;
import com.Myfriend.JavaWebsite.Repository.CartRepository;
import com.Myfriend.JavaWebsite.Service.Imp.CartServiceImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.concurrent.atomic.AtomicInteger;

@Service

public class CartService implements CartServiceImp {
    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private CartItemRepository cartItemRepository;

    private final AtomicInteger cartIdGenerator = new AtomicInteger(0);

    @Override
    public Cart getCartById(Integer cart_id) {
        Cart cart = cartRepository.findById(cart_id)
                .orElseThrow(() -> new ResourceNotFoundException("Cart Not Found"));
        BigDecimal totalAmount = cart.getTotalAmount();
        cart.setTotalAmount(totalAmount.subtract(totalAmount));
        return cartRepository.save(cart);
    }


    @Override
    public void ClearCartById(int id) {
        Cart cart = getCartById(id);
        cartItemRepository.deleteAllByCartId(id);
        cart.getCartItems().clear();
        cartRepository.deleteById(id);
    }

    @Override
    public BigDecimal getCartTotal(int id) {
        Cart cart = getCartById(id);
        return cart.getTotalAmount();
    }

    @Override
    public int initializeNewCart() {
        Cart newCart = new Cart();
        int newCartId = cartIdGenerator.incrementAndGet();
        newCart.setId(newCartId);
        return cartRepository.save(newCart).getId();

    }

}
