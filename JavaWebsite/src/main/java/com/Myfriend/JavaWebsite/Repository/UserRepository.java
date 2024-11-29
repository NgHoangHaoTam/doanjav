package com.Myfriend.JavaWebsite.Repository;

import com.Myfriend.JavaWebsite.Entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<Users, Integer> {

/*
*
*select * users  where username = '' and password = ''
*
* */


    Users findByUsername(String username);
}
