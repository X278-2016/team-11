import com.espertech.esper.client.EventBean;
import com.espertech.esper.client.UpdateListener;

/**
 * Created by gpettet on 2016-11-17.
 */
public class AvgTempListener implements UpdateListener {

    public void update(EventBean[] newEvents, EventBean[] oldEvents){
        EventBean event = newEvents[0];
        System.out.println("avg=" + event.get("avg(temp)"));

        // TODO create new object with the data containing the error
        //      send to dispatch endpoint with json converted data
    }
}
