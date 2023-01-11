package dislinkt.coreService.neo4jEntity;

import org.springframework.data.neo4j.repository.Neo4jRepository;

public interface SkillGraphRepo extends Neo4jRepository<GraphSkill, String>{
    public GraphSkill findByName(String name);
}
