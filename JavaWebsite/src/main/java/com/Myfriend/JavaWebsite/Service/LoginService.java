package com.Myfriend.JavaWebsite.Service;

import com.Myfriend.JavaWebsite.Entity.Roles;
import com.Myfriend.JavaWebsite.Entity.Users;
import com.Myfriend.JavaWebsite.Repository.UserRepository;
import com.Myfriend.JavaWebsite.Service.Imp.LoginServiceImp;
import com.Myfriend.JavaWebsite.dto.UserDTO;
import com.Myfriend.JavaWebsite.payload.Request.RegisterRequest;
import com.Myfriend.JavaWebsite.utils.JwtUtilHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class LoginService implements LoginServiceImp {
    @Autowired
    JwtUtilHelper jwtUtilHelper;


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
    public Users checkLogin(String username, String password) {
        // Tìm người dùng theo username
        Users user = userRepository.findByUsername(username);

        if (user == null) {
            System.out.println("User not found");
            return null;
        }
        System.out.println("Input password: " + password);
        System.out.println("Stored password: " + user.getPassword());

        // Kiểm tra mật khẩu
        if (user.getPassword().equals(password)) {
            System.out.println("Login successful");
            return user; // Trả về đối tượng Users nếu thông tin hợp lệ
        } else {
            System.out.println("Invalid password");
            return null; // Trả về null nếu mật khẩu không đúng
        }

    }

    @Override
    public boolean registerUser(RegisterRequest registerRequest) {
        if (userRepository.findByUsername(registerRequest.getUsername()) != null) {
            System.out.println("User already exists");
            return false; // Người dùng đã tồn tại
        }
        // Tạo đối tượng Users mới
        Users users = new Users();
        users.setUsername(registerRequest.getUsername());
        users.setUser_email(registerRequest.getEmail());

        users.setPassword(registerRequest.getPassword());

        // Gán vai trò cho người dùng
        Roles roles = new Roles();
        roles.setId(registerRequest.getRole_id());
        users.setRole(roles);

        try {
            System.out.println("Inserting user");
            userRepository.save(users); // Lưu người dùng vào cơ sở dữ liệu
            System.out.println("Inserted successfully");

            // Tạo JWT Token sau khi người dùng đăng ký thành công
            String token = jwtUtilHelper.generateToken(users.getUsername());
            System.out.println("JWT Token: " + token);

            // Bạn có thể trả về token này như là một phần của phản hồi nếu muốn
            // Trong trường hợp này, chúng ta chỉ in ra token
            return true; // Đăng ký thành công
        } catch (Exception e) {
            e.printStackTrace(); // In lỗi ra console để kiểm tra
            return false; // Đăng ký thất bại
        }
    }

    @Override
    public Users checkAdminLogin(String username, String password) {
        Users user = checkLogin(username, password);
        if (user != null && user.getRole().getRole_name().equalsIgnoreCase("ROLE_ADMIN")) {
            return user; // Trả về user nếu là admin
        }
        System.out.println("User is not an admin");
        return null; // Trả về null nếu không phải admin
    }
}
