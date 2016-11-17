import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpEntityEnclosingRequestBase;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;


import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;

/**
 * Created by gpettet on 2016-11-10.
 */
@RestController
public class AnalysisController {

    private static final String DISPATCH_URL = "http://localhost:8000/api/delegate";

    @Autowired
    private AlertService alertservice;

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public String index(@PathVariable("id") int id) {

        JSONObject result = alertservice.testForAlert(id);

        if(result == null) {
            return "No alert issued";
        } else {

            //httpGet(buildUrlString());

            // TODO esper test
            alertservice.sendRandomEvents();

            return "Forwarded event " + id + " to dispatch";
        }

    }

    private String buildUrlString(){

        return DISPATCH_URL + "?name=alert1&id=1";

    }

    private  void httpGet(String urlString) {

        CloseableHttpClient httpClient = HttpClientBuilder.create().build();

        try {

            HttpGet request = new HttpGet(urlString);

            CloseableHttpResponse response = httpClient.execute(request);

            System.out.println("\nSending 'GET' request to URL : " + urlString);
            System.out.println("Response Code : " +
                    response.getStatusLine().getStatusCode());

            HttpEntity entity = response.getEntity();

            BufferedReader rd = new BufferedReader(
                    new InputStreamReader(entity.getContent()));

            StringBuffer result = new StringBuffer();
            String line = "";
            while ((line = rd.readLine()) != null) {
                result.append(line);
            }

            EntityUtils.consume(entity);

            System.out.println(result.toString());


        } catch (Exception e ) {
            e.printStackTrace();
        }

    }

    private void httpPostJson(String url, JSONObject json){

        CloseableHttpClient httpClient = HttpClientBuilder.create().build();

        try {
            HttpPost request = new HttpPost(url);
            StringEntity params = new StringEntity(json.toString());

            request.addHeader("content-type", "application/json");
            request.setEntity(params);

            httpClient.execute(request);

            httpClient.close();

            // Response, if any
        } catch (IOException ex) {
            // handle exception here
            ex.printStackTrace();
        }

    }
}
