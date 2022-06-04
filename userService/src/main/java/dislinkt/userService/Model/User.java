package dislinkt.userService.Model;

import java.util.ArrayList;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "users")
public class User {
    @Id
    private String id;

    private String username;
    private String password;
    private String name;
    private String surname;
    private String email;
    private String phone;
    private String gender;
    private String bio;
    
    private boolean isPrivate;
    private ArrayList<String> following;
    private ArrayList<String> followRequests;
    
    private String experience;
    private String education;
    private String skills;
    private String interests;

    private String apiToken;
}
