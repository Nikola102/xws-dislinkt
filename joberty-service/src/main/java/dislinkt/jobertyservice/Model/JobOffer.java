package dislinkt.jobertyservice.Model;

import java.util.ArrayList;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document (collection = "jobOffer")
public class JobOffer {
    @Id
    private String id;

    private String title;
    private String description;
    private String companyId;
    private String location;
    private String seniority;
    private String field;
    private ArrayList<String> technology;
    
    

}
