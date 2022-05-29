package dislinkt.jobertyservice.Repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import dislinkt.jobertyservice.Model.Company;

@Repository
public interface CompanyRepo extends MongoRepository<Company, String>{
        
        public Company findByName(String name);
        public Company updateCompany(Company company);
        public void deleteCompany(String companyId);
        public void deleteAllCompanies();
        public Company findByCompanyId(String companyId);
}
    

