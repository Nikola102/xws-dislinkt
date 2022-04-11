package dislinkt.userService.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import dislinkt.userService.Model.User;
import dislinkt.userService.Repository.UserRepo;

@RestController
@RequestMapping(path = "/user")
@CrossOrigin(origins = "*")
public class UserController {
    @Autowired
    UserRepo userRepo;

    @GetMapping(value = "/test")
	public ResponseEntity<User> reportProfitYear(){
        if(userRepo == null)
            return null;
        User tmp = new User("asd", "asd");

 

		return new ResponseEntity<User>(userRepo.save(tmp), HttpStatus.OK);
	}


}
