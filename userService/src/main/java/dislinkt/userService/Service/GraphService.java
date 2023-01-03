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

import dislinkt.userService.Model.GraphUser;
import dislinkt.userService.Model.User;
import dislinkt.userService.Repository.GraphRepo;
import dislinkt.userService.Repository.UserRepo;

@Service
public class GraphService{
    @Autowired
    GraphRepo graphRepo;
    @Autowired
    UserRepo userRepo;
    AuthToken authToken = AuthTokens.basic("neo4j", "admin");

    public Collection<GraphUser> getAll(){
        return graphRepo.findAll();
    }

    public GraphUser save(String id, String username) {
        return graphRepo.save(new GraphUser(id, username));
    }



    public void follow(String followerUsername, String toFollowUsername) {
        GraphUser followerUser = graphRepo.findByUsername(followerUsername);
        GraphUser toFollowUser = graphRepo.findByUsername(toFollowUsername);

        followerUser.getFollowed().add(toFollowUser);

        graphRepo.save(followerUser);
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
