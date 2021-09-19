import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/Delete";
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
import CircularProgress from "@mui/material/CircularProgress";
import { BASE_URL } from "../config/config";
import Button from "@mui/material/Button";
import { Grid } from "@mui/material";
import { Link } from "react-router-dom";

const UrlShortnerResult = (props) => {
  const { isLoading, shortenedUrl } = props;
  console.log("Props Data", { isLoading, shortenedUrl });

  return (
    <div>
      {isLoading ? (
        <Box
          display="flex"
          xs={10}
          height={80}
          alignItems="center"
          justifyContent="center"
        >
          <CircularProgress />
        </Box>
      ) : (
        <></>
      )}
      {isLoading != null && !isLoading && shortenedUrl !== undefined ? (
        <Box sx={{ minWidth: 275, paddingTop: 2, marginBottom: 10 }}>
          <Card variant="outlined">
            <CardContent>
              <Grid container>
                <Grid item xs={8}>
                  <span>{shortenedUrl.fullUrl}</span>
                </Grid>
                <Grid item xs={4}>
                  <Link
                    to={`/${shortenedUrl.shortUrl}`}
                  >{`${BASE_URL}${shortenedUrl.shortUrl}`}</Link>
                  <Button
                    variant="outlined"
                    style={{ marginLeft: 10 }}
                    onClick={() =>
                      copyTextToClipboard(BASE_URL + shortenedUrl.shortUrl)
                    }
                  >
                    Copy
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Box>
      ) : (
        <></>
      )}
    </div>
  );
};

export default UrlShortnerResult;

export async function copyTextToClipboard(text) {
  if ("clipboard" in navigator) {
    return await navigator.clipboard.writeText(text);
  } else {
    // for older browser
    return document.execCommand("copy", true, text);
  }
}
