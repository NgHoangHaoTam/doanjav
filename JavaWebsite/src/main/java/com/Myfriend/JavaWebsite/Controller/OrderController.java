package com.Myfriend.JavaWebsite.Controller;


import com.Myfriend.JavaWebsite.Entity.Order;
import com.Myfriend.JavaWebsite.Exception.ResourceNotFoundException;
import com.Myfriend.JavaWebsite.Service.Imp.OrderServiceImp;
import com.Myfriend.JavaWebsite.Service.OrderService;
import com.Myfriend.JavaWebsite.dto.OrderDTO;
import com.Myfriend.JavaWebsite.dto.OrderItemDTO;
import com.Myfriend.JavaWebsite.payload.ReponseData;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.ResourceAccessException;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/order")
public class OrderController {

    @Autowired
    private OrderService orderService;
    @Autowired
    private OrderServiceImp orderServiceImp;


    @PostMapping("/create")
    public ResponseEntity<?> createOrder(@RequestParam Integer userId) {
        ReponseData responseData = new ReponseData();
        try {
            Order order = orderService.placeOrder(userId);
            responseData.setData(order); // Thêm dữ liệu nếu cần
            return new ResponseEntity<>(responseData, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace(); // In lỗi ra log để dễ dàng theo dõi
            return new ResponseEntity<>(responseData, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("")
    public ResponseEntity<?> getAllOrders(){
        ReponseData responseData = new ReponseData();
        responseData.setData(orderService.getAllOrders());
        return new ResponseEntity<>(responseData, HttpStatus.OK);
    }

    @GetMapping("/{orderId}/getOrder")
    public ResponseEntity<?> getOrderById(@PathVariable Integer orderId){
        ReponseData responseData = new ReponseData();
        try{
            OrderDTO order = orderService.getOrder(orderId);
            responseData.setData(order);
            return new ResponseEntity<>(responseData, HttpStatus.OK);
        } catch (ResourceNotFoundException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }



    @GetMapping("/{orderId}/Items")
    public ResponseEntity<?> getUserOrders(@PathVariable Integer orderId){
        ReponseData responseData = new ReponseData();
        try{
            List<OrderItemDTO> order = orderService.getUserOrders(orderId);
            responseData.setData(order);
            return new ResponseEntity<>(responseData, HttpStatus.OK);
        } catch (ResourceNotFoundException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }




}