package com.Myfriend.JavaWebsite.Service;

import com.Myfriend.JavaWebsite.Entity.Roles;
import com.Myfriend.JavaWebsite.Entity.Users;
import com.Myfriend.JavaWebsite.Repository.UserRepository;
import com.Myfriend.JavaWebsite.Service.Imp.LoginServiceImp;
import com.Myfriend.JavaWebsite.dto.UserDTO;
import com.Myfriend.JavaWebsite.payload.Request.RegisterRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class LoginService implements LoginServiceImp {

    @Autowired
    UserRepository userRepository;

    @Autowired
    PasswordEncoder passwordEncoder;
    @Override
    public List<UserDTO> getAllUser() {
        // Cần implement logic để chuyển User entity thành UserDTO
        List<Users> users = userRepository.findAll();
        List<UserDTO> userDTOList = new ArrayList<>();

        for (Users user : users) {
            UserDTO userDTO = new UserDTO();
            userDTOList.add(userDTO);
        }

        return userDTOList;
    }

    @Override
    public boolean checkLogin(String username, String password) {
        // Tìm người dùng theo username
        Users users = userRepository.findByUsername(username);

        if (users == null) {
            System.out.println("User not found");
            return false;
        }

        System.out.println("Input password: " + password);
        System.out.println("Stored password: " + users.getPassword());

        if (users.getPassword().equals(password)) {
            System.out.println("Login successful");
            return true;
        } else {
            System.out.println("Invalid password");
            return false;
        }
    }




    @Override
    public boolean addUser(RegisterRequest registerRequest) {
        Roles roles = new Roles();
        roles.setId(registerRequest.getRole_id());
        Users users = new Users();
        users.setUsername(registerRequest.getUsername());
        users.setUser_email(registerRequest.getEmail());
        users.setPassword(registerRequest.getPassword());
        users.setRole(roles);
        try {
            userRepository.save(users);
            return true;
        } catch (Exception e) {
            return false;
        }
    }
}
