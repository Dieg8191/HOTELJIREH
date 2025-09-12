package com.hotel.demo.service;

import com.hotel.demo.model.CartItem;
import com.hotel.demo.repository.CartItemRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CartItemService {

    private final CartItemRepository cartItemRepository;

    // Inyección de dependencias por constructor
    public CartItemService(CartItemRepository cartItemRepository) {
        this.cartItemRepository = cartItemRepository;
    }

    // Obtener todos los items
    public List<CartItem> getAllCartItems() {
        return cartItemRepository.findAll();
    }

    // Obtener items por cliente
    public Optional<CartItem> getCartItemsByCliente(Long clienteId) {
        return cartItemRepository.findById(clienteId);
    }

    // Buscar item por id
    public Optional<CartItem> getCartItemById(Long id) {
        return cartItemRepository.findById(id);
    }

    // Agregar o actualizar un item
    public CartItem saveCartItem(CartItem cartItem) {
        return cartItemRepository.save(cartItem);
    }

    // Eliminar item por id
    public void deleteCartItem(Long id) {
        cartItemRepository.deleteById(id);
    }

    // Vaciar carrito de un cliente
    public void clearCartByCliente(Long clienteId) {
        List<CartItem> items = cartItemRepository.findClientesById(clienteId);
        cartItemRepository.deleteAll(items);
    }
}
