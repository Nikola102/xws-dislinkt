package dislinkt.postService.Model;

import java.util.ArrayList;


import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@AllArgsConstructor
@NoArgsConstructor
@Document(collection = "posts")
public class Post {
    @Id
	private String id;

    private String title;
	private String description;
	private String image;
	private String userId;
    private String username;

	private ArrayList<String> likedUserIds = new ArrayList<String>();
	private ArrayList<String> dislikedUserIds = new ArrayList<String>();
    private ArrayList<Comment> comments = new ArrayList<Comment>();

    public Post(String title, String description, String userId, String username , int likes, int dislikes) {
        this.title = title;
        this.description = description;
        this.userId = userId;
        this.username = username;
    }
}
