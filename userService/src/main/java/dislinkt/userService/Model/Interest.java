package dislinkt.userService.Model;


import java.util.List;

import org.springframework.data.neo4j.core.schema.Id;
import org.springframework.data.neo4j.core.schema.Node;
import org.springframework.data.neo4j.core.schema.Relationship;
import org.springframework.data.neo4j.core.schema.Relationship.Direction;


@Node
public class Interest {
    @Id
    private String id;
    private String interestName;
    @Relationship(type = "INTERESTED_IN", direction = Direction.INCOMING)
    private List<GraphUser> interestedUsers;


    
    public Interest() {

    }
    
    public Interest(String id, String interestName) {
        this.interestName = interestName;
    }
    public String getInterestName() {
        return interestName;
    }
    public void setInterestName(String interestName) {
        this.interestName = interestName;
    }
    public List<GraphUser> getInterestedUsers() {
        return interestedUsers;
    }
    public void setInterestedUsers(List<GraphUser> interestedUsers) {
        this.interestedUsers = interestedUsers;
    }

    
}
