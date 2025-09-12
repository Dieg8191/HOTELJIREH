package com.hotel.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hotel.demo.model.Cliente;

public interface clienterepository extends JpaRepository<Cliente, Long> {
}

