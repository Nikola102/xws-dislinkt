package dislinkt.userService.Repository;

import java.util.ArrayList;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import dislinkt.userService.Model.User;

@Repository
public interface UserRepo extends MongoRepository<User, Long>{

    public User findByEmail(String email);
    public User findByUsername(String email);
    public ArrayList<User> findAll();
    public ArrayList<User> findByUsernameContaining(String usernamePart);
    public User getById(String userId);
    
}
