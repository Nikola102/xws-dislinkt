package dislinkt.userService.Model;

import java.util.List;

import org.springframework.data.neo4j.core.schema.Id;
import org.springframework.data.neo4j.core.schema.Node;
import org.springframework.data.neo4j.core.schema.Relationship;
import org.springframework.data.neo4j.core.schema.Relationship.Direction;

@Node
public class GraphUser {
    @Id
    private String id;
    private String username;
    @Relationship(type = "FOLLOWING", direction = Direction.OUTGOING)
    private List<GraphUser> followed;
    @Relationship(type = "FOLLOWED_BY", direction = Direction.OUTGOING)
    private List<GraphUser> followers;
    @Relationship(type = "HAS_SKILL", direction = Direction.OUTGOING)
    private List<Skill> skills;
    @Relationship(type = "INTERESTED_IN", direction = Direction.OUTGOING)
    private List<Interest> interests;
    @Relationship(type = "EXPERIENCE_IN", direction = Direction.OUTGOING)
    private List<WorkExperience> experiences;

    public GraphUser(){

    }

    public GraphUser(String id, String username){
        this.id = id;
        this.username = username;
    }

    public String getId() {
        return id;
    }
    public String getUsername() {
        return username;
    }

    public List<GraphUser> getFollowed() {
        return followed;
    }

    public List<GraphUser> getFollowers() {
        return followers;
    }
    
}
