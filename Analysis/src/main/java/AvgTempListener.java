import com.espertech.esper.client.EventBean;
import com.espertech.esper.client.UpdateListener;

/**
 * Created by gpettet on 2016-11-17.
 */
public class AvgTempListener implements UpdateListener {

    public void update(EventBean[] newEvents, EventBean[] oldEvents){
        EventBean event = newEvents[0];

        if(event.get("avg(temperature)") != null) {

            double avgTemp = (Double) event.get("avg(temperature)");

            System.out.println("avg=" + avgTemp);

            if (avgTemp > 5) {
                System.out.println("\tError: high temp");
            }
        }

        // TODO create new object with the data containing the error
        //      send to dispatch endpoint with json converted data
    }
}
