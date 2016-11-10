package hello;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 * Created by gpettet on 11/4/2016.
 */
@RestController
public class helloController {

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public String index(@PathVariable("id") int id) {
        if(id == 0) {
            return "Greet 0";
        } else if (id == 1) {
            return "Greet 1";
        }else {
            return "eh";
        }
    }

}
