package dislinkt.jobertyservice.Model;


import java.util.ArrayList;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document (collection = "company")
public class Company {
    @Id
    private String id;

    @Indexed(unique = true)
    private String name;
    private String description;
    private String culture;
    @Indexed(unique = true)
    private String mail;
    private String phone;
    private Boolean approved;
    private String ownerId;
    private String ownerUsername;

    private ArrayList<Comment> comments;
}
