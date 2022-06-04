package dislinkt.jobertyservice.Repository;

import java.util.ArrayList;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import dislinkt.jobertyservice.Model.JobOffer;

@Repository
public interface JobOfferRepo extends MongoRepository<JobOffer, String>{

    public JobOffer getById(String jobOfferId);
    public void deleteById(String jobOfferId);
    public void deleteAll();
    public ArrayList<JobOffer> getByTitleContaining(String titlePart);
    public ArrayList<JobOffer> getByTitleContainingOrDescriptionContainingOrTechnologyContains(String part1, String part2, String part3);
    public ArrayList<JobOffer> getByCompanyId(String companyId);

}
    

