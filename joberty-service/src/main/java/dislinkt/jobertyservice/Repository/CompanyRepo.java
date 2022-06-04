package dislinkt.jobertyservice.Repository;

import java.util.ArrayList;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import dislinkt.jobertyservice.Model.Company;

@Repository
public interface CompanyRepo extends MongoRepository<Company, String>{
        
        public Company findByName(String name);
        public void deleteById(String companyId);
        public void deleteAll();
        public Company getById(String companyId);
        public ArrayList<Company> getByOwnerUsername(String username);
}
    

