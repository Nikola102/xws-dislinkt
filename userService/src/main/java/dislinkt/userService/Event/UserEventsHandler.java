package dislinkt.userService.Event;

import org.axonframework.eventhandling.EventHandler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import dislinkt.userService.Service.UserService;

@Component
public class UserEventsHandler {
    @Autowired
    private  UserService userService;
    @EventHandler
    public void on(UserDeletedEvent event){
        userService.deleteUser(event.getUsername());
    }
}
