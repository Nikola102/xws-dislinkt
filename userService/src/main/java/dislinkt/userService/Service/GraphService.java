package dislinkt.userService.Service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import org.neo4j.driver.AuthToken;
import org.neo4j.driver.AuthTokens;
import org.neo4j.driver.GraphDatabase;
import org.neo4j.driver.Record;
import org.neo4j.driver.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import dislinkt.userService.Model.GraphSkill;
import dislinkt.userService.Model.GraphUser;
import dislinkt.userService.Model.User;
import dislinkt.userService.Repository.SkillGraphRepo;
import dislinkt.userService.Repository.UserGraphRepo;
import dislinkt.userService.Repository.UserRepo;

@Service
public class GraphService{
    @Autowired
    UserGraphRepo userGraphRepo;
    @Autowired
    SkillGraphRepo skillGraphRepo;
    @Autowired
    UserRepo userRepo;
    
    AuthToken authToken = AuthTokens.basic("neo4j", "admin");

    public Collection<GraphUser> getAll(){
        return userGraphRepo.findAll();
    }

    public GraphUser saveGraphUser(String id, String username, ArrayList<String> skills) {
        GraphUser newGraphUser = new GraphUser(id, username, new ArrayList<>());
        
        for (String skill : skills) {
            if(skillGraphRepo.findByName(skill) == null){
                skillGraphRepo.save(new GraphSkill(skillGraphRepo.count() + 1 + "", skill));
            }
            newGraphUser.getSkills().add(skillGraphRepo.findByName(skill));
        }
        return userGraphRepo.save(newGraphUser);
    }



    public void follow(String followerUsername, String toFollowUsername) {
        GraphUser followerUser = userGraphRepo.findByUsername(followerUsername);
        GraphUser toFollowUser = userGraphRepo.findByUsername(toFollowUsername);

        followerUser.getFollowed().add(toFollowUser);

        userGraphRepo.save(followerUser);
    }

    //TODO: Da li treba da vraca korisnike koji su privatni?
    public ArrayList<User> generateFollowRecommendations(String username){
        ArrayList<User> recommendedUsers = new ArrayList<User>();

        try (var driver = GraphDatabase.driver("bolt://localhost:7687", authToken); var session = driver.session()) {
            Result result = session.run("match (n {username:'"+ username +"'})-[:FOLLOWING]->(m) with collect(m) as following unwind following as nextFollowing match (nextFollowing)-[:FOLLOWING]->(result) with result.username as username limit 5 return username");
            List<Record> records = result.list();
            for (Record record : records) {
                String trimmedUsername = record.get("username").toString().replaceAll("^\"|\"$", "");
                recommendedUsers.add(userRepo.findByUsername(trimmedUsername));
            }
            return recommendedUsers;
        }
    }


    
}
