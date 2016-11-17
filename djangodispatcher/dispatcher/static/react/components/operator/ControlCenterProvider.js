import { Provider } from 'react-redux'
import store from '../../stores'
import ControlCenter from './ControlCenter'

var root = document.getElementById('operator');

if(root != null && root != undefined){
    ReactDOM.render(<Provider store={store}>
                        <ControlCenter/>
                    </Provider>,root);
}