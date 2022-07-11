package dislinkt.userService.Model;

import java.util.ArrayList;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
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
    private ArrayList<String> blocked;
        
    private String experience;
    private String education;
    private String skills;
    private String interests;

    private String apiToken;

    public User(String username, String password, String name, String surname, String email, String phone,
            String gender, String bio, boolean isPrivate, ArrayList<String> following, ArrayList<String> followRequests,
            ArrayList<String> blocked, String experience, String education, String skills, String interests,
            String apiToken) {
        this.username = username;
        this.password = password;
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.phone = phone;
        this.gender = gender;
        this.bio = bio;
        this.isPrivate = isPrivate;
        this.following = following;
        this.followRequests = followRequests;
        this.blocked = blocked;
        this.experience = experience;
        this.education = education;
        this.skills = skills;
        this.interests = interests;
        this.apiToken = apiToken;
    }

    
}
