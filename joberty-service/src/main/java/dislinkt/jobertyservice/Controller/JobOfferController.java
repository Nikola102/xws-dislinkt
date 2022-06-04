package dislinkt.jobertyservice.Controller;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import dislinkt.jobertyservice.Model.JobOffer;
import dislinkt.jobertyservice.Service.JobOfferService;

@RestController
@RequestMapping(path = "/joboffer")
@CrossOrigin(origins = "*")
public class JobOfferController {
    @Autowired
    private JobOfferService jobOfferService;

    //helper method to reset and fill data to mongo container
    @GetMapping(path = "/mongodbDataReset")
    public void mdb(){
        System.out.println("mongodb.data called from userService controller");
        jobOfferService.deleteAll();
        ArrayList<String> list = new ArrayList<String>();
        list.add("Java");
        jobOfferService.save(new JobOffer("id1", "Molim neko java?", "https://www.youtube.com/watch?v=_QgcIfBZmZk", "id1", "Salaš", "entry", "java", list, "ImeComp", false ));
        jobOfferService.save(new JobOffer("id2", "Molim neko pajton, salim se", "https://www.youtube.com/watch?v=_QgcIfBZmZk", "id1", "Salaš", "entry", "java", list, "ImeComp", false ));
        list.add("Python");
        jobOfferService.save(new JobOffer("id3", "Molim neko c++", "https://www.youtube.com/watch?v=_QgcIfBZmZk", "id1", "Salaš", "entry", "java", list, "CompIme", false ));
        list.add("Lisp");
        jobOfferService.save(new JobOffer("id4", "Molim neko f--", "https://www.youtube.com/watch?v=_QgcIfBZmZk", "id1", "Salaš", "entry", "java", list, "CompIme", false ));

    }

    @GetMapping(path = "/id/{id}", produces = "application/json")
    public ResponseEntity<?> getJobOffer(@PathVariable String id) {
        return new ResponseEntity<>(jobOfferService.findByJobOfferId(id), HttpStatus.OK);
    }

    @GetMapping(produces = "application/json")
    public ResponseEntity<?> getAllJobOffers() {
        return new ResponseEntity<>(jobOfferService.findAllJobOffers(), HttpStatus.OK);
    }

    @DeleteMapping(path = "/{id}")
    public ResponseEntity<?> deleteJobOffer(@PathVariable String id) {
        jobOfferService.deleteByJobOfferId(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping()
    public ResponseEntity<?> deleteAllJobOffers() {
        jobOfferService.deleteAll();
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping(consumes = "application/json", produces = "application/json")
    public ResponseEntity<?> saveJobOffer(@RequestBody JobOffer jobOffer) {
        JobOffer tmp = jobOfferService.save(jobOffer);
        if (tmp != null) {
            return new ResponseEntity<>(tmp, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping(consumes = "application/json", produces = "application/json", path = "search/{search}")
    public ResponseEntity<?> getJobOffersBySearch(@PathVariable String search){
        ArrayList<JobOffer> list = jobOfferService.findBySearch(search);
        if(list.size() > 0){
            return new ResponseEntity<>(list, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }

    @GetMapping(consumes = "application/json", produces = "application/json", path = "company/{companyId}")
    public ResponseEntity<?> getJobOffersByCompany(@PathVariable String companyId){
        ArrayList<JobOffer> list = jobOfferService.getByCompanyId(companyId);
        return new ResponseEntity<>(list, HttpStatus.OK);
    }
}
