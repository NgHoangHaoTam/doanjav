package com.Myfriend.JavaWebsite.Repository;

import com.Myfriend.JavaWebsite.Entity.Products;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends JpaRepository<Products, Long> {

    Products findProductsById(int id);
}

