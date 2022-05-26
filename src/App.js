import { hot } from "react-hot-loader/root";
import React from "react";
import ReactGA from 'react-ga';
import { Router } from "react-router-dom";
import { createBrowserHistory } from "history";
import { Chart } from "react-chartjs-2";
import { ThemeProvider } from "@material-ui/styles";
import Routes from "Routes";
import { Provider } from "Context";
import { SessionProvider } from "modules/session/context";
import { chartjs } from "helpers";
import theme from "theme";
import Toast from "components/Toast";
import { GA_TRACKING_ID} from "common/constants";
import "assets/scss/index.scss";
import "react-perfect-scrollbar/dist/css/styles.css";

const browserHistory = createBrowserHistory();

Chart.helpers.extend(Chart.elements.Rectangle.prototype, {
  draw: chartjs.draw,
});

ReactGA.initialize(GA_TRACKING_ID);
ReactGA.pageview(window.location.pathname + window.location.search);

browserHistory.listen((location) => {
  window.ga('set', 'page', location.pathname + location.search);
  window.ga('send', 'pageview');
});

const App = () => (
  <Provider>
    <SessionProvider>
      <ThemeProvider theme={ theme }>
        <Router history={ browserHistory }>
          <Routes />
          <Toast />
        </Router>
      </ThemeProvider>
    </SessionProvider>
  </Provider>
);

export default hot(App);
