package com.Myfriend.JavaWebsite.Controller;

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

        ReponseData reponseData = new ReponseData();
        if(loginServiceImp.checkLogin(username, password)) {
            String token = jwtUtilHelper.generateToken(username);
            reponseData.setData(token);

        }else {
            reponseData.setData("");
            reponseData.setSuccess(false);
        }


        return new ResponseEntity<>(reponseData, HttpStatus.OK);
    }
    @PostMapping("/signup")
    public ResponseEntity<?> Signup(@RequestBody RegisterRequest registerRequest) {
        ReponseData responseData = new ReponseData();

        return new ResponseEntity<>(responseData , HttpStatus.OK);
    }




}
