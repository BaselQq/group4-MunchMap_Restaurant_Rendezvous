package org.example.backend.controller;

import lombok.RequiredArgsConstructor;
import org.example.backend.dto.DetailImagesUrls;
import org.example.backend.dto.Favourite;
import org.example.backend.dto.HeroImage;
import org.example.backend.dto.RestaurantRecord;
import org.example.backend.modul.Restaurant;
import org.example.backend.repository.RestaurantRepository;
import org.example.backend.service.RestaurantService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequiredArgsConstructor
public class RestaurantController {

    private final RestaurantService restaurantService;
    private final RestaurantRepository repo;

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

    @GetMapping("/api/favourite/restaurants")
    public List<Restaurant> getAllFavourit () {

        return restaurantService.getAllFavourit();
    }

    @PutMapping("/api/updaterestaurantname/{id}/{name}")
    void updateRestaurantByName(@PathVariable String id, @PathVariable String name) {
        Restaurant restaurant = repo.findById(id).orElse(null);

        repo.save(restaurant.withName(name));
    }

    @PutMapping("/api/updaterestaurantdescription/{id}/{description}")
    void updateRestaurantByDescription(@PathVariable String id, @PathVariable String description) {
        Restaurant restaurant = repo.findById(id).orElse(null);

        repo.save(restaurant.withDescription(description));
    }

    @PutMapping(path = {"/api/updaterestaurantfavourite/{id}", "{favourite}"})
    void updateRestaurantByFavourite(@PathVariable String id, @RequestBody Favourite favourite) {
        Restaurant restaurant = repo.findById(id).orElse(null);

        repo.save(restaurant.withFavourite(favourite.isFavourite()));
    }

    @PutMapping("/api/updaterestaurantrating/{id}/{rating}")
    void updateRestaurantByDescription(@PathVariable String id, @PathVariable int rating) {
        Restaurant restaurant = repo.findById(id).orElse(null);

        repo.save(restaurant.withRating(rating));
    }

    @PutMapping("/api/updaterestauranttype/{id}/{type}")
    void updateRestaurantByType(@PathVariable String id, @PathVariable String type) {
        Restaurant restaurant = repo.findById(id).orElse(null);

        repo.save(restaurant.withType(type));
    }

    @PutMapping("/api/updaterestaurantlocation/{id}/{location}")
    void updateRestaurantByLocation(@PathVariable String id, @PathVariable String location) {
        Restaurant restaurant = repo.findById(id).orElse(null);

        repo.save(restaurant.withLocation(location));
    }

    @PutMapping({"/api/updaterestaurantheroimage/{id}", "{heroImage}"})
    void updateRestaurantByHeroImage(@PathVariable String id, @RequestBody HeroImage heroImage) {
        Restaurant restaurant = repo.findById(id).orElse(null);

        repo.save(restaurant.withHeroImage(heroImage.heroImage()));
    }

    @PutMapping({"/api/updaterestaurantdetailimageurls/{id}", "{detailImageUrls}"})
    void updateRestaurantByDetailImageUrls(@PathVariable String id, @RequestBody DetailImagesUrls detailImageUrls) {
        Restaurant restaurant = repo.findById(id).orElse(null);

        repo.save(restaurant.withDetailImagesUrls(detailImageUrls.detailImageUrls()));
    }

    @DeleteMapping("/api/removerestaurant/{id}")
    public void removeRestaurantById(@PathVariable String id) {
        Restaurant restaurant = repo.findById(id).orElse(null);

        repo.delete(restaurant);
    }

    @PostMapping("/api/newrestaurant")
    public void createNewRestaurant(@RequestBody RestaurantRecord newRestaurant) {
        restaurantService.createNewRestaurant(newRestaurant);
    }
}
