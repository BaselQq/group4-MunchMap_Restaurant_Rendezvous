package org.example.backend.service;

import lombok.RequiredArgsConstructor;
import org.example.backend.modul.Restaurant;
import org.example.backend.repository.RestaurantRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class RestaurantService {
    private  final RestaurantRepository restaurantRepository;

    public List<Restaurant> getAll () {
        return restaurantRepository.findAll();
    }

    public Restaurant getById (String id) {
        return restaurantRepository.findById(id).orElse(null);
    }

    public List<Restaurant> getAllByType (String type) {
        return restaurantRepository.findByType( type);
    }

    public List<Restaurant> getAllFavourit () {
        return restaurantRepository.findAllByFavouriteIsTrue();
    }



}
