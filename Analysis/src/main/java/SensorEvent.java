/**
 * Created by gpettet on 2016-11-17.
 */
public class SensorEvent {
    private String SensorID;
    private double temperature;
    private double pressure;

    public SensorEvent(String sensorID, double temperature, double pressure) {
        SensorID = sensorID;
        this.temperature = temperature;

    }

    public double getPressure() {
        return pressure;
    }

    public void setPressure(double pressure) {
        this.pressure = pressure;
    }

    public String getSensorID() {
        return SensorID;
    }

    public double getTemperature() {
        return temperature;
    }

    public void setSensorID(String sensorID) {
        SensorID = sensorID;
    }

    public void setTemp(double temperature) {
        this.temperature = temperature;
    }




}
