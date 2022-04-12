package dislinkt.userService.Security;

import java.util.function.Predicate;
import java.util.regex.Matcher;
import java.util.regex.Pattern;


import org.springframework.stereotype.Service;

@Service
public class EmailValidator implements Predicate<String>{

    @Override
    public boolean test(String email){
        String regex = "^[\\w-_\\.+]*[\\w-_\\.]\\@([\\w]+\\.)+[\\w]+[\\w]$";
        Pattern pattern = Pattern.compile(regex);
        Matcher matcher = pattern.matcher(email);

        if(matcher.matches()){
            return true;
        }
        return false;
    }
}
