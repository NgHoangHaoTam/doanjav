package com.Myfriend.JavaWebsite.Service.Imp;


import com.Myfriend.JavaWebsite.dto.UserDTO;

import java.util.List;

public interface UserServiceImp {
    List<UserDTO> getAllUsers(); // Bỏ tham số UserRepository
}

