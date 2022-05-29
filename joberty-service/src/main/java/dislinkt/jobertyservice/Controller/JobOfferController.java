package dislinkt.jobertyservice.Controller;

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

    @GetMapping(path = "/{id}", produces = "application/json")
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
}
