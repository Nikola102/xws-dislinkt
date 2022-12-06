package dislinkt.userService.Model;

import java.util.List;

import org.springframework.data.neo4j.core.schema.Node;
import org.springframework.data.neo4j.core.schema.Relationship;
import org.springframework.data.neo4j.core.schema.Relationship.Direction;

@Node
public class WorkExperience {
    private String workExperienceName;
    @Relationship(type = "EXPERIENCE_IN", direction = Direction.INCOMING)
    private List<GraphUser> hasExperience;


    
    public WorkExperience() {

    }
    public WorkExperience(String id, String workExperienceName) {
        this.workExperienceName = workExperienceName;
    }
    public String getWorkExperienceName() {
        return workExperienceName;
    }
    public void setWorkExperienceName(String workExperienceName) {
        this.workExperienceName = workExperienceName;
    }
    public List<GraphUser> getHasExperience() {
        return hasExperience;
    }
    public void setHasExperience(List<GraphUser> hasExperience) {
        this.hasExperience = hasExperience;
    }

    
}
