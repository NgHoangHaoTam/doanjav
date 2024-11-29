package com.Myfriend.JavaWebsite.Repository;

import com.Myfriend.JavaWebsite.Entity.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CartItemRepository extends JpaRepository<CartItem, Integer> {
    void deleteAllByCartId(int id);

    void deleteByCartId(Integer cartId);

}

