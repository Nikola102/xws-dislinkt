package dislinkt.jobertyservice.Service;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import dislinkt.jobertyservice.Model.JobOffer;
import dislinkt.jobertyservice.Repository.JobOfferRepo;

@Service
public class JobOfferService {
    @Autowired
    private JobOfferRepo jobOfferRepo;

    public JobOffer findByJobOfferId (String id) {
        return jobOfferRepo.findByJobOfferId(id);
    }
    
    public JobOffer save (JobOffer jobOffer) {
        return jobOfferRepo.save(jobOffer);
    }

    public void deleteByJobOfferId (String id) {
        jobOfferRepo.deleteById(id);
    }

    public void deleteAll () {
        jobOfferRepo.deleteAll();
    }

    public ArrayList<JobOffer> findAllJobOffers () {
        return (ArrayList<JobOffer>) jobOfferRepo.findAll();
    }
}
