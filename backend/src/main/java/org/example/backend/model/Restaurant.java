package org.example.backend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.With;

@Data
@With
@AllArgsConstructor
public class Restaurant {

    private String id;
    private String name;
    private String description;
    private Boolean favourite;
    private int rating;
    private String type;
    private String location;
    private String heroImage;
    private String[] detailImagesUrls;
}