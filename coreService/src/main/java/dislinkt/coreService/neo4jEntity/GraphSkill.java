package dislinkt.coreService.neo4jEntity;


import org.springframework.data.neo4j.core.schema.Id;
import org.springframework.data.neo4j.core.schema.Node;

@Node
public class GraphSkill {
    @Id
    private String id;
    private String name;


    
    public GraphSkill() {
    }
    public GraphSkill(String id, String name) {
        this.id = id;
        this.name = name;
    }
    public String getId() {
        return id;
    }
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }

    
}
