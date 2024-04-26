package org.example.backend.modul;




import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ImageObject {
    String id;
    String name;
    String heroImageUrl;
    String detailImageUrl;
}
