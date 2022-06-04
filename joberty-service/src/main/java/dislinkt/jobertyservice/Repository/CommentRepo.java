package dislinkt.jobertyservice.Repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import dislinkt.jobertyservice.Model.Comment;

@Repository
public interface CommentRepo extends MongoRepository<Comment, String>{
    
    public Comment getById(String commentId);
    public void deleteById(String commentId);
    public void deleteAll();

}
