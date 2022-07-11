package dislinkt.coreService.Event;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserUpdateEvent extends Event {
    private String id;
    private String username;
    private String password;
    private String name;
    private String surname;
    private String email;
    private String phone;
    private String gender;
    private String bio;
    private String experience;
    private String education;
    private String skills;
    private String interests;
}
