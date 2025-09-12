package com.hotel.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.hotel.demo.model.Reservacion;
import com.hotel.demo.service.reservasrvice;

@RestController
@RequestMapping("/api/reservas")
public class reservacontroller {

    @Autowired
    private reservasrvice reservaService;

    @GetMapping
    public List<Reservacion> listarReservas() {
        return reservaService.obtenerTodas();
    }

    @GetMapping("/{id}")
    public Reservacion obtenerReserva(@PathVariable Long id) {
        return reservaService.obtenerPorId(id);
    }

    @PostMapping
    public Reservacion crearReserva(@RequestBody Reservacion reserva) {
        return reservaService.crearReserva(reserva);
    }

    @PutMapping("/{id}")
    public Reservacion actualizarReserva(@PathVariable Long id, @RequestBody Reservacion reserva) {
        return reservaService.actualizarReserva(id, reserva);
    }

    @DeleteMapping("/{id}")
    public void eliminarReserva(@PathVariable Long id) {
        reservaService.eliminarReserva(id);
    }

    @GetMapping("/habitacion/{id}/tiene-reservas")
    public boolean verificarReservasPorHabitacion(@PathVariable Long id) {
        return reservaService.tieneReservasPorHabitacion(id);
    }

}
