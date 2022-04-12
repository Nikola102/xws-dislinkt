package dislinkt.userService.Repository;

import java.util.ArrayList;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import dislinkt.userService.Model.User;

@Repository
public interface UserRepo extends MongoRepository<User, Long>{

    User findByEmail(String email);
    User findByUsername(String email);
    public ArrayList<User> findAll();
}
