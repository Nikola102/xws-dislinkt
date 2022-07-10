package dislinkt.userService.Controller;

import java.util.ArrayList;
import java.util.Map;

import org.springframework.http.MediaType;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import dislinkt.coreService.Event.UserDeleteEvent;
import dislinkt.coreService.Event.UserUpdateEvent;
import dislinkt.userService.Dto.LoginDto;
import dislinkt.userService.Model.User;
import dislinkt.userService.Service.UserService;


@RestController
@RequestMapping(path = "/user")
@CrossOrigin(origins = "*")
public class UserController {
    @Autowired
    UserService userService;

    @Autowired
    private KafkaTemplate<String, String> kafkaTemplate;

    @Autowired
    private KafkaTemplate<String, UserUpdateEvent> userUpdateKafkaTemplate;

    //helper method to reset and fill data to mongo container
    @GetMapping(path = "/mongodbDataReset")
    public void mdb(){
        System.out.println("mongodb.data called from userService controller");
        userService.deleteAllUsers();
        userService.save(new User("id1", "Ivance69", "password", "Ivan", "Lukovic", "ivan@notuns.com", "0600000000", "male", "bio sam jak, vise nisam", false, new ArrayList<String>(), new ArrayList<String>(),new ArrayList<String>(), "", "", "", "", null));
        userService.save(new User("id2", "ZiksaZmija", "password", "Mihajlo", "Zivkovic", "mihajlo@gmail.com", "0600000000", "male", "jak sam", false,  new ArrayList<String>(), new ArrayList<String>(), new ArrayList<String>(),"", "", "", "", null));
        userService.save(new User("id3", "IgorIbor", "password", "Igor", "Jakovljevic", "igor@gmail.com", "0600000000", "male", "jak sam", true,  new ArrayList<String>(), new ArrayList<String>(), new ArrayList<String>(),"", "", "", "", null));
        userService.save(new User("id4", "Buksa", "password", "Vukasin", "Lupurovic", "vukasin@gmail.com", "0600000000", "male", "jak sam", false,  new ArrayList<String>(), new ArrayList<String>(), new ArrayList<String>(),"", "", "", "", null));
        userService.save(new User("id5", "Mnikola", "password", "Nikola", "Matijevic", "nikola@gmail.com", "0600000000", "male", "jak sam", false, new ArrayList<String>(), new ArrayList<String>(), new ArrayList<String>(),"", "", "", "", null));
    }

    //send message
    @GetMapping(path = "/hello")
    public String hello(){
        return "Hello";
    }

    //get all users
    @GetMapping(
        produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> getAllPublicUsers(){
        ArrayList<User> users = userService.getAllPublicUsers();
        if(users.isEmpty())
            return new ResponseEntity<>(HttpStatus.NO_CONTENT); 
        return new ResponseEntity<ArrayList<User>>(userService.getAllPublicUsers(), HttpStatus.OK);
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
    //TODO: SAGA
    @DeleteMapping(path = "/{username}", 
        produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> deleteUser(@PathVariable("username") String username){
        try{

            User user = userService.findByUsername(username);

            //Saga start
            userService.deleteUser(username);
            UserDeleteEvent userDeleteEvent = new UserDeleteEvent();
            userDeleteEvent.setUserId(user.getId());
            kafkaTemplate.send("user_delete", userDeleteEvent.getUserId());
            
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


    @PutMapping(path = "/follow", 
        consumes = MediaType.APPLICATION_JSON_VALUE, 
        produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> follow(@RequestBody Map<String, String> followRequest){
        try{
            return new ResponseEntity<User>(userService.follow(followRequest.get("followerId"), followRequest.get("toFollowId")), HttpStatus.OK);
        } catch (IllegalStateException e){
            return new ResponseEntity<String>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
    //put user
    //TODO: SAGA
    @PutMapping(
        consumes = MediaType.APPLICATION_JSON_VALUE, 
        produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> updateUser(@RequestBody User user){
        try {
            User editedUser = userService.update(user);

            UserUpdateEvent userUpdateEvent = new UserUpdateEvent();
            BeanUtils.copyProperties(editedUser, userUpdateEvent);
            System.out.println(userUpdateEvent.getId());
            userUpdateKafkaTemplate.send("user_update", userUpdateEvent);

            return new ResponseEntity<User>(editedUser, HttpStatus.OK);
        } catch (IllegalStateException e) {
            return new ResponseEntity<String>(e.getMessage(), HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping(path="/generateToken/{userId}",
        consumes=MediaType.APPLICATION_JSON_VALUE,
        produces=MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<?> generateToken(@PathVariable("userId") String userId){
        try{
            return new ResponseEntity<String>(userService.generateAPIToken(userId),HttpStatus.OK);
        } catch(IllegalStateException e){
            return new ResponseEntity<String>(e.getMessage(),HttpStatus.NOT_FOUND);
        }
    }
    @PutMapping(path="/togglePrivacy/{username}",
        consumes=MediaType.APPLICATION_JSON_VALUE,
        produces=MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<?> togglePrivacy(@PathVariable("username") String username){
        try{
            return new ResponseEntity<User>(userService.togglePrivacy(username),HttpStatus.OK);
        } catch(IllegalStateException e){
            return new ResponseEntity<String>(e.getMessage(),HttpStatus.NOT_FOUND);
        }
    }
    @PutMapping(path = "/block", 
        consumes = MediaType.APPLICATION_JSON_VALUE, 
        produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> block(@RequestBody Map<String, String> block){
        try{
            return new ResponseEntity<User>(userService.block(block.get("blockerId"), block.get("blockedId")), HttpStatus.OK);
        } catch (IllegalStateException e){
            return new ResponseEntity<String>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }
 

}
