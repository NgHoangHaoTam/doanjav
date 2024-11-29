package com.Myfriend.JavaWebsite.utils;

import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.security.Key;

@Component
public class JwtUtilHelper {

    @Value("${jwt.privateKey}")
    private String privateKey;

    public String generateToken(String data) {
        SecretKey key = Keys.hmacShaKeyFor(Decoders.BASE64.decode(privateKey));
        return Jwts.builder().subject(data).signWith(key).compact();
    }

    private Claims extractAllClaims(String token){
        return Jwts.parser()
                .verifyWith(getKey()) // Dynamically supply the key
                .build()
                .parseSignedClaims(token).getPayload();
    }
    public boolean verifyToken(String token) {
        System.out.println("token received" + token);
        SecretKey key = Keys.hmacShaKeyFor(Decoders.BASE64.decode(privateKey));
        System.out.println("key" + key);
        try {

            extractAllClaims(token).getSubject();
            System.out.println("success");
            return true;


        } catch (Exception ex) {
            System.out.println("fail" + ex.getMessage());
            return false;
        }

    }
    private SecretKey getKey(){
        return Keys.hmacShaKeyFor(Decoders.BASE64.decode(privateKey));
    }

}



