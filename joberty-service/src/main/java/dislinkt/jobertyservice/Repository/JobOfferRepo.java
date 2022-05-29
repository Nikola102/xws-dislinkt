package dislinkt.jobertyservice.Repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import dislinkt.jobertyservice.Model.JobOffer;

@Repository
public interface JobOfferRepo extends MongoRepository<JobOffer, String>{

    public JobOffer findByJobOfferId(String jobOfferId);
    public JobOffer updateJobOffer(JobOffer jobOffer);
    public void deleteJobOffer(String jobOfferId);
    public void deleteAllJobOffers();

}
    

