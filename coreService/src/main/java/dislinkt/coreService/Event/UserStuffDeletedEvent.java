package dislinkt.coreService.Event;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserStuffDeletedEvent {
    private String username;
    private String userId;
}
