package com.Myfriend.JavaWebsite.Service.Imp;

import com.Myfriend.JavaWebsite.Entity.Products;
import com.Myfriend.JavaWebsite.dto.ProductDTO;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface ProductServiceImp {
    boolean insertProduct(MultipartFile file,
                           String product_name,
                           String description,
                           double price,
                           int quantity, String product_desc);

    List<ProductDTO> getProducts();

    Products getProductById(int id);

    boolean checkProductExist(int id);

}

