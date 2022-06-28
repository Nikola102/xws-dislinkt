package dislinkt.coreService.Command;

import org.axonframework.modelling.command.TargetAggregateIdentifier;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class DeleteUserStuffCommand {
    @TargetAggregateIdentifier
    private String username;
    private String userId;
}
