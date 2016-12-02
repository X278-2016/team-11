package Utils;

import org.apache.http.HttpEntity;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.http.util.EntityUtils;
import org.json.JSONObject;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;

/**
 * Created by gpettet on 2016-12-01.
 */
public class RestUtils {

    public static final String DISPATCH_URL = "http://localhost:8000/api/delegate";


    public static void httpGet(String urlString) {

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

    public static void httpPostJson(String url, JSONObject json){

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
