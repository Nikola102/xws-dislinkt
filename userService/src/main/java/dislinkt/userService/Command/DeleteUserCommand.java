package dislinkt.userService.Command;

import org.axonframework.modelling.command.TargetAggregateIdentifier;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class DeleteUserCommand {
    @TargetAggregateIdentifier
    private String userId;
    private String username;
    private String userStatus;
}
