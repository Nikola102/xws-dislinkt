package dislinkt.jobertyservice.Repository;

import java.util.ArrayList;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import dislinkt.jobertyservice.Model.Agent;

@Repository
public interface AgentRepo extends MongoRepository<Agent, String>{

    public Agent findByUsername(String username);
    public Agent findByAgentId(String agentId);
    public ArrayList<Agent> findAll();
    public ArrayList<Agent> findByUsernameContaining(String usernamePart);  

}
