import UrlShortnerRoot from "./components/url_data_root";
import { Fragment, useEffect } from "react";
import {
  Route,
  BrowserRouter as Router,
  Switch,
  useHistory,
} from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import { BASE_URL } from "./config/config";
import Box from "@mui/material/Box";

const UrlShortnerParam = (props) => {
  var { id } = props.match.params;
  let history = useHistory();

  console.log("Coming from route paramter", props.match.params);

  useEffect(() => {
    getFullUrl();
  }, []);

  const getFullUrl = async () => {
    try {
      var res = await axios.get(`${BASE_URL}${id}`);
      if (res.status >= 200 && res.status < 300) {
        console.log("Get URL from ID =>", res.data);
        var url = res.data["fullUrl"];
        if (!url.match(/^http?:\/\//i) || !url.match(/^https?:\/\//i)) {
          url = "http://" + url;
        }
        window.location.href = url;
      }
    } catch (error) {
      history.push("/404");
    }
  };

  return (
    <Box
      display="flex"
      xs={12}
      height={600}
      alignItems="center"
      justifyContent="center"
    >
      <CircularProgress />
    </Box>
  );
};

const pageNotFound = () => {
  return (
    <div>
      <h1>Page not found!!!</h1>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={UrlShortnerRoot} />
        <Route path="/404" component={pageNotFound} />
        <Route path="/:id" component={UrlShortnerParam} />

        <Route component={pageNotFound} />
      </Switch>
    </Router>
  );
};

export default App;
