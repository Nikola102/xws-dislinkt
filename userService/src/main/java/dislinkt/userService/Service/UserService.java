package dislinkt.userService.Service;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import dislinkt.userService.Model.User;
import dislinkt.userService.Repository.UserRepo;
import dislinkt.userService.Security.EmailValidator;
import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class UserService {
    @Autowired
    private UserRepo userRepo;

    private EmailValidator emailValidator = new EmailValidator();

    public void register(User newUser) {
        boolean isValidEmail = emailValidator.test(newUser.getEmail());

        if(!isValidEmail){
            throw new IllegalStateException("Email is not valid!");
        }

        boolean userExists = userRepo.findByEmail(newUser.getEmail()) != null;
        if(userExists){
            throw new IllegalStateException("Email already taken!");
        }
        userExists = userRepo.findByUsername(newUser.getUsername()) != null;
        if(userExists){
            throw new IllegalStateException("Username already taken!");
        }


        userRepo.save(newUser);
    }

    public ArrayList<User> getAllUsers(){
        return userRepo.findAll();
    }
    
}
