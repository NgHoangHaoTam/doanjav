package com.Myfriend.JavaWebsite.Service;

import com.Myfriend.JavaWebsite.Entity.Products;
import com.Myfriend.JavaWebsite.Repository.ProductRepository;
import com.Myfriend.JavaWebsite.Service.Imp.FileServiceImp;
import com.Myfriend.JavaWebsite.Service.Imp.ProductServiceImp;
import com.Myfriend.JavaWebsite.dto.ProductDTO;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Service
public class ProductService implements ProductServiceImp {
    @Autowired
    ProductRepository productRepository;
    @Autowired
    FileServiceImp fileServiceImp;
    @Override
    public boolean insertProduct(MultipartFile file, String product_name, String description
            ,  double price, int quantity,String product_desc) {
        boolean isInsertSuccess = false;
        try{
            boolean isSavedFileSuccess = fileServiceImp.saveFile(file);
            if(isSavedFileSuccess) {
                Products products = new Products();
                products.setProduct_name(product_name);
                products.setDescription(description);
                products.setProduct_image(file.getOriginalFilename());
                products.setPrice(price);
                products.setQuantity(quantity);
                products.setProduct_desc(product_desc);
                productRepository.save(products);
                isInsertSuccess = true;
            }
        } catch (Exception e) {
            System.out.println("Error" + e.getMessage());
            return false;
        }
        return isInsertSuccess;
    }

    @Override
    public List<ProductDTO> getProducts() {
        List<ProductDTO> productDTOList = new ArrayList<>();
        PageRequest pageRequest = PageRequest.of(0, 20);
        Page<Products> listPage= productRepository.findAll(pageRequest);
        for (Products data : listPage) {
            ProductDTO productDTO = new ProductDTO();
            productDTO.setId(data.getId());
            productDTO.setImage(data.getProduct_image());
            productDTO.setName(data.getProduct_name());
            productDTO.setDescription(data.getDescription());
            productDTO.setPrice(data.getPrice());
            productDTO.setProduct_desc(data.getProduct_desc());
            productDTOList.add(productDTO);
        }
        return productDTOList;
    }

    @Override
    public Products getProductById(int id) {
        Products products = productRepository.findProductsById(id);
        if(checkProductExist(id)){
            return products;
        }else {
            System.out.println("Error");
            return null;
        }

    }

    @Override
    public boolean checkProductExist(int id) {
        Products products = productRepository.findProductsById(id);
        if (products == null) {
            return false;
        }else {
            return true;
        }
    }

    @Override
    public Products removeProduct(long id) {
        // Attempt to find the product by ID
        Products product = productRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Product with ID " + id + " not found"));

        // Remove the product
        productRepository.delete(product);

        // Return the removed product
        return product;
    }






}
