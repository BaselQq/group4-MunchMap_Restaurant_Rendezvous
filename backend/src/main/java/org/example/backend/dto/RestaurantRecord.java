package org.example.backend.dto;

public record RestaurantRecord(
        String name,
        String description,
        boolean favourite,
        int rating,
        String type,
        String location,
        String heroImage,
        String[] detailImagesUrls
) {
}
