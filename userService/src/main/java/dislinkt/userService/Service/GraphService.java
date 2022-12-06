package dislinkt.userService.Service;

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import dislinkt.userService.Model.GraphUser;
import dislinkt.userService.Repository.GraphRepo;

@Service
public class GraphService {
    @Autowired
    GraphRepo graphRepo;

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
        toFollowUser.getFollowers().add(followerUser);

        graphRepo.save(toFollowUser);
        graphRepo.save(followerUser);
    }
}
