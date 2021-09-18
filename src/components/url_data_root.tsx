import React, {
  Fragment,
  useState,
  useEffect,
  FormEvent,
  ChangeEvent,
} from "react";
import logo from "./logo.svg";
import UrlShortnerResult from "./url_shortner";
import URLDataList from "./url_data_list";
import axios from "axios";
import TextField from "@mui/material/TextField";
import CardContent from "@mui/material/CardContent";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import { Container } from "@mui/material";
import Grid from "@mui/material/Grid";
import CircularProgress from "@mui/material/CircularProgress";
import { BASE_URL } from "../config/config";
import "./url_data_root.scss";

function UrlShortnerRoot() {
  type UrlData = {
    fullUrl: string | undefined;
    shortUrl: string | undefined;
    visited: string | unknown;
  };

  const [top100URL, setTop100URL] = useState<UrlData[]>([]);
  const [url, setUrl] = useState(null);
  const [topUrlLoader, setTopUrlLoader] = useState<Boolean>(true);
  const [shorteningURL, setShorteningURL] = useState<Boolean>(false);
  const [shortenedURL, setShortenedURL] = useState<UrlData | undefined>();

  const getTop100URL = async () => {
    var res = await axios.get(`${BASE_URL}geturls`);
    setTopUrlLoader(false);
    if (res.status >= 200 && res.status < 300) {
      setTop100URL(res.data["data"]);
      console.log(top100URL);
    }
  };

  useEffect(() => {
    getTop100URL();
  }, []);

  const createURL = async (fullLink: string) => {
    const data = {
      url: fullLink,
    };
    setShorteningURL(true);
    const res = await axios.post(`${BASE_URL}`, data);
    setShorteningURL(false);
    if (res.status >= 200 && res.status < 300) {
      console.log("Create short URL", res.data);
      setShortenedURL(res.data);
    } else {
    }
  };

  const onSubmitShortenUrl = (event: FormEvent) => {
    event.preventDefault();
    createURL(url);
  };

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setUrl(event.target.value);
  };

  return (
    <Fragment>
      <Container fixed>
        <h1>URL Shortner Service</h1>
        <form onSubmit={onSubmitShortenUrl}>
          <Grid container spacing={2}>
            <Grid item xs={10}>
              <TextField
                fullWidth
                label="URL"
                id="fullWidth"
                onChange={onChangeHandler}
              />
            </Grid>
            <Grid item xs={2}>
              <button
                type="submit"
                className="action__btn"
                onClick={onSubmitShortenUrl}
              >
                Shorten
              </button>
            </Grid>
          </Grid>
        </form>

        <UrlShortnerResult
          isLoading={shorteningURL}
          shortenedUrl={shortenedURL}
        />

        {topUrlLoader ? <CircularProgress /> : <span></span>}
        {top100URL.length > 0 ? (
          <URLDataList urls={top100URL} />
        ) : (
          <span></span>
        )}
      </Container>
    </Fragment>
  );
}

export default UrlShortnerRoot;
