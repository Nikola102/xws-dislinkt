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

import dislinkt.jobertyservice.Model.Company;
import dislinkt.jobertyservice.Service.CompanyService;

@RestController
@RequestMapping(path = "/company")
@CrossOrigin(origins = "*")
public class CompanyController {
    @Autowired
    private CompanyService companyService;

    @PostMapping(consumes = "application/json", produces = "application/json")
    public ResponseEntity<?> saveCompany(@RequestBody Company company) {
        Company tmp = companyService.save(company);
        if (tmp != null) {
            return new ResponseEntity<Company>(tmp, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping(path = "/{id}")
    public ResponseEntity<?> deleteCompany(@PathVariable String id) {
        companyService.deleteCompanyById(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping()
    public ResponseEntity<?> deleteAllCompanies() {
        companyService.deleteAllCompanies();
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping(produces = "application/json")
    public ResponseEntity<?> getAllCompanies() {
        return new ResponseEntity<>(companyService.findAllCompanies(), HttpStatus.OK);
    }

    @GetMapping(path = "/{id}", produces = "application/json")
    public ResponseEntity<?> getCompany(@PathVariable String id) {
        return new ResponseEntity<>(companyService.findByCompanyId(id), HttpStatus.OK);
    }

}
