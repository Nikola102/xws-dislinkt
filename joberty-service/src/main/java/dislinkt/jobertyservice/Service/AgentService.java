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

    public ArrayList<Agent> findByUsernameContaining(String usernamePart) {
        return agentRepo.findByUsernameContaining(usernamePart);
    }

    public void deleteAllAgents() {
        agentRepo.deleteAll();
    }

    public void save(Agent agent) {
        agentRepo.save(agent);
    }
}
