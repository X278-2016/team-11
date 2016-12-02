package Data;

import java.sql.Timestamp;

/**
 * Created by gpettet on 2016-11-17.
 */
public class Data {
    private String sensorID;
    //private Timestamp date;
    private double temperature;
    private double pressure;
    private double voltage;

    public Data(String sensorID, double temperature, double pressure, double voltage) {
        this.sensorID = sensorID;
        this.temperature = temperature;
        this.pressure = pressure;
        this.voltage = voltage;
    }



    public double getVoltage() {
        return voltage;
    }

    public void setVoltage(double voltage) {
        this.voltage = voltage;
    }

    public double getPressure() {
        return pressure;
    }

    public void setPressure(double pressure) {
        this.pressure = pressure;
    }

    public String getSensorID() {
        return sensorID;
    }

    public double getTemperature() {
        return temperature;
    }

    public void setSensorID(String sensorID) {
        sensorID = sensorID;
    }

    public void setTemp(double temperature) {
        this.temperature = temperature;
    }

    /*public Timestamp getDate() {
        return date;
    }

    public void setDate(Timestamp date) {
        this.date = date;
    }
*/

}
