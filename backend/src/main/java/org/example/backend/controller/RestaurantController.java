package org.example.backend.controller;

import lombok.RequiredArgsConstructor;
import org.example.backend.modul.Restaurant;
import org.example.backend.service.RestaurantService;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequiredArgsConstructor
public class RestaurantController {


    private final RestaurantService restaurantService;


    @GetMapping("/api/restaurants")
    public List<Restaurant> getAll () {

        return restaurantService.getAll();
    }


    @GetMapping("/api/restaurant/{id}")
    public Restaurant byId (@PathVariable String id) {

        return restaurantService.getById(id);
    }

    @GetMapping("/api/restaurants/{type}")
    public List<Restaurant> getAllByType (@PathVariable String type) {

        return restaurantService.getAllByType(type);
    }

    @GetMapping("/api/favourit/restaurants")
    public List<Restaurant> getAllFavourit () {

        return restaurantService.getAllFavourit();
    }








}
