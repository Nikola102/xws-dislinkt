package dislinkt.jobertyservice.Model;

import java.util.ArrayList;

import org.springframework.data.neo4j.core.schema.Id;
import org.springframework.data.neo4j.core.schema.Node;
import org.springframework.data.neo4j.core.schema.Relationship;
import org.springframework.data.neo4j.core.schema.Relationship.Direction;


@Node
public class GraphJobOffer {
    @Id
    private String id;
    private String title;
    @Relationship(type = "REQUIRES", direction = Direction.OUTGOING)
    private ArrayList<GraphSkill> skills;
    
    public GraphJobOffer() {
    }

    

    public GraphJobOffer(String id, String title, ArrayList<GraphSkill> skills) {
        this.id = id;
        this.title = title;
        this.skills = skills;
    }



    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public ArrayList<GraphSkill> getSkills() {
        return skills;
    }

    public void setSkills(ArrayList<GraphSkill> skills) {
        this.skills = skills;
    }

    
}
