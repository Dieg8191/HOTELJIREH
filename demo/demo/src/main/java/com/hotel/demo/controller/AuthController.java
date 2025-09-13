package com.hotel.demo.controller;

import com.hotel.demo.dto.LoginForm;
import com.hotel.demo.dto.UsuarioForm;
import com.hotel.demo.model.Cliente;
import com.hotel.demo.model.Usuario;
import com.hotel.demo.repository.UsuarioRepository;
import com.hotel.demo.repository.ClienteRepository;
import com.hotel.demo.service.UsuarioServicio;

import java.util.HashMap;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000") // Para permitir conexión desde React
public class AuthController {
    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    private UsuarioRepository usuarioRepository;
    @Autowired
    UsuarioServicio usuarioServicio;
    @Autowired
    ClienteRepository clienterepository;

    @PostMapping("/register")
    public ResponseEntity<Map<String, Object>> register(@RequestBody UsuarioForm form) {
        Usuario usernameExist = usuarioRepository.findByUsername(form.getUsername());

        if (usernameExist != null) {
            return ResponseEntity
            .status(HttpStatus.CONFLICT).body(Map.of("message", "El Usuario \"" + form.getUsername() + "\" ya existe"));
        }

        Usuario usuario = new Usuario(form.getUsername(), form.getPassword());
        usuarioServicio.registrarUsuario(usuario);

        Cliente cliente = new Cliente(
            form.getNombre(),
            form.getCorreo(),
            form.getDireccion(),
            form.getCelular(),
            usuario
        );
        clienterepository.save(cliente);

        return ResponseEntity.status(HttpStatus.CREATED).body(Map.of("message", "Usuario creado"));
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody LoginForm loginRequest) {
        System.out.println(loginRequest.getPassword() +",gola " + loginRequest.getUsername());

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
