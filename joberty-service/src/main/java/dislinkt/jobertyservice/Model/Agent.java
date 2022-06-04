package dislinkt.jobertyservice.Model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@AllArgsConstructor
@NoArgsConstructor
@Document (collection = "agents")
public class Agent {
    @Id
    private String id;

    private String username;
    private String password;
    private String name;
    private String surname;
    private String email;
    private String phone;

    private Boolean owner;
    private String apiToken;
}
