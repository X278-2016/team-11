import com.espertech.esper.client.EPServiceProvider;
import com.espertech.esper.client.EPServiceProviderManager;
import com.espertech.esper.client.EPStatement;
import org.json.JSONObject;
import org.springframework.stereotype.Service;

import java.util.Random;

/**
 * Created by gpettet on 2016-11-10.
 */
@Service
public class AlertService {

    private final String TEMP_CHECK_EXPRESSION =
            "select avg(temp) from SensorEvent.win:time(5 sec)";

    EPServiceProvider epService;
    EPStatement tempStatement;

    AvgTempListener avgTempListen;

    private Random generator;

    public AlertService() {
        epService = EPServiceProviderManager.getDefaultProvider();
        tempStatement = epService.getEPAdministrator().createEPL(TEMP_CHECK_EXPRESSION);

        avgTempListen = new AvgTempListener();
        tempStatement.addListener(avgTempListen);

        generator = new Random();
    }

    public void sendRandomEvents() {

        double temp = (double) generator.nextInt(10);

        SensorEvent newEvent = new SensorEvent("1", temp, pressure);

        epService.getEPRuntime().sendEvent(newEvent);

    }


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
