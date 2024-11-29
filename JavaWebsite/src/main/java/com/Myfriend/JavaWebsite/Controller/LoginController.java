package com.Myfriend.JavaWebsite.Controller;

import com.Myfriend.JavaWebsite.Entity.Users;
import com.Myfriend.JavaWebsite.Service.Imp.LoginServiceImp;
import com.Myfriend.JavaWebsite.payload.ReponseData;
import com.Myfriend.JavaWebsite.payload.Request.RegisterRequest;

import com.Myfriend.JavaWebsite.utils.JwtUtilHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@CrossOrigin("*")
@RestController
@RequestMapping("/login")
public class LoginController {
    @Autowired
    // @Qualifier ("tenBean")
    LoginServiceImp loginServiceImp;
    @Autowired
    JwtUtilHelper jwtUtilHelper;
    @PostMapping("/signin")
    public ResponseEntity<?> Signin(@RequestParam String username, @RequestParam String password) {
        System.out.println("Username: " + username);
        System.out.println("Password: " + password);

        ReponseData responseData = new ReponseData();

        Users user = loginServiceImp.checkLogin(username, password);

        if (user != null) {
            // Tạo token và phản hồi
            String token = jwtUtilHelper.generateToken(user.getUsername());
            Map<String, Object> data = new HashMap<>();
            data.put("userId", user.getId());
            data.put("username", user.getUsername());
            data.put("token", token);

            responseData.setData(data);
            responseData.setSuccess(true);
        } else {
            responseData.setData("Tên đăng nhập hoặc mật khẩu không chính xác!");
            responseData.setSuccess(false);
        }

        return new ResponseEntity<>(responseData, HttpStatus.OK);
    }

    @PostMapping("/signup")
    public ResponseEntity<?> Signup(@RequestBody RegisterRequest registerRequest) {
        ReponseData responseData = new ReponseData();

        // Gọi phương thức đăng ký từ service
        boolean isRegistered = loginServiceImp.registerUser(registerRequest);

        if (isRegistered) {
            responseData.setSuccess(true);
            responseData.setData("Đăng ký thành công!");
        } else {
            responseData.setSuccess(false);
            responseData.setData("Đăng ký thất bại. Vui lòng kiểm tra lại thông tin.");
        }

        return new ResponseEntity<>(responseData, HttpStatus.OK);
    }
    @PostMapping("/admin/signin")
    public ResponseEntity<?> adminSignin(@RequestParam String username, @RequestParam String password) {
        System.out.println("Admin Username: " + username);
        System.out.println("Admin Password: " + password);

        ReponseData responseData = new ReponseData();

        Users admin = loginServiceImp.checkAdminLogin(username, password);

        if (admin != null) {
            // Tạo token và phản hồi
            String token = jwtUtilHelper.generateToken(admin.getUsername());
            Map<String, Object> data = new HashMap<>();
            data.put("adminId", admin.getId());
            data.put("username", admin.getUsername());
            data.put("token", token);

            responseData.setData(data);
            responseData.setSuccess(true);
        } else {
            responseData.setData("Tên đăng nhập hoặc mật khẩu không chính xác hoặc không phải admin!");
            responseData.setSuccess(false);
        }

        return new ResponseEntity<>(responseData, HttpStatus.OK);
    }
}