package com.Myfriend.JavaWebsite.Service;

import com.Myfriend.JavaWebsite.Entity.Cart;
import com.Myfriend.JavaWebsite.Entity.CartItem;
import com.Myfriend.JavaWebsite.Entity.Products;
import com.Myfriend.JavaWebsite.Exception.ResourceNotFoundException;
import com.Myfriend.JavaWebsite.Repository.CartItemRepository;
import com.Myfriend.JavaWebsite.Repository.CartRepository;
import com.Myfriend.JavaWebsite.Service.Imp.CartItemServiceImp;
import com.Myfriend.JavaWebsite.dto.CartItemDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@Service
public class CartItemService implements CartItemServiceImp {

    @Autowired
    private CartItemRepository cartItemRepository;

    @Autowired
    private ProductService productService;

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private CartService cartService;


    @Override
    public void addItemToCart(int cart_id, int product_id, int quantity) {
        Cart cart = cartService.getCartById(cart_id);
        Products products = productService.getProductById(product_id);
        CartItem cartItem = cart.getCartItems()
                .stream()
                .filter(item -> item.getProduct().getId() == product_id)
                .findFirst().orElse(new CartItem());

                if(cartItem.getId() == null){
                    cartItem.setCart(cart);
                    cartItem.setProduct(products);
                    cartItem.setQuantity(quantity);
                    cartItem.setUnit_price(BigDecimal.valueOf(products.getPrice()));
                }else {
                    cartItem.setQuantity(cartItem.getQuantity() + quantity);
                }
                cartItem.setPrice();
                cart.addItem(cartItem);
                cartItemRepository.save(cartItem);
                cartRepository.save(cart);

    }

    @Override
    public void removeItemToCart(int cart_id, int product_id) {
        Cart cart = cartService.getCartById(cart_id);
        CartItem itemToRemove = getCartItem(cart_id, product_id);

        cart.removeItem(itemToRemove);

        cartRepository.save(cart);

    }

    @Override
    public void updateItemQuantity(int cart_id, int product_id, int quantity) {
        // Retrieve the cart by ID
        Cart cart = cartService.getCartById(cart_id);

        // Find the cart item by productId and update its quantity
        cart.getCartItems().stream()
                .filter(item -> item.getProduct().getId() == product_id)
                .findFirst()
                .ifPresent(item -> {
                    item.setQuantity(quantity);
                    item.setUnit_price(BigDecimal.valueOf(item.getProduct().getPrice()));
                    item.setPrice();
                });
        BigDecimal totalAmount = cart.getTotalAmount();
        cart.setTotalAmount(totalAmount);
        cartRepository.save(cart);
    }


    @Override
    public CartItem getCartItem(int cart_id, int product_id) {
        Cart cart = cartService.getCartById(cart_id);

        return cart.getCartItems()
                .stream().filter(item ->
                        item.getProduct().getId() == product_id)
                .findFirst().orElseThrow(()-> new ResourceNotFoundException("item not found"));
    }
    @Override
    public List<CartItemDTO> getAllCartItems() {
        // Lấy danh sách tất cả các CartItem từ repository (giả sử bạn có CartItemRepository)
        List<CartItem> cartItemList = cartItemRepository.findAll();
        List<CartItemDTO> cartItemDTOList = new ArrayList<>();

        // Duyệt qua từng CartItem và chuyển đổi thành CartItemDTO
        for (CartItem cartItem : cartItemList) {
            CartItemDTO cartItemDTO = new CartItemDTO();

            // Giả sử CartItem có các thuộc tính như id, productId, quantity
            cartItemDTO.setId(cartItem.getId());
            cartItemDTO.setProductId(cartItem.getProductId());
            cartItemDTO.setQuantity(cartItem.getQuantity());
            cartItemDTO.setTotalPrice(cartItem.getTotalPrice());  // Ví dụ nếu có

            cartItemDTOList.add(cartItemDTO);

            // In thông tin giỏ hàng ra console (tuỳ chọn)
            System.out.println("Cart Item ID: " + cartItem.getId() + " Product ID: " + cartItem.getProductId());
        }

        // Trả về danh sách các CartItemDTO
        return cartItemDTOList;
    }

}
