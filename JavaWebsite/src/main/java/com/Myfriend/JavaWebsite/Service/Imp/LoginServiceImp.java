package com.Myfriend.JavaWebsite.Service.Imp;

import com.Myfriend.JavaWebsite.Entity.Users;
import com.Myfriend.JavaWebsite.dto.UserDTO;
import com.Myfriend.JavaWebsite.payload.Request.RegisterRequest;

import java.util.List;

public interface LoginServiceImp {

    List<UserDTO> getAllUser();

    public Users checkLogin(String username, String password);

    //    boolean addUser(RegisterRequest registerRequest);
    public boolean registerUser(RegisterRequest registerRequest);


    Users checkAdminLogin(String username, String password);
}