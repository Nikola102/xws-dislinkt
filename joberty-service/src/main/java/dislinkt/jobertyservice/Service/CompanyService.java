package dislinkt.jobertyservice.Service;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import dislinkt.jobertyservice.Model.Company;
import dislinkt.jobertyservice.Repository.CompanyRepo;

@Service
public class CompanyService {
    @Autowired
    private CompanyRepo companyRepo;

    public Company findByName(String name) {
        return companyRepo.findByName(name);
    }

    public Company save(Company company) {
        return companyRepo.save(company);
    }

    public void deleteCompanyById(String companyId) {
        companyRepo.deleteById(companyId);
    }

    public void deleteAllCompanies() {
        companyRepo.deleteAll();
    }

    public ArrayList<Company> findAllCompanies() {
        return (ArrayList<Company>) companyRepo.findAll();
    }

    public Company findByCompanyId(String companyId) {
        return companyRepo.findByCompanyId(companyId);
    }
}
