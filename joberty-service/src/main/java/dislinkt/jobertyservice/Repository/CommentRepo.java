package dislinkt.jobertyservice.Repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import dislinkt.jobertyservice.Model.Comment;

@Repository
public interface CommentRepo extends MongoRepository<Comment, String>{
    
    public Comment findByCommentId(String commentId);
    public Comment updateComment(Comment comment);
    public void deleteComment(String commentId);
    public void deleteAllComments();

}
