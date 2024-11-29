package com.Myfriend.JavaWebsite.Service;

import com.Myfriend.JavaWebsite.Entity.*;
import com.Myfriend.JavaWebsite.Enums.OrderStatus;
import com.Myfriend.JavaWebsite.Exception.ResourceNotFoundException;
import com.Myfriend.JavaWebsite.Repository.OrderItemRepository;
import com.Myfriend.JavaWebsite.Repository.OrderRepository;
import com.Myfriend.JavaWebsite.Repository.ProductRepository;
import com.Myfriend.JavaWebsite.Service.Imp.OrderServiceImp;
import com.Myfriend.JavaWebsite.dto.OrderDTO;
import com.Myfriend.JavaWebsite.dto.OrderItemDTO;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;

@Service
public class OrderService implements OrderServiceImp {

    @Autowired
    private OrderItemRepository orderItemRepository;
    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private CartService cartService;

    @Autowired
    private ModelMapper modelMapper;



    @Override
    public Order placeOrder(Integer user_id) {
        Cart cart = cartService.getCartById(user_id);

        Order order = createOrder(cart);

        List<OrderItem> orderItemList = createOrderItems(order, cart);

        order.setOrderItems(new HashSet<>(orderItemList));
        order.setTotalAmount(calculateTotalAmount(orderItemList));
        Order orderSaved = orderRepository.save(order);
        cartService.ClearCartById(cart.getId());

        return orderSaved;
    }

    private Order createOrder(Cart cart) {
        Order order = new Order();
        order.setUser(cart.getUser());
        order.setStatus(OrderStatus.PENDING);
        order.setOrderDate(LocalDate.now());

        return order;
    }

    private List<OrderItem> createOrderItems(Order order, Cart cart) {
        List<OrderItem> orderItems = new ArrayList<>();
        for (CartItem cartItem : cart.getCartItems()) {
            Products product = cartItem.getProduct();
            // Validate inventory
            if (product.getInventory() < cartItem.getQuantity()) {
                throw new IllegalArgumentException("Insufficient inventory for product: " + product.getProduct_name());
            }
            // Update inventory
            product.setInventory(product.getInventory() - cartItem.getQuantity());
            productRepository.save(product); // Consider wrapping in a transaction for safety
            // Create OrderItem
            OrderItem orderItem = new OrderItem(order,cartItem.getUnit_price() , product, cartItem.getQuantity() );
            orderItems.add(orderItem);
        }

        return orderItems;
    }


    private BigDecimal calculateTotalAmount(List<OrderItem> orderItemList) {
        return orderItemList.stream().map(item -> item.getPrice()
                        .multiply(new BigDecimal(item.getQuantity())))
                .reduce(BigDecimal.ZERO, BigDecimal::add);

    }

    @Override
    public OrderDTO getOrder(Integer order_id) {
        return orderRepository.findById(order_id).map(this :: convertToDTO).orElseThrow(() -> new ResourceNotFoundException("No order found "));
    }




    @Override
    public List<OrderDTO> getAllOrders() {
        // Lấy tất cả đơn hàng từ cơ sở dữ liệu
        List<Order> orderList = orderRepository.findAll();

        // Khởi tạo danh sách OrderDTO
        List<OrderDTO> orderDTOS = new ArrayList<>();

        // Duyệt qua từng đơn hàng trong orderList và chuyển đổi sang OrderDTO
        for (Order order : orderList) {
            OrderDTO orderDTO = new OrderDTO();
            orderDTO.setOrderId(order.getId());
            orderDTO.setOrderTime(order.getOrderDate());
            orderDTO.setTotalAmount(order.getTotalAmount());
            orderDTO.setStatus(order.getStatus());
            orderDTO.setUserId(order.getUser().getId());
            orderDTOS.add(orderDTO);
        }

        // Trả về danh sách OrderDTO
        return orderDTOS;
    }

    @Override
    public List<OrderItemDTO> getUserOrders(Integer orderId) {
        // Fetch orders based on userId (assuming you mean to get all orders for the user)
        List<Order> orders = orderRepository.findByUserId(orderId);
        List<OrderItemDTO> orderItemDTOs = new ArrayList<>();

        // Loop through each order and extract the associated order items
        for (Order order : orders) {
            // Fetch order items associated with each order
            List<OrderItem> orderItems = orderItemRepository.findByOrderId(order.getId());

            // Convert each order item to OrderItemDTO
            for (OrderItem orderItem : orderItems) {
                OrderItemDTO orderItemDTO = new OrderItemDTO();
                orderItemDTO.setOrderItemId(orderItem.getOrder().getId());
                orderItemDTO.setProductId(orderItem.getProduct().getId());
                orderItemDTO.setQuantity(orderItem.getQuantity());
                orderItemDTO.setPrice(orderItem.getPrice());

                // Add the orderItemDTO to the result list
                orderItemDTOs.add(orderItemDTO);
            }
        }

        // Return the list of OrderItemDTO objects
        return orderItemDTOs;
    }


    private OrderDTO convertToDTO(Order order) {
        return modelMapper.map(order, OrderDTO.class);
    }


    }