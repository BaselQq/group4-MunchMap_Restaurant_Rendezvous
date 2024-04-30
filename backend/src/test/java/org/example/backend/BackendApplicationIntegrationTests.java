package org.example.backend;


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


        String[] listImg = {"image1","image2"};
        Restaurant restaurant1 = new Restaurant("10", "restaurant1", "the most beautiful restaurant ever", true, 10,"italian","street blabla", "http::image",listImg);
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
                                  "heroImage": "http::image",
                                  "detailImagesUrls": ["image1","image2"]
                                  }
                                ]
                                """
                ));
    }


    @DirtiesContext

    @Test
    void getRestaurantById_shouldReturnRestaurantById10_whenCallById10 () throws Exception {

        String[] listImg = {"image1","image2"};
        Restaurant restaurant1 = new Restaurant("10", "restaurant1", "the most beautiful restaurant ever", true, 10,"italian","street blabla", "http::image",listImg);
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
                                   "heroImage": "http::image",
                                  "detailImagesUrls": ["image1","image2"]


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

        String[] listImg = {"image1","image2"};
        Restaurant restaurant1 = new Restaurant("10", "restaurant1", "the most beautiful restaurant ever", true, 10,"italian","street blabla", "http::image",listImg);
        Restaurant restaurant2 = new Restaurant("100", "restaurant1", "the most beautiful restaurant ever", false, 10,"german","street blabla", "http::image",listImg);

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
                                         "heroImage": "http::image",
                                            "detailImagesUrls": ["image1","image2"]

                                    }
                               ]

                       """));
    }


    @DirtiesContext

    @Test
    void getAllRestaurantByFavouriteIsTrue_shouldReturnTheCorrectRestaurant () throws Exception {

        String[] listImg = {"image1","image2"};
        Restaurant restaurant1 = new Restaurant("10", "restaurant1", "the most beautiful restaurant ever", true, 10,"italian","street blabla", "http::image",listImg);
        Restaurant restaurant2 = new Restaurant("100", "restaurant1", "the most beautiful restaurant ever", false, 10,"german","street blabla", "http::image",listImg);

        restaurantRepository.save(restaurant1);
        restaurantRepository.save(restaurant2);

        mvc.perform(MockMvcRequestBuilders.get("/api/favourite/restaurants"))
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
                                               "heroImage": "http::image",
                                            "detailImagesUrls": ["image1","image2"]
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
                                              "heroImage": "http::image",
                                            "detailImagesUrls": ["image1","image2"]
                                          }
                                          """))
                .andExpect(MockMvcResultMatchers.status().isOk());

    }

}
