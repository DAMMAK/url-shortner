import UrlShortnerRoot from "./components/url_data_root";
import { Fragment, useEffect } from "react";
import { Route, BrowserRouter as Router } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import { BASE_URL } from "./config/config";

const UrlShortnerParam = (props) => {
  var { id } = props.match.params;
  console.log("Coming from route paramter", props.match.params);

  useEffect(() => {
    getFullUrl();
  }, []);

  const getFullUrl = async () => {
    var res = await axios.get(`${BASE_URL}${id}`);
    console.log("Response code =>", res.status);

    if (res.status >= 200 && res.status < 300) {
      console.log("Get URL from ID =>", res.data);

      // window.location.replace(res.data["fullUrl"]);
      window.location.href = res.data["fullUrl"];
    }
  };

  return (
    <div>
      <CircularProgress />
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <Route exact path="/" component={UrlShortnerRoot} />
      <Route path="/:id" component={UrlShortnerParam} />
    </Router>
  );
};

export default App;
