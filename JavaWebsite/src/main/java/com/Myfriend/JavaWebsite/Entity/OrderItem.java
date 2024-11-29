package com.Myfriend.JavaWebsite.Entity;

import jakarta.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name = "order_items") // Explicitly map to table `order_items`
public class OrderItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(nullable = false)
    private int quantity;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal price;

    @ManyToOne(fetch = FetchType.LAZY) // Use lazy loading for better performance
    @JoinColumn(name = "order_id", nullable = false) // Explicit mapping
    private Order order;

    @ManyToOne(fetch = FetchType.LAZY) // Lazy loading for products
    @JoinColumn(name = "product_id", nullable = false) // Explicit mapping
    private Products product;

    // Default constructor required by JPA
    public OrderItem() {
    }

    // Constructor for easy instantiation
    public OrderItem(Order order, BigDecimal price, Products product, int quantity) {
        this.order = order;
        this.price = price;
        this.product = product;
        this.quantity = quantity;
    }

    // Getters and Setters
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public Order getOrder() {
        return order;
    }

    public void setOrder(Order order) {
        this.order = order;
    }

    public Products getProduct() {
        return product;
    }

    public void setProduct(Products product) {
        this.product = product;
    }

    @Override
    public String toString() {
        return "OrderItem{" +
                "id=" + id +
                ", quantity=" + quantity +
                ", price=" + price +
                '}';
    }
}
