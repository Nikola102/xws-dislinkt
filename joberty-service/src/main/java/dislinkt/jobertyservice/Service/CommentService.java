package dislinkt.jobertyservice.Service;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import dislinkt.jobertyservice.Model.Comment;
import dislinkt.jobertyservice.Repository.CommentRepo;

@Service
public class CommentService {
    @Autowired
    private CommentRepo commentRepo;

    public Comment save(Comment comment) {
        return commentRepo.save(comment);
    }

    public Comment findByCommentId(String commentId) {
        return commentRepo.getById(commentId);
    }

    public ArrayList<Comment> findAllComments() {
        return (ArrayList<Comment>) commentRepo.findAll();
    }

    public Boolean delete(String commentId) {
        try {
            commentRepo.deleteById(commentId);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    public void deleteAll() {
        commentRepo.deleteAll();
    }


}
