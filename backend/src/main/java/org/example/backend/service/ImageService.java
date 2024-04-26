package org.example.backend.service;

import lombok.RequiredArgsConstructor;
import org.example.backend.modul.ImageObject;
import org.springframework.stereotype.Service;

import java.awt.*;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ImageService {

    public ImageObject generateImage(String name, String heroImageUrl, String detailImageUrl) {
        return new ImageObject(UUID.randomUUID().toString(), name, heroImageUrl, detailImageUrl);
    }
}
