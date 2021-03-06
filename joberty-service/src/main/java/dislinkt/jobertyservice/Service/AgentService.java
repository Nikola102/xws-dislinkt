package dislinkt.jobertyservice.Service;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import dislinkt.jobertyservice.Model.Agent;
import dislinkt.jobertyservice.Repository.AgentRepo;

@Service
public class AgentService {
    @Autowired
    private AgentRepo agentRepo;

    public ArrayList<Agent> getAllAgents() {
        return agentRepo.findAll();
    }

    public Agent findByUsername(String username) {
        return agentRepo.findByUsername(username);
    }

    public Agent findByAgentId(String agentId) {
        return agentRepo.getById(agentId);
    }

    public ArrayList<Agent> findByUsernameContaining(String usernamePart) {
        return agentRepo.findByUsernameContaining(usernamePart);
    }

    public void deleteAllAgents() {
        agentRepo.deleteAll();
    }

    public Boolean deleteAgentById(String agentId) {
        Agent agent = agentRepo.getById(agentId);
        if (agent == null)
            throw new IllegalArgumentException("Agent not found");
        agentRepo.delete(agent);
        return true;
        
    }

    public void save(Agent agent) {
        agentRepo.save(agent);
    }

    public boolean updateToken(String username,String apiToken){
        Agent dbAgent=agentRepo.findByUsername(username);
        if(dbAgent!=null){
            dbAgent.setApiToken(apiToken);
            agentRepo.save(dbAgent);
            return true;
        }
        else{
            return false;
        }

    }

    public Agent login(String username, String password){
        Agent agent = agentRepo.findByUsername(username);
        if(agent == null){
            throw new IllegalStateException("Agent does not exist!");
        }
        if(!agent.getPassword().equals(password)){
            throw new IllegalStateException("Password is incorrect!");
        }
        return agent;
    }

}
