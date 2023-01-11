package dislinkt.userService.Model;

import java.util.ArrayList;
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
    @Relationship(type = "HAS", direction = Direction.OUTGOING)
    private List<GraphSkill> skills;
    
    // @Relationship(type = "INTERESTED_IN", direction = Direction.OUTGOING)
    // private List<Interest> interests;
    // @Relationship(type = "EXPERIENCE_IN", direction = Direction.OUTGOING)
    // private List<WorkExperience> experiences;

    public GraphUser(){

    }

    public GraphUser(String id, String username, ArrayList<GraphSkill> skills){
        this.id = id;
        this.username = username;
        this.skills = skills;
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

    public List<GraphSkill> getSkills() {
        return skills;
    }

    public void setSkills(List<GraphSkill> skills) {
        this.skills = skills;
    }
    
}
