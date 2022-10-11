import { Provider } from 'react-redux';
import {
  BrowserRouter as Router
} from 'react-router-dom';
import { NavBar, AppRoutes } from './routes';
import { AlertList } from './components';


export const Root = ({ store }) => (
  <Provider store={store}>
    <Router>
      <header>
        <NavBar />
      </header>
      <main className="container mt-2 mx-auto">
        <AlertList />
        <AppRoutes />
      </main>
    </Router>
  </Provider>
);
