package org.example.backend;


import org.example.backend.model.ImageObject;
import org.example.backend.model.Restaurant;
import org.example.backend.repository.RestaurantRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;

@SpringBootTest

@AutoConfigureMockMvc
 class BackendApplicationIntegrationTests {

    @Autowired
    private MockMvc mvc;

    @Autowired
    private RestaurantRepository restaurantRepository;



    @DirtiesContext
    @Test
    void getAllRestaurants_ShouldReturnEmptyList_WhenCalledInitially () throws Exception {

    mvc.perform(MockMvcRequestBuilders.get("/api/restaurants"))
            .andExpect(MockMvcResultMatchers.status().isOk())
            .andExpect(MockMvcResultMatchers.content().json("[]"));
}

    @DirtiesContext
    @Test
    void getAllRestaurants_shouldReturnOneRestaurant () throws Exception {


        ImageObject[] listImg = {new ImageObject("1","testName","testHeroUrl","testURL")};
        Restaurant restaurant1 = new Restaurant("10", "restaurant1", "the most beautiful restaurant ever", true, 10,"italian","street blabla", listImg);
        restaurantRepository.save(restaurant1);

        mvc.perform(MockMvcRequestBuilders.get("/api/restaurants"))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().json(
                        """
                                [
                                                              {
                                  "name": "restaurant1",
                                  "description": "the most beautiful restaurant ever",
                                  "favourite": true,
                                  "rating": 10,
                                  "type": "italian",
                                  "location": "street blabla",
                                  "image": [
                                  {
                                      "id": "1",
                                      "name": "testName",
                                      "heroImageUrl": "testHeroUrl",
                                      "detailImageUrl": "testURL"
                                  }
                                  ]
                                                              }
                                ]
                                """
                ));
    }


    @DirtiesContext

    @Test
    void getRestaurantById_shouldReturnRestaurantById10_whenCallById10 () throws Exception {

        ImageObject[] listImg = {new ImageObject("1","testName","testHeroUrl","testURL")};
        Restaurant restaurant1 = new Restaurant("10", "restaurant1", "the most beautiful restaurant ever", true, 10,"italian","street blabla", listImg);
        restaurantRepository.save(restaurant1);



        mvc.perform(MockMvcRequestBuilders.get("/api/restaurant/10"))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().json(
                        """
                                
                                                              {
                                  "name": "restaurant1",
                                  "description": "the most beautiful restaurant ever",
                                  "favourite": true,
                                  "rating": 10,
                                  "type": "italian",
                                  "location": "street blabla",
                                  "image": [
                                  {
                                      "id": "1",
                                      "name": "testName",
                                      "heroImageUrl": "testHeroUrl",
                                      "detailImageUrl": "testURL"
                                  }
                                  ]
                                                              }
                                
                                """
                ));
    }


    @DirtiesContext

    @Test
    void getRestaurantById_shouldReturnNull_whenIdDontExist () throws Exception {


        mvc.perform(MockMvcRequestBuilders.get("/api/restaurant/100"))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(jsonPath("$").doesNotExist());
    }


    @DirtiesContext

    @Test
    void getAllRestaurantsByType_shouldReturnTheCorrectRestaurant_whenIsCallByItalian () throws Exception {

        ImageObject[] listImg = {new ImageObject("1","testName","testHeroUrl","testURL")};
        Restaurant restaurant1 = new Restaurant("10", "restaurant1", "the most beautiful restaurant ever", true, 10,"italian","street blabla", listImg);
        Restaurant restaurant2 = new Restaurant("100", "restaurant1", "the most beautiful restaurant ever", false, 10,"german","street blabla", listImg);

        restaurantRepository.save(restaurant1);
        restaurantRepository.save(restaurant2);


        mvc.perform(MockMvcRequestBuilders.get("/api/restaurants/italian"))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().json("""
                     [
                          {
                                  "name": "restaurant1",
                                  "description": "the most beautiful restaurant ever",
                                  "favourite": true,
                                  "rating": 10,
                                  "type": "italian",
                                  "location": "street blabla",
                                  "image": [
                                  {
                                      "id": "1",
                                      "name": "testName",
                                      "heroImageUrl": "testHeroUrl",
                                      "detailImageUrl": "testURL"
                                  }
                                  ]
                          }
                     ]
                                
             """));
    }


    @DirtiesContext

    @Test
    void getAllRestaurantByFavouriteIsTrue_shouldReturnTheCorrectRestaurant () throws Exception {

        ImageObject[] listImg = {new ImageObject("1","testName","testHeroUrl","testURL")};
        Restaurant restaurant1 = new Restaurant("10", "restaurant1", "the most beautiful restaurant ever", true, 10,"italian","street blabla", listImg);
        Restaurant restaurant2 = new Restaurant("100", "restaurant1", "the most beautiful restaurant ever", false, 10,"german","street blabla", listImg);

        restaurantRepository.save(restaurant1);
        restaurantRepository.save(restaurant2);

        mvc.perform(MockMvcRequestBuilders.get("/api/favourit/restaurants"))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().json("""
             [
                                                              {
                                  "name": "restaurant1",
                                  "description": "the most beautiful restaurant ever",
                                  "favourite": true,
                                  "rating": 10,
                                  "type": "italian",
                                  "location": "street blabla",
                                  "image": [
                                  {
                                      "id": "1",
                                      "name": "testName",
                                      "heroImageUrl": "testHeroUrl",
                                      "detailImageUrl": "testURL"
                                  }
                                  ]
                                                              }
                                                              ]
                          """));



    }



    @DirtiesContext

    @Test
    void createNewRestaurant_shouldReturnStatusIsOk_WhenCalledWithValidData () throws Exception {
        //GIVEN
        //WHEN & THEN
        mvc.perform(MockMvcRequestBuilders.post("/api/newrestaurant")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {
                                    "name": "restaurant1",
                                    "description": "this is a description example for restaurant 1",
                                    "favourite": true,
                                    "rating": 1,
                                    "type": "indisch",
                                    "location": "blaStraße 1, 47182 Leipzig",
                                    "image": [
                                    {
                                        "id": "1",
                                        "name": "image1",
                                        "heroImageUrl": "https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg",
                                        "detailImageUrl": "https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg"
                                    },
                                    {
                                        "id": "1",
                                        "name": "image1",
                                        "heroImageUrl": "https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg",
                                        "detailImageUrl": "https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg"
                                    }
                                    ]
                                }
                                """))
                .andExpect(MockMvcResultMatchers.status().isOk());

    }

}
