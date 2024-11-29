package com.Myfriend.JavaWebsite.Entity;

import com.Myfriend.JavaWebsite.Enums.OrderStatus;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "orders") // Tên bảng trong database
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "order_date", nullable = false)
    private LocalDate orderDate;

    @Column(name = "total_amount", nullable = false, precision = 10, scale = 2)
    private BigDecimal totalAmount = BigDecimal.ZERO;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", length = 50, nullable = false)
    private OrderStatus status = OrderStatus.PENDING; // Giá trị mặc định

    @JsonIgnore
    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<OrderItem> orderItems = new HashSet<>(); // Khởi tạo để tránh lỗi null

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false) // Tên cột ánh xạ đến `users.id`
    @JsonIgnore
    private Users user;

    // Phương thức thêm item vào đơn hàng
    public void addItem(OrderItem item) {
        this.orderItems.add(item);
        item.setOrder(this); // Gắn quan hệ 2 chiều
        updateTotalAmount();
    }

    // Phương thức xóa item khỏi đơn hàng
    public void removeItem(OrderItem item) {
        this.orderItems.remove(item);
        item.setOrder(null); // Hủy quan hệ 2 chiều
        updateTotalAmount();
    }

    // Phương thức cập nhật tổng tiền đơn hàng
    private void updateTotalAmount() {
        this.totalAmount = orderItems.stream()
                .map(orderItem -> {
                    BigDecimal itemPrice = orderItem.getPrice();
                    return (itemPrice != null) ? itemPrice.multiply(new BigDecimal(orderItem.getQuantity())) : BigDecimal.ZERO;
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

    public LocalDate getOrderDate() {
        return orderDate;
    }

    public void setOrderDate(LocalDate orderDate) {
        this.orderDate = orderDate;
    }

    public BigDecimal getTotalAmount() {
        return totalAmount;
    }

    public void setTotalAmount(BigDecimal totalAmount) {
        this.totalAmount = totalAmount;
    }

    public OrderStatus getStatus() {
        return status;
    }

    public void setStatus(OrderStatus status) {
        this.status = status;
    }

    public Set<OrderItem> getOrderItems() {
        return orderItems;
    }

    public void setOrderItems(Set<OrderItem> orderItems) {
        this.orderItems = orderItems;
    }

    public Users getUser() {
        return user;
    }

    public void setUser(Users user) {
        this.user = user;
    }
}
