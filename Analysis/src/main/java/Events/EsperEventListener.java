package Events;

import com.espertech.esper.client.UpdateListener;

/**
 * Created by gpettet on 2016-12-01.
 */
public interface EsperEventListener extends UpdateListener {

    public String getEsperStatement();

}
