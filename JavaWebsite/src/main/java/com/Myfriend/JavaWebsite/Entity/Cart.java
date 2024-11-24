package com.Myfriend.JavaWebsite.Entity;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.sql.Timestamp;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "cart")
public class Cart {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "total_amount", nullable = false)
    private BigDecimal totalAmount = BigDecimal.ZERO;

    @Column(name = "created_at", updatable = false, nullable = false)
    private Timestamp createdAt;

    @Column(name = "status", length = 50, nullable = false)
    private String status = "active";

    @OneToMany(mappedBy = "cart", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<CartItem> cartItems = new HashSet<>(); // Khởi tạo mặc định để tránh lỗi null

    // Phương thức tự động gán giá trị cho createdAt trước khi lưu
    @PrePersist
    protected void onCreate() {
        this.createdAt = new Timestamp(System.currentTimeMillis());
    }

    // Phương thức thêm item vào giỏ hàng
    public void addItem(CartItem item) {
        this.cartItems.add(item);
        item.setCart(this); // Gắn quan hệ 2 chiều
        updateTotalAmount();
    }

    // Phương thức xóa item khỏi giỏ hàng
    public void removeItem(CartItem item) {
        this.cartItems.remove(item);
        item.setCart(null); // Hủy quan hệ 2 chiều
        updateTotalAmount();
    }

    // Phương thức cập nhật tổng tiền giỏ hàng
    private void updateTotalAmount() {
        this.totalAmount = cartItems.stream()
                .map(cartItem -> {
                    BigDecimal itemPrice = cartItem.getPrice();
                    return (itemPrice != null) ? itemPrice.multiply(new BigDecimal(cartItem.getQuantity())) : BigDecimal.ZERO;
                })
                .reduce(BigDecimal.ZERO, BigDecimal::add);
    }

    // Getters và Setters
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public BigDecimal getTotalAmount() {
        return totalAmount;
    }

    public void setTotalAmount(BigDecimal totalAmount) {
        this.totalAmount = totalAmount;
    }

    public Timestamp getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Timestamp createdAt) {
        this.createdAt = createdAt;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Set<CartItem> getCartItems() {
        return cartItems;
    }

    public void setCartItems(Set<CartItem> cartItems) {
        this.cartItems = cartItems;
    }
}
