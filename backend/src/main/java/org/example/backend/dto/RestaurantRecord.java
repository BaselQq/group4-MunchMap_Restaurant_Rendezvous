package org.example.backend.dto;

import org.example.backend.modul.ImageObject;

public record RestaurantRecord(String id, String name,
                               String description, boolean favourite,
                               int rating, String type, String location,
                               ImageObject[] image) {
}
