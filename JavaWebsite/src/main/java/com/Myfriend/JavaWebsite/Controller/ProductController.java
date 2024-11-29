package com.Myfriend.JavaWebsite.Controller;


import com.Myfriend.JavaWebsite.Entity.Products;
import com.Myfriend.JavaWebsite.Service.Imp.FileServiceImp;
import com.Myfriend.JavaWebsite.Service.Imp.ProductServiceImp;
import com.Myfriend.JavaWebsite.payload.ReponseData;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;


@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/product")
public class ProductController {

    @Autowired
    FileServiceImp fileServiceImp;

    @Autowired
    ProductServiceImp productServiceImp;


    @PostMapping()
    public ResponseEntity<?> UploadProduct(
            @RequestParam MultipartFile file,
            @RequestParam String product_name,
            @RequestParam String description,
            @RequestParam int price,
            @RequestParam int quantity,
            @RequestParam String product_desc) {
        System.out.println(file.getOriginalFilename());
        System.out.println(product_name);
        System.out.println(description);
        System.out.println(price);
        System.out.println(quantity);
        System.out.println(product_desc);
        ReponseData reponseData = new ReponseData();
        boolean isSuccess = productServiceImp.insertProduct(
                file, product_name, description, price, quantity, product_desc);

        System.out.println(isSuccess);
        reponseData.setData(isSuccess);
        return new ResponseEntity<>(reponseData, HttpStatus.OK);
    }

    @DeleteMapping("/{productId}/remove")
    public ResponseEntity<?> removeProduct(@PathVariable Integer productId) {
        ReponseData responseData = new ReponseData();
        try {
            Products product = productServiceImp.removeProduct(productId);
            responseData.setData(product);
            return new ResponseEntity<>(responseData, HttpStatus.OK);
        } catch (EntityNotFoundException e) {
            System.out.println(e.getMessage());
            return new ResponseEntity<>(responseData, HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return new ResponseEntity<>(responseData, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping()
    public ResponseEntity<?> GetProduct() {
        ReponseData reponseData = new ReponseData();
        reponseData.setData(productServiceImp.getProducts());
        return new ResponseEntity<>(reponseData, HttpStatus.OK);
    }

    @GetMapping("/detail/{id}")
    public ResponseEntity<?> GetProductDetail(@PathVariable int id) {
        ReponseData reponseData = new ReponseData();
        reponseData.setData(productServiceImp.getProductById(id));
        return new ResponseEntity<>(reponseData, HttpStatus.OK);
    }


    @GetMapping("/files/{filename:.+}")
    public ResponseEntity<?> GetFileProduct(@PathVariable String filename) {
        Resource resource = fileServiceImp.loadFile(filename);

        // Kiểm tra null
        if (resource == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("File không tồn tại: " + filename);
        }

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\""
                        + resource.getFilename() + "\"")
                .body(resource);
    }

}

