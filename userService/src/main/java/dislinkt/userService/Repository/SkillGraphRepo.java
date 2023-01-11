package dislinkt.userService.Repository;

import org.springframework.data.neo4j.repository.Neo4jRepository;

import dislinkt.userService.Model.GraphSkill;


public interface SkillGraphRepo extends Neo4jRepository<GraphSkill, String>{
    public GraphSkill findByName(String name);
}
