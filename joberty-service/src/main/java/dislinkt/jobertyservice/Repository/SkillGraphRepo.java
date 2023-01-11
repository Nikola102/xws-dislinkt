package dislinkt.jobertyservice.Repository;

import org.springframework.data.neo4j.repository.Neo4jRepository;

import dislinkt.jobertyservice.Model.GraphSkill;

public interface SkillGraphRepo extends Neo4jRepository<GraphSkill, String>{
    public GraphSkill findByName(String name);
}
