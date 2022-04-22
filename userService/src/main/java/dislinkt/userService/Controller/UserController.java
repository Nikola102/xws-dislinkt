package dislinkt.userService.Controller;

import java.util.ArrayList;

import org.springframework.http.MediaType;
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

import dislinkt.userService.Dto.LoginDto;
import dislinkt.userService.Model.User;
import dislinkt.userService.Service.UserService;
import org.springframework.web.bind.annotation.PutMapping;


@RestController
@RequestMapping(path = "/user")
@CrossOrigin(origins = "*")
public class UserController {
    @Autowired
    UserService userService;

    //helper method to reset and fill data to mongo container
    @GetMapping(path = "/mongodbDataReset")
    public void mdb(){
        System.out.println("mongodb.data called from userService controller");
        userService.deleteAllUsers();
        userService.save(new User("id1", "Ivance69", "password", "Ivan", "Lukovic", "ivan@notuns.com", "0600000000", "male", "bio sam jak, vise nisam", false, null, "", "", "", ""));
        userService.save(new User("id2", "ZiksaZmija", "password", "Mihajlo", "Zivkovic", "mihajlo@gmail.com", "0600000000", "male", "jak sam", false,  null, "", "", "", ""));
        userService.save(new User("id3", "IgorIbor", "password", "Igor", "Jakovljevic", "igor@gmail.com", "0600000000", "male", "jak sam", false,  null, "", "", "", ""));
        userService.save(new User("id4", "Buksa", "password", "Vukasin", "Lupurovic", "vukasin@gmail.com", "0600000000", "male", "jak sam", false,  null, "", "", "", ""));
        userService.save(new User("id5", "Mnikola", "password", "Nikola", "Matijevic", "nikola@gmail.com", "0600000000", "male", "jak sam", false, null, "", "", "", ""));
    }

    //send message
    @GetMapping(path = "/hello")
    public String hello(){
        return "Hello";
    }

    //get all users
    @GetMapping(
        produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getAllUsers(){
        ArrayList<User> users = userService.getAllUsers();
        if(users.isEmpty())
            return new ResponseEntity<>(HttpStatus.NO_CONTENT); 
        return new ResponseEntity<ArrayList<User>>(userService.getAllUsers(), HttpStatus.OK);
    }

    //post new user and saves user
    @PostMapping(
        consumes = MediaType.APPLICATION_JSON_VALUE, 
        produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> register(@RequestBody User newUser){
        try {
            return new ResponseEntity<User>(userService.save(newUser), HttpStatus.CREATED);
        } catch (IllegalStateException e) {
            return new ResponseEntity<String>(e.getMessage(), HttpStatus.CONFLICT);	
        }
    }

    //get user by username
    @GetMapping(path = "/{username}", 
        produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getUser(@PathVariable("username") String username){
        try{
            return new ResponseEntity<User>(userService.findByUsername(username), HttpStatus.OK);
        } catch (IllegalStateException e) {
            return new ResponseEntity<String>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

    //delete user by username
    @DeleteMapping(path = "/{username}", 
        produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> deleteUser(@PathVariable("username") String username){
        try{
            userService.deleteUser(username);
        } catch (IllegalStateException e) {
            return new ResponseEntity<String>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<String>("User deleted", HttpStatus.OK);
    }

    @GetMapping(path = "/search/{username}", 
        produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> searchForUsername(@PathVariable("username") String username){
       ArrayList<User> users = userService.findByUsernameContaining(username);
        if(users.isEmpty())
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        return new ResponseEntity<ArrayList<User>>(users, HttpStatus.OK);
    }


    @PostMapping(path = "/login", 
        consumes = MediaType.APPLICATION_JSON_VALUE, 
        produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> login(@RequestBody LoginDto loginDto){
        try{
            return new ResponseEntity<User>(userService.login(loginDto.getUsername(), loginDto.getPassword()), HttpStatus.OK);
        } catch (IllegalStateException e) {
            return new ResponseEntity<String>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

    //put user
    @PutMapping(
        consumes = MediaType.APPLICATION_JSON_VALUE, 
        produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> updateUser(@RequestBody User user){
        try {
            return new ResponseEntity<User>(userService.save(user), HttpStatus.OK);
        } catch (IllegalStateException e) {
            return new ResponseEntity<String>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

 

}
