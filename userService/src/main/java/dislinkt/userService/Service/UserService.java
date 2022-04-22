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

    public User save(User newUser) {
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


        return userRepo.save(newUser);
    }

    public User findByUsername(String username){
        User user = userRepo.findByUsername(username);
        if(user == null){
            throw new IllegalStateException("User does not exist!");
        }
        return user;
    }

    public Boolean deleteUser(String username){
        User user = this.findByUsername(username);
        userRepo.delete(user);
        return true;
    }

    public ArrayList<User> getAllUsers(){
        return userRepo.findAll();
    }

    public void deleteAllUsers(){
        System.out.println("Deleting all users...");
        userRepo.deleteAll();
        System.out.println("All users deleted!");
    }

    public ArrayList<User> findByUsernameContaining(String usernamePart){
        return userRepo.findByUsernameContaining(usernamePart);
    }

    public User login(String username, String password){
        User user = userRepo.findByUsername(username);
        if(user == null){
            throw new IllegalStateException("User does not exist!");
        }
        if(!user.getPassword().equals(password)){
            throw new IllegalStateException("Password is incorrect!");
        }
        return user;
    }

    public User follow(String followerUsername, String toFollowUsername) {
        User followerUser = userRepo.findByUsername(followerUsername);
        User toFollowUser = userRepo.findByUsername(toFollowUsername);

        if(followerUser == null){
            throw new IllegalStateException("followerUser does not exist!");
        }
        if(toFollowUser == null){
            throw new IllegalStateException("toFollowUser does not exist!");
        }
        System.out.println(followerUser);
        if(followerUser.getFollowing().contains(toFollowUsername)){
            throw new IllegalStateException("You already follow this user!");
        }

        if(toFollowUser.isPrivate()){
            toFollowUser.getFollowRequests().add(followerUsername);
            return userRepo.save(toFollowUser);
        }else{
            followerUser.getFollowing().add(toFollowUsername);
            return userRepo.save(followerUser);
        }
    }
    

}
