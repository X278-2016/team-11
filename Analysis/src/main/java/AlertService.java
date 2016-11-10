import org.json.JSONObject;
import org.springframework.stereotype.Service;

/**
 * Created by gpettet on 2016-11-10.
 */
@Service
public class AlertService {

    /**
     * Returns Null if no alert is generated; else it returns the JSON object
     * representing the alert's state
     */
    public JSONObject testForAlert (int i) {

        if (i == 0) {
            return null;
        } else {
            JSONObject json = new JSONObject();
            json.put("AlertType", i);
            return json;
        }

    }


}
