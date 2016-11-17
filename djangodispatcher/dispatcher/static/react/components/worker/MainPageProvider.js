import { Provider } from 'react-redux'
import store from '../../stores'
import MainPage from './MainPage'

var root = document.getElementById('dashboard');

if(root != null && root != undefined){
    ReactDOM.render(<Provider store={store}>
                        <MainPage/>
                    </Provider>,root);
}