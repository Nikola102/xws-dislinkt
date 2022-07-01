package dislinkt.userService.Service;

import java.util.ArrayList;
import java.util.Random;

import javax.transaction.Transactional;

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
    public User update(User editedUser){
        User existingUser=userRepo.getById(editedUser.getId());
        if(existingUser==null){
            throw new IllegalStateException("User does not exist!");
        }
        else{
            userRepo.delete(existingUser);
            return userRepo.save(editedUser);
        }
    }

    public User findByUsername(String username){
        User user = userRepo.findByUsername(username);
        if(user == null){
            throw new IllegalStateException("User does not exist!");
        }
        return user;
    }
    public User togglePrivacy(String username){
        User existingUser=userRepo.findByUsername(username);
        if(existingUser==null){
            throw new IllegalStateException("User does not exist!");
        }
        else{
            existingUser.setPrivate(!existingUser.isPrivate());
            return userRepo.save(existingUser);
        }
    }

    @Transactional
    public Boolean deleteUser(String username){
        User user = this.findByUsername(username);
        userRepo.delete(user);
        //create UserDeleted Kafka event
        return true;
    }

    public ArrayList<User> getAllPublicUsers(){
        ArrayList<User> users = new ArrayList<User>();
        for (User user : userRepo.findAll()){
            if (!user.isPrivate()){
                users.add(user);
            }
        }
        return users;
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
    public User block(String userBlockingUsername,String userBlockedUsername){
        User userBlocking=userRepo.findByUsername(userBlockingUsername);
        User userBlocked=userRepo.findByUsername(userBlockedUsername);
        if(userBlocking==null){
            throw new IllegalStateException("User who is trying to block does not exist!");
        }
        
        if(userBlocked==null){
            throw new IllegalStateException("User being blocked does not exist!");
        }

        if(userBlocking.getBlocked().contains(userBlockedUsername)){
            throw new IllegalStateException("You already blocked this user!");
        }

        if(userBlocking.getFollowing().contains(userBlockedUsername)){
            userBlocking.getFollowing().remove(userBlockedUsername);
        }

        if(userBlocking.getFollowRequests().contains(userBlockedUsername)){
            userBlocking.getFollowRequests().remove(userBlockedUsername);
        }

        if(userBlocked.getFollowing().contains(userBlockingUsername)){
            userBlocked.getFollowing().remove(userBlockingUsername);
        }

        if(userBlocked.getFollowRequests().contains(userBlockingUsername)){
            userBlocked.getFollowRequests().remove(userBlockingUsername);
        }
        userBlocking.getBlocked().add(userBlockedUsername);
        userRepo.save(userBlocked);
        return userRepo.save(userBlocking);

    }
    
    public String generateAPIToken(String userId) {
        User user = userRepo.getById(userId);

        if (user == null) {
            return null;
        }
        String upperAlphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        String lowerAlphabet = "abcdefghijklmnopqrstuvwxyz";
        String numbers = "0123456789";
        String alphaNumeric = upperAlphabet + lowerAlphabet + numbers;
        StringBuilder sb = new StringBuilder();
        Random random = new Random();
        int length = 48;

        for (int i = 0; i < length; i++) {
            int index = random.nextInt(alphaNumeric.length());
            sb.append(alphaNumeric.charAt(index));
        }
        String token = sb.toString();
        user.setApiToken(token);
        if (userRepo.save(user) != null) {
            return token;
        } else {
            return null;
        }
    }

}
