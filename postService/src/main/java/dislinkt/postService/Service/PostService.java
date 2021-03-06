package dislinkt.postService.Service;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import dislinkt.postService.Model.Comment;
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
        System.out.println(postId);
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

    public ArrayList<Post> getAllPublicUserPosts() {
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

    public Post likePost(String userId, String postId) {
        Post post = findByPostId(postId);
        if(!post.getLikedUserIds().contains(userId))
        {
            post.getLikedUserIds().add(userId);
            post.getDislikedUserIds().remove(userId);
        }
            
        else
            post.getLikedUserIds().remove(userId);

        return postRepo.save(post);
    }

    public Post dislikePost(String userId, String postId) {
        Post post = findByPostId(postId);
        if(!post.getDislikedUserIds().contains(userId))
        {
            post.getDislikedUserIds().add(userId);
            post.getLikedUserIds().remove(userId);
        }
        else
            post.getDislikedUserIds().remove(userId);
        
        return postRepo.save(post);
    }

    public Post commentPost(Comment newComment, String postId) {
        Post post = findByPostId(postId);
        post.getComments().add(newComment);
        return postRepo.save(post);
    }

    public void deleteUserPosts(String userId){
        ArrayList<Post> toDeletePosts = postRepo.findAllByUserId(userId);
        postRepo.deleteAll(toDeletePosts);
    }

    public void deleteUserComments(String userId){
        ArrayList<Post> posts = postRepo.findAllByUserId(userId);
        for(Post post: posts){
            ArrayList<Comment> postComments = post.getComments();
            for(Comment comment: postComments){
                if(comment.getUserId().compareTo(userId) == 0){
                    postComments.remove(comment);
                }
            }
            post.setComments(postComments);
            postRepo.save(post);
        }
    }


    public void updateUserPosts(String userId, String newUsername){
        ArrayList<Post> posts = postRepo.findAllByUserId(userId);
        for(Post post: posts){
            post.setUsername(newUsername);
            postRepo.save(post);
        }
    }
}
