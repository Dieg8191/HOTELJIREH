package com.hotel.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.hotel.demo.model.Usuario;
import com.hotel.demo.repository.UsuarioRepository;

@Service
public class UsuarioServicio {
    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    UsuarioRepository usuarioRepository;

    public Usuario registrarUsuario(Usuario usuario) {
        String password = passwordEncoder.encode(usuario.getPassword());
        usuario.setPassword(password);

        return usuarioRepository.save(usuario);
    }

    

}
