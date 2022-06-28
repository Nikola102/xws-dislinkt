package dislinkt.postService.Aggregate;

import org.axonframework.commandhandling.CommandHandler;
import org.axonframework.eventsourcing.EventSourcingHandler;
import org.axonframework.modelling.command.AggregateIdentifier;
import org.axonframework.modelling.command.AggregateLifecycle;
import org.axonframework.spring.stereotype.Aggregate;

import dislinkt.coreService.Command.DeleteUserStuffCommand;
import dislinkt.coreService.Event.UserStuffDeletedEvent;
import lombok.extern.slf4j.Slf4j;

@Aggregate
@Slf4j
public class PostsAggregate {
    @AggregateIdentifier
    private String username;
    private String userId;

    public PostsAggregate() {
    }

    @CommandHandler
    public PostsAggregate(DeleteUserStuffCommand deleteUserStuffCommand){
        log.info("Executing Delete user stuff comand for user " + deleteUserStuffCommand.getUserId());

        UserStuffDeletedEvent userStuffDeletedEvent = new UserStuffDeletedEvent(deleteUserStuffCommand.getUserId(),deleteUserStuffCommand.getUsername());
        AggregateLifecycle.apply(userStuffDeletedEvent);
    }

    @EventSourcingHandler
    public void on(UserStuffDeletedEvent event){
        this.username = event.getUsername();
        this.userId = event.getUserId();
    }
}
