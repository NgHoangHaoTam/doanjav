package com.Myfriend.JavaWebsite.Service.Imp;

import com.Myfriend.JavaWebsite.Entity.Order;
import com.Myfriend.JavaWebsite.dto.OrderDTO;
import com.Myfriend.JavaWebsite.dto.OrderItemDTO;

import java.util.List;

public interface OrderServiceImp {
    Order placeOrder(Integer user_id);
    OrderDTO getOrder(Integer order_id);

    List<OrderDTO> getAllOrders();

    public List<OrderItemDTO> getUserOrders(Integer orderId);
}