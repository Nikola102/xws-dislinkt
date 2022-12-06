package dislinkt.userService.Model;

import java.util.List;

import org.springframework.data.neo4j.core.schema.Node;
import org.springframework.data.neo4j.core.schema.Relationship;
import org.springframework.data.neo4j.core.schema.Relationship.Direction;

@Node
public class Skill {
    private String skillName;
    @Relationship(type = "HAS_SKILL", direction = Direction.INCOMING)
    private List<GraphUser> obtainedBy;

    
    public Skill() {

    }
    
    public Skill(String id, String skillName) {
        this.skillName = skillName;
    }
    public String getSkillName() {
        return skillName;
    }
    public void setSkillName(String skillName) {
        this.skillName = skillName;
    }
    public List<GraphUser> getObtainedBy() {
        return obtainedBy;
    }
    public void setObtainedBy(List<GraphUser> obtainedBy) {
        this.obtainedBy = obtainedBy;
    }

    
}
