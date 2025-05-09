package com.hotel.demo.controller;

import org.springframework.web.bind.annotation.RestController;

import com.hotel.demo.model.habitacion;
import com.hotel.demo.service.habitacionservice;

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
public class habitacioncontroller {

    @Autowired
    private habitacionservice habitacionService;

    @GetMapping
    public List<habitacion> listarHabitaciones() {
        return habitacionService.obtenerTodasLasHabitaciones();
    }

    @GetMapping("/{id}")
    public habitacion obtenerHabitacion(@PathVariable Long id) {
        return habitacionService.obtenerHabitacionPorId(id);
    }

    @PostMapping
    public habitacion crearHabitacion(@RequestBody habitacion habitacion) {
        return habitacionService.crearHabitacion(habitacion);
    }

    @PutMapping("/{id}")
    public habitacion actualizarHabitacion(@PathVariable Long id, @RequestBody habitacion habitacion) {
        return habitacionService.actualizarHabitacion(id, habitacion);
    }

    @DeleteMapping("/{id}")
    public void eliminarHabitacion(@PathVariable Long id) {
        habitacionService.eliminarHabitacion(id);
    }

}

