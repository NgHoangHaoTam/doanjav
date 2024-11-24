package com.Myfriend.JavaWebsite.Entity;

import jakarta.persistence.*;

@Entity(name = "user_detail")
public class User_detail {
    @Id
    @Column(name = "user_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int userId;

    @OneToOne
    @JoinColumn(name = "user_id")
    private Users user;

    @Column(name = "gender", length = 3)
    private String gender;

    @Column(name = "address", length = 1000)
    private String address;

    @Column(name = "id_card", length = 12)
    private String idCard;

    // Getters and Setters
    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public Users getUser() {
        return user;
    }

    public void setUser(Users user) {
        this.user = user;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getIdCard() {
        return idCard;
    }

    public void setIdCard(String idCard) {
        this.idCard = idCard;
    }
}
