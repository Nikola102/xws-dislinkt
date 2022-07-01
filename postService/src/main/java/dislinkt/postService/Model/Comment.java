package dislinkt.postService.Model;


import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

@Data
@Document(collection = "comments")
public class Comment {
    @Id
    private String id;

    private String userId;
    private String text;
}
