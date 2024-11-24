package com.Myfriend.JavaWebsite.Repository;

import com.Myfriend.JavaWebsite.Entity.Cart;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CartRepository extends JpaRepository<Cart, Integer> {

}
