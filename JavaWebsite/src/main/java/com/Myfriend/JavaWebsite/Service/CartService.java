package com.Myfriend.JavaWebsite.Service;

import com.Myfriend.JavaWebsite.Entity.Cart;
import com.Myfriend.JavaWebsite.Entity.Users;
import com.Myfriend.JavaWebsite.Exception.ResourceNotFoundException;
import com.Myfriend.JavaWebsite.Repository.CartItemRepository;
import com.Myfriend.JavaWebsite.Repository.CartRepository;
import com.Myfriend.JavaWebsite.Repository.UserRepository;
import com.Myfriend.JavaWebsite.Service.Imp.CartServiceImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.concurrent.atomic.AtomicInteger;

@Service

public class CartService implements CartServiceImp {
    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private CartItemRepository cartItemRepository;

    private final AtomicInteger cartIdGenerator = new AtomicInteger(0);


    @Autowired
    private UserRepository userRepository;

    @Override
    public Cart getCartById(Integer cart_id) {
        return cartRepository.findById(cart_id)
                .orElseGet(() -> {
                    System.out.println("Cart not found. Creating a new one with ID: " + cart_id);
                    Cart newCart = new Cart();
                    newCart.setId(cart_id);
                    newCart.setTotalAmount(BigDecimal.ZERO);
                    return cartRepository.save(newCart);
                });
    }


    @Override
    public List<Cart> getAllCarts() {
        return cartRepository.findAll();
    }

    @Transactional
    @Override
    public void ClearCartById(Integer card_id) {
        Cart cart = getCartById(card_id);
        cartItemRepository.deleteAllByCartId(card_id);
        cart.getCartItems().clear();
        cartRepository.deleteById(card_id);
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
    @Override
    public Cart createCartForUser(Users user) {
        if (user == null) {
            throw new IllegalArgumentException("User cannot be null when creating a cart.");
        }
        Cart cart = new Cart();
        cart.setUser(user); // Đảm bảo gán user vào cart
        cart.setTotalAmount(BigDecimal.ZERO); // Giá trị mặc định
        return cartRepository.save(cart);
    }


    @Override
    public Cart getCartByUserId(Integer userId) {
        return cartRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("Cart not found for user ID: " + userId));
    }

    @Override
    public Cart getOrCreateCartByUserId(Integer userId) {
        return cartRepository.findByUserId(userId)
                .orElseGet(() -> {
                    Users user = userRepository.findById(userId).orElseThrow(() -> new ResourceNotFoundException("User not found with ID: " + userId));
                    return createCartForUser(user);
                });
    }
    @Override
    public boolean checkCartById(Integer cartId){
        return cartRepository.findById(cartId).isPresent();

    }

}