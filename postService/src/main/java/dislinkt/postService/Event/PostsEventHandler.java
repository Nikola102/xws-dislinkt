package dislinkt.postService.Event;

import org.axonframework.eventhandling.EventHandler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import dislinkt.coreService.Event.UserStuffDeletedEvent;
import dislinkt.postService.Service.PostService;

@Component
public class PostsEventHandler {
    @Autowired
    private PostService postService;

    @EventHandler
    public void on(UserStuffDeletedEvent userStuffDeletedEvent){
        postService.deleteUserPosts(userStuffDeletedEvent.getUserId());
    }
}
