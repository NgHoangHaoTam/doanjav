package com.Myfriend.JavaWebsite.Service;

import com.Myfriend.JavaWebsite.Entity.Users;
import com.Myfriend.JavaWebsite.Repository.UserRepository;
import com.Myfriend.JavaWebsite.Service.Imp.UserServiceImp;
import com.Myfriend.JavaWebsite.dto.UserDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserService implements UserServiceImp {

    @Autowired
    private UserRepository userRepository;

    @Override
    public List<UserDTO> getAllUsers() {
        // Không cần tham số userRepository nữa
        List<Users> usersList = userRepository.findAll();
        List<UserDTO> userDTOList = new ArrayList<>();
        for (Users user : usersList) {
            UserDTO userDTO = new UserDTO();
            userDTO.setId(user.getId());
            userDTO.setUsername(user.getUsername());
            userDTO.setPassword(user.getPassword());
            userDTO.setRole_id(user.getRole().getId());
            userDTOList.add(userDTO);
            System.out.println(user.getFullname());
        }
        return userDTOList;
    }

    @Override
    public Users findUserById(int id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found with ID: " + id));
    }
    @Override
    public Users removeUserById(int id) {
        Users user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found with ID: " + id));
        userRepository.delete(user);
        return user;
    }
}

