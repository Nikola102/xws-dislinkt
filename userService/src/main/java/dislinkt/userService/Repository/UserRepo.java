package dislinkt.userService.Repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import dislinkt.userService.Model.User;

@Repository
public interface UserRepo extends MongoRepository<User, Long>{
    
    @Query("{id:'?0'}")
    User findUserById(Long id);

    
}
