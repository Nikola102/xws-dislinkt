package dislinkt.jobertyservice.Repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import dislinkt.jobertyservice.Model.JobOffer;

@Repository
public interface JobOfferRepo extends MongoRepository<JobOffer, String>{

    public JobOffer getById(String jobOfferId);
    public void deleteById(String jobOfferId);
    public void deleteAll();

}
    

