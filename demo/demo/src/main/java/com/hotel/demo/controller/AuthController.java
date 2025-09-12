package com.hotel.demo.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import com.hotel.demo.model.Usuario;
import com.hotel.demo.repository.UsuarioRepository;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000") // Para permitir conexión desde React
public class AuthController {
    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @PostMapping("/register")
    public String register(@RequestBody Usuario newUser) {
        return "";
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody Usuario loginRequest) {
        Usuario usuario = usuarioRepository.findByUsername(loginRequest.getUsername());
        String inputPassword = loginRequest.getPassword();
        
        if (usuario == null || !passwordEncoder.matches(inputPassword, usuario.getPassword())) {
            return ResponseEntity
            .status(HttpStatus.UNAUTHORIZED).body(Map.of("message", "Credenciales incorrectas"));
        }

        Map<String, Object> response = new HashMap<>();
        response.put("message", "Authorised");
        response.put("usuario", usuario);

        return ResponseEntity.ok(response);
    }
}
