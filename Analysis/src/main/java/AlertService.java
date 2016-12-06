import Data.Data;
import Events.*;
import com.espertech.esper.client.EPServiceProvider;
import com.espertech.esper.client.EPServiceProviderManager;
import com.espertech.esper.client.EPStatement;
import com.google.gson.Gson;
import org.json.JSONObject;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

/**
 * Created by gpettet on 2016-11-10.
 */
@Service
public class AlertService {

    EPServiceProvider epService;

    private Random generator;

    public AlertService() {
        epService = EPServiceProviderManager.getDefaultProvider();

        List<String> sensors = new ArrayList<String>();
        for(int i = 0; i < 4; i++) { sensors.add(Integer.toString(i));}

        List<EsperEventListener> listeners = createListeners(sensors);

        for(EsperEventListener listen : listeners) {
            EPStatement statement = epService.getEPAdministrator()
                    .createEPL(listen.getEsperStatement());

            statement.addListener(listen);

        }

        generator = new Random();
    }

    private List<EsperEventListener> createListeners(List<String> sensors) {

        List<EsperEventListener> listeners = new ArrayList<EsperEventListener>();

        for(String sensor : sensors) {
            listeners.add(new HighTempListener(sensor));
            listeners.add(new HighPressureListener(sensor));
            listeners.add(new HighVoltageListener(sensor));
            listeners.add(new LowPressureListener(sensor));
            listeners.add(new LowVoltageListener(sensor));
            listeners.add(new TempChangeListener(sensor));
        }

        return listeners;
    }

    public void sendRandomEvents() {

        double temp = (double) generator.nextInt(100);
        double pressure = (double) generator.nextInt(20);
        double voltage = (double)generator.nextInt(10);

        Data newEvent = new Data("1", temp, pressure, voltage);

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

    public void sendTestAlert(int i) {

        if(i == 0) {
            return;
        }

        String sensorID = "1";
        double defaultTemp = 70;
        double defaultPressure = 10;
        double defaultVoltage = 5;

        Data event;

        // Normal Temp
        if(i == 1) {
            event = new Data(sensorID, defaultTemp, defaultPressure, defaultVoltage);

        // High Temp
        } else if(i == 2){
            event = new Data(sensorID, 90, defaultPressure, defaultVoltage);

        // Low Pressure
        } else if (i == 3) {
            event = new Data(sensorID, defaultTemp, defaultPressure, 2);

        // Temp delta
        } else if (i == 4) {
            event = new Data(sensorID, 70, defaultPressure, defaultVoltage);
            Data event2 = new Data(sensorID, 10, defaultPressure, defaultVoltage);

            String jsonString = new Gson().toJson(event);
            String jsonString2 = new Gson().toJson(event2);

            System.out.println(jsonString);
            System.out.println(jsonString2);

            try {
                Thread.sleep(4000);
            } catch (InterruptedException e){
                e.printStackTrace();
            }

            epService.getEPRuntime().sendEvent(event);
            epService.getEPRuntime().sendEvent(event2);

            return;

        } else {
            event = null;
            System.out.println("invalid input at endpoint");
        }

        String jsonString = new Gson().toJson(event);
        System.out.println(jsonString);

        try {
            Thread.sleep(4000);
        } catch (InterruptedException e){
            e.printStackTrace();
        }

        epService.getEPRuntime().sendEvent(event);

    }


}
