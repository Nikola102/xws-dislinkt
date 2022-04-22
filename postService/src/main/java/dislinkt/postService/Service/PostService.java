package dislinkt.postService.Service;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import dislinkt.postService.Model.Post;
import dislinkt.postService.Repository.PostRepo;

@Service
public class PostService {
    @Autowired
    private PostRepo postRepo;

    public Post save(Post newPost) {
        return postRepo.save(newPost);
    }

    public Post findByPostId(String postId) {
        Post post = postRepo.findById(postId);
        if (post == null) {
            throw new IllegalStateException("Post does not exist!");
        }
        return postRepo.findById(postId);

    }

    public Boolean deletePost(String postId) {
        Post post = this.findByPostId(postId);
        postRepo.delete(post);
        return true;
    }

    public ArrayList<Post> getAllPosts() {
        return postRepo.findAll();
    }

    public void deleteAllPosts() {
        postRepo.deleteAll();
        System.out.println("Deleting all posts...");
    }

    public ArrayList<Post> getAllPostsByUserId(String userId) {
        return postRepo.findAllByUserId(userId);
    }

    public ArrayList<Post> getAllPostsByUsername(String username) {
        return postRepo.findAllByUsername(username);
    }



}
