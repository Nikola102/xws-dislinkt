package dislinkt.postService.Repository;

import java.util.ArrayList;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import dislinkt.postService.Model.Post;

@Repository
public interface PostRepo extends MongoRepository<Post, Long>{
    
    public ArrayList<Post> findAll();
    public ArrayList<Post> findAllByUserId(String userId);
    public Post findById(String postId);

}
