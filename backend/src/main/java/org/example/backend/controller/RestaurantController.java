package org.example.backend.controller;

import lombok.RequiredArgsConstructor;
import org.example.backend.modul.Restaurant;
import org.example.backend.service.RestaurantService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;


@RestController
@RequiredArgsConstructor
public class RestaurantController {


    private final RestaurantService restaurantService;


    @GetMapping("/api/restaurants")
    public List<Restaurant> todo () {

        return restaurantService.getAll();
    }


    @GetMapping("/api/restaurant/{id}")
    public Restaurant byid (@PathVariable String id) {

        return restaurantService.getById(id);
    }

}
