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
    @Autowired
    private GraphService graphService;

    public JobOffer findByJobOfferId (String id) {
        return jobOfferRepo.getById(id);
    }
    
    public JobOffer save (JobOffer jobOffer) {
        graphService.saveJobOffer(jobOffer.getId(), jobOffer.getTitle(), jobOffer.getSkills());
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

    public ArrayList<JobOffer> findBySearch(String search){
        ArrayList<JobOffer> jobOffers = jobOfferRepo.getByTitleContainingOrDescriptionContainingOrSkillsContains(search, search, search);

        return jobOffers;
    }

    public ArrayList<JobOffer> findBySearchPromoted(String search){
        ArrayList<JobOffer> jobOffers = jobOfferRepo.getByTitleContainingOrDescriptionContainingOrSkillsContains(search, search, search);
        ArrayList<JobOffer> promotedJobOffers = new ArrayList<JobOffer>();
        for (JobOffer jobOffer : jobOffers) {
            if(jobOffer.getDislinktPromoted()){
                promotedJobOffers.add(jobOffer);
            }
        }
        return promotedJobOffers;
    }

    public ArrayList<JobOffer> getByCompanyId(String companyId){
        ArrayList<JobOffer> jobOffers = jobOfferRepo.getByCompanyId(companyId);

        return jobOffers;
    }


}
