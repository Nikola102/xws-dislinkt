package dislinkt.jobertyservice.Service;

import java.util.ArrayList;
import java.util.List;

import org.neo4j.driver.AuthToken;
import org.neo4j.driver.AuthTokens;
import org.neo4j.driver.GraphDatabase;
import org.neo4j.driver.Record;
import org.neo4j.driver.Result;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import dislinkt.jobertyservice.Model.GraphJobOffer;
import dislinkt.jobertyservice.Model.GraphSkill;
import dislinkt.jobertyservice.Model.JobOffer;
import dislinkt.jobertyservice.Repository.JobOfferGraphRepo;
import dislinkt.jobertyservice.Repository.JobOfferRepo;
import dislinkt.jobertyservice.Repository.SkillGraphRepo;

@Service
public class GraphService {
    @Autowired
    JobOfferGraphRepo jobOfferGraphRepo;
    @Autowired
    SkillGraphRepo skillGraphRepo;
    @Autowired
    JobOfferRepo jobOfferRepo;

    AuthToken authToken = AuthTokens.basic("neo4j", "admin");

    public GraphJobOffer saveJobOffer(String id, String title, ArrayList<String> skills){
        GraphJobOffer newJobOffer = new GraphJobOffer(id, title, new ArrayList<>());

        for (String skill : skills) {
            if(skillGraphRepo.findByName(skill) == null){
                skillGraphRepo.save(new GraphSkill(skillGraphRepo.count() + 1 + "", skill));
            }
            newJobOffer.getSkills().add(skillGraphRepo.findByName(skill));
        }

        return jobOfferGraphRepo.save(newJobOffer);
    }

    public ArrayList<JobOffer> generateJobOfferRecommendations(String username){
        ArrayList<JobOffer> recommendedJobOffers = new ArrayList<JobOffer>();

        try (var driver = GraphDatabase.driver("bolt://localhost:7687", authToken); var session = driver.session()) {
            Result result = session.run("match (n {username:'"+ username +"'})-[:HAS]->(m) with collect(m) as skills unwind skills as nextSkills match (nextSkills)<-[:REQUIRES]-(result) with result.id as id return id");
            List<Record> records = result.list();
            for (Record record : records) {
                String trimmedId = record.get("id").toString().replaceAll("^\"|\"$", "");
                recommendedJobOffers.add(jobOfferRepo.getById(trimmedId));
            }
            
            return recommendedJobOffers;
        }
    }
}
