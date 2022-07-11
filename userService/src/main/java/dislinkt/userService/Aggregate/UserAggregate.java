package dislinkt.userService.Aggregate;

import org.axonframework.commandhandling.CommandHandler;
import org.axonframework.eventsourcing.EventSourcingHandler;
import org.axonframework.modelling.command.AggregateIdentifier;
import org.axonframework.modelling.command.AggregateLifecycle;
import org.axonframework.spring.stereotype.Aggregate;

import dislinkt.userService.Command.DeleteUserCommand;
import dislinkt.userService.Event.UserDeletedEvent;

@Aggregate
public class UserAggregate {
    @AggregateIdentifier
    private String userId;
    private String username;
    private String userStatus;

    public UserAggregate() {
    }

    @CommandHandler
    public UserAggregate(DeleteUserCommand deleteUserCommand) {
        AggregateLifecycle.apply(new UserDeletedEvent(deleteUserCommand.getUserId(), deleteUserCommand.getUsername(), deleteUserCommand.getUserStatus()));
    }

    @EventSourcingHandler
    public void on(UserDeletedEvent event){
        this.userId = event.getUserId();
        this.username = event.getUsername();
        this.userStatus = event.getUserStatus();
    }
}
