package com.hotel.demo.controller;

import org.springframework.web.bind.annotation.*;

import com.hotel.demo.model.Servicios;
import com.hotel.demo.service.servicioservice;

import java.util.List;

@RestController
@RequestMapping("/api/servicios")
public class servicioscontroller {

    private final servicioservice servicioService;

    public servicioscontroller(servicioservice servicioService) {
        this.servicioService = servicioService;
    }

    @GetMapping
    public List<Servicios> listarServicios() {
        return servicioService.listarServicios();
    }

    @PostMapping
    public Servicios crearServicio(@RequestBody Servicios servicio) {
        return servicioService.guardarServicio(servicio);
    }

    @GetMapping("/{id}")
    public Servicios obtenerServicio(@PathVariable Long id) {
        return servicioService.obtenerServicioPorId(id)
                .orElseThrow(() -> new RuntimeException("Servicio no encontrado con ID: " + id));
    }

    @DeleteMapping("/{id}")
    public void eliminarServicio(@PathVariable Long id) {
        servicioService.eliminarServicio(id);
    }

    @PutMapping("/{id}")
    public Servicios actualizarServicio(@PathVariable Long id, @RequestBody Servicios servicioActualizado) {
    return servicioService.actualizarServicio(id, servicioActualizado);
}

}
