package dislinkt.jobertyservice.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import dislinkt.jobertyservice.Model.Comment;
import dislinkt.jobertyservice.Service.CommentService;

@RestController
@RequestMapping(path = "/comment")
@CrossOrigin(origins = "*")
public class CommentController {
    @Autowired
    private CommentService commentService;

    @PostMapping(consumes = "application/json", produces = "application/json")
    public ResponseEntity<?> saveComment(@RequestBody Comment comment) {
        Comment tmp = commentService.save(comment);
        if (tmp != null) {
            return new ResponseEntity<>(tmp, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping(path = "/{id}")
    public ResponseEntity<?> deleteComment(@PathVariable String id) {
        if (commentService.delete(id)) {
            return new ResponseEntity<>(HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping()
    public ResponseEntity<?> deleteAllComments() {
        commentService.deleteAll();
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping(produces = "application/json")
    public ResponseEntity<?> getAllComments() {
        return new ResponseEntity<>(commentService.findAllComments(), HttpStatus.OK);
    }

    @GetMapping(path = "/{id}", produces = "application/json")
    public ResponseEntity<?> getComment(@PathVariable String id) {
        return new ResponseEntity<>(commentService.findByCommentId(id), HttpStatus.OK);
    }

}
