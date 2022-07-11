package dislinkt.userService.Event;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserDeletedEvent {
    private String userId;
    private String username;
    private String userStatus;
}
