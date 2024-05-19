import { Provider } from 'react-redux';
import store from './store';
import { RouterProvider } from 'react-router-dom';
// import { ToastContainer } from 'react-toastify';
import appRouter from './core/navigation/approuter';
// import 'react-toastify/dist/ReactToastify.css';
// import 'react-loading-skeleton/dist/skeleton.css';

function App() {
    return (
        <Provider store={store}>
            {/*<ToastContainer />*/}
            <RouterProvider router={appRouter} />
        </Provider>
    );
}

export default App;
