package org.example.backend.modul;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class Restaurant {

    private  String  id;
    private  String name;
    private  String    description;
    private  Boolean favourite;
    private  String    type;
    private String location;
    private ImageObject[] image;

}