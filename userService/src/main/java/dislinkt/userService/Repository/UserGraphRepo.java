package dislinkt.userService.Repository;

import org.springframework.data.neo4j.repository.Neo4jRepository;

import dislinkt.userService.Model.GraphUser;

public interface UserGraphRepo extends Neo4jRepository<GraphUser, String>{
    public GraphUser findByUsername(String username);
}
