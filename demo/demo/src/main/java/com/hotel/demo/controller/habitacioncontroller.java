package com.hotel.demo.controller;

import org.springframework.web.bind.annotation.RestController;

import com.hotel.demo.model.Habitacion;
import com.hotel.demo.service.HabitacionService;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;


@RestController
@RequestMapping("/api/habitaciones")
public class HabitacionController {

    @Autowired
    private HabitacionService habitacionService;

    @GetMapping
    public List<Habitacion> listarHabitaciones() {
        return habitacionService.obtenerTodasLasHabitaciones();
    }

    @GetMapping("/{id}")
    public Habitacion obtenerHabitacion(@PathVariable Long id) {
        return habitacionService.obtenerHabitacionPorId(id);
    }

    @PostMapping
    public Habitacion crearHabitacion(@RequestBody Habitacion habitacion) {
        return habitacionService.crearHabitacion(habitacion);
    }

    @PutMapping("/{id}")
    public Habitacion actualizarHabitacion(@PathVariable Long id, @RequestBody Habitacion habitacion) {
        return habitacionService.actualizarHabitacion(id, habitacion);
    }

    @DeleteMapping("/{id}")
    public void eliminarHabitacion(@PathVariable Long id) {
        habitacionService.eliminarHabitacion(id);
    }

}

