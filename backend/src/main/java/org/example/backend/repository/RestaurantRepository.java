package org.example.backend.repository;


import org.example.backend.modul.Restaurant;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;


@Repository
public interface RestaurantRepository extends MongoRepository<Restaurant,String> {

    List<Restaurant> findAll ();
    Optional<Restaurant> findById (String id);
    List<Restaurant> findByType (String type);
    List<Restaurant> findAllByFavouriteIsTrue ();

}
