package dislinkt.jobertyservice.Model;

import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document (collection = "comment")
public class Comment {

    private String text;
    private Float ratings;
    private Integer payment;
    private String recruitmentProcess;
    private String agentId;
}
