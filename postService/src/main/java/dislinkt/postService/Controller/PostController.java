package dislinkt.postService.Controller;

import org.springframework.http.MediaType;

import java.util.ArrayList;

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

import dislinkt.postService.Model.Post;
import dislinkt.postService.Service.PostService;


@RestController
@RequestMapping(path = "/post")
@CrossOrigin(origins = "*")
public class PostController {
    
    @Autowired
    private PostService postService;


    //helper method to reset and fill data to mongo container
    @GetMapping(path = "/mongodbDataReset")
    public void mdb(){
        System.out.println("mongodb.data called from postService controller");
        postService.deleteAllPosts();
        postService.save(new Post("id11", "Naslov1", "deskripcijaxDDDD", "id1", 2, 2));
        postService.save(new Post("id12", "Naslov2", "deskripcijaxDDDD", "id1", 2, 2));
        postService.save(new Post("id13", "Naslov3", "deskripcijaxDDDD", "id1", 2, 2));
        postService.save(new Post("id14", "Naslov4", "deskripcijaxDDDD", "id1", 2, 2));
        postService.save(new Post("id15", "Naslov5", "deskripcijaxDDDD", "id1", 2, 2));

    }
    
    //get all posts
    @GetMapping(
        produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getAllPosts(){
        ArrayList<Post> posts = postService.getAllPosts();
        if(posts.isEmpty())
            return new ResponseEntity<>(HttpStatus.NO_CONTENT); 
        return new ResponseEntity<ArrayList<Post>>(postService.getAllPosts(), HttpStatus.OK);
    }

    //get all posts by userId
    @GetMapping(path = "/{userId}",
        produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getAllPostsByUserId(@PathVariable String userId){
        ArrayList<Post> posts = postService.getAllPostsByUserId(userId);
        if(posts.isEmpty())
            return new ResponseEntity<>(HttpStatus.NO_CONTENT); 
        return new ResponseEntity<ArrayList<Post>>(postService.getAllPostsByUserId(userId), HttpStatus.OK);
    }

    //delete post by postId
    @DeleteMapping(path = "/{postId}")
    public ResponseEntity<?> deletePost(@PathVariable String postId){
        try{
            postService.deletePost(postId);
            return new ResponseEntity<>(HttpStatus.OK);
        }
        catch(Exception e){
            return new ResponseEntity<String>(e.getMessage() ,HttpStatus.NOT_FOUND);
        }
    }

    //put post by postId
    @PostMapping(path = "/{postId}",
        consumes = MediaType.APPLICATION_JSON_VALUE,
        produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> putPost(@PathVariable String postId, @RequestBody Post post){
        try{
            postService.save(post);
            return new ResponseEntity<Post>(post ,HttpStatus.OK);
        }
        catch(Exception e){
            return new ResponseEntity<String>(e.getMessage() ,HttpStatus.NOT_FOUND);
        }
    }


}
