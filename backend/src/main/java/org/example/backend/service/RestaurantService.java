package org.example.backend.service;

import lombok.RequiredArgsConstructor;
import org.example.backend.dto.RestaurantRecord;
import org.example.backend.model.Restaurant;
import org.example.backend.repository.RestaurantRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

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

    public List<Restaurant> getAllFavourite() {
        return restaurantRepository.findAllByFavouriteIsTrue();
    }

    public Restaurant createNewRestaurant(RestaurantRecord newRestaurant) {
        Restaurant restaurant = new Restaurant(
                UUID.randomUUID().toString(),
                newRestaurant.name(),
                newRestaurant.description(),
                newRestaurant.favourite(),
                newRestaurant.rating(),
                newRestaurant.type(),
                newRestaurant.location(),
                newRestaurant.image()
        );

        restaurantRepository.save(restaurant);
        return restaurant;
    }
}
