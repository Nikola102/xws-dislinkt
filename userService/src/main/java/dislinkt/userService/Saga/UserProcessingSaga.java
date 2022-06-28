package dislinkt.userService.Saga;

import org.axonframework.commandhandling.gateway.CommandGateway;
import org.axonframework.modelling.saga.EndSaga;
import org.axonframework.modelling.saga.SagaEventHandler;
import org.axonframework.modelling.saga.StartSaga;
import org.axonframework.spring.stereotype.Saga;
import org.springframework.beans.factory.annotation.Autowired;

import dislinkt.coreService.Command.DeleteUserStuffCommand;
import dislinkt.coreService.Event.UserStuffDeletedEvent;
import dislinkt.userService.Event.UserDeletedEvent;
import lombok.extern.slf4j.Slf4j;

@Saga
@Slf4j
public class UserProcessingSaga {
    @Autowired
    private transient CommandGateway commandGateway;


    @StartSaga
    @SagaEventHandler(associationProperty = "userId")
    private void handle(UserDeletedEvent event){
        log.info("User deleted event for username " + event.getUsername());

        System.out.println("Saga before command");
        DeleteUserStuffCommand deleteUserStuffCommand = DeleteUserStuffCommand.builder()
        .username(event.getUsername())
        .userId(event.getUserId())
        .build();

        commandGateway.sendAndWait(deleteUserStuffCommand);
    }

    @EndSaga
    @SagaEventHandler(associationProperty = "userId")
    private void handle(UserStuffDeletedEvent event){
        log.info("User stuff deleted for user " + event.getUserId());
    }
}
