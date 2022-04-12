package dislinkt.userService.Controller;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import dislinkt.userService.Model.User;
import dislinkt.userService.Repository.UserRepo;
import dislinkt.userService.Service.UserService;

@RestController
@RequestMapping(path = "/users")
@CrossOrigin(origins = "*")
public class UserController {
    @Autowired
    UserService userService;

    @GetMapping
    public ResponseEntity<ArrayList<User>> getAllUsers(){
        return new ResponseEntity<ArrayList<User>>(userService.getAllUsers(), HttpStatus.OK);
    }

    @PostMapping("/register")
    public void register(@RequestBody User newUser){
        userService.register(newUser);
    }
}
