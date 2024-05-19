import { Provider } from 'react-redux';
import store from './store';
import { RouterProvider } from 'react-router-dom';
import appRouter from './core/navigation/approuter';
import { Toaster } from 'sonner';

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={appRouter} />
      <Toaster richColors position="top-right" />
    </Provider>
  );
}

export default App;
