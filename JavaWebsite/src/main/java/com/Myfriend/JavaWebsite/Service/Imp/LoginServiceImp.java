package com.Myfriend.JavaWebsite.Service.Imp;

import com.Myfriend.JavaWebsite.dto.UserDTO;
import com.Myfriend.JavaWebsite.payload.Request.RegisterRequest;

import java.util.List;

public interface LoginServiceImp {

    List<UserDTO> getAllUser();

    boolean checkLogin(String username, String password);

    boolean addUser(RegisterRequest registerRequest);

}

