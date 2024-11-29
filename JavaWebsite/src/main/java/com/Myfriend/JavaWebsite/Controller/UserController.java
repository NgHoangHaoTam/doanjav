package com.Myfriend.JavaWebsite.Controller;

import com.Myfriend.JavaWebsite.Entity.Users;
import com.Myfriend.JavaWebsite.Service.Imp.UserServiceImp;
import com.Myfriend.JavaWebsite.payload.ReponseData;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("*")
@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    UserServiceImp userServiceImp ;



    @GetMapping("")
    public ResponseEntity<?> getAllUsers() {

        return new ResponseEntity<>(userServiceImp.getAllUsers(), HttpStatus.OK);
    }


    @DeleteMapping("/{userId}/deleteuser")
    public ResponseEntity<?> deleteUser(@PathVariable Integer userId) {
        ReponseData reponseData = new ReponseData();
        try {
            Users users=userServiceImp.removeUserById(userId);
            reponseData.setData(users);
            return new ResponseEntity<>(reponseData, HttpStatus.OK);
        } catch (EntityNotFoundException e) {
            System.out.println(e.getMessage());
            return new ResponseEntity<>(reponseData, HttpStatus.NOT_FOUND);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return new ResponseEntity<>(reponseData, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
