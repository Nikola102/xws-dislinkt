package dislinkt.jobertyservice.Controller;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import dislinkt.jobertyservice.Model.Agent;
import dislinkt.jobertyservice.Service.AgentService;

@RestController
@RequestMapping(path = "/agent")
@CrossOrigin(origins = "*")
public class AgentController {
    @Autowired
    private AgentService agentService;

    //helper method to reset and fill data to mongo container
    @GetMapping(path = "/mongodbDataReset")
    public void mdb(){
        System.out.println("mongodb.data called from userService controller");
        agentService.deleteAllAgents();
        agentService.save(new Agent("id1", "Ivance69", "password", "Ivan", "Lukovic", "ivan@notuns.com", "0600000000", false));
        
    }

    @GetMapping(produces = "application/json")
    public ResponseEntity<?> getAllAgents() {
        ArrayList<Agent> agents = agentService.getAllAgents();
        if (agents.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT); 
        }
        return new ResponseEntity<ArrayList<Agent>>(agents, HttpStatus.OK);
    }


}
