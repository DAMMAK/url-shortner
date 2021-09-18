import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import DeleteIcon from "@mui/icons-material/Delete";
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
import CircularProgress from "@mui/material/CircularProgress";

const UrlShortnerResult = (props) => {
  const { isLoading, shortenedUrl } = props;
  console.log("LOading state", isLoading);

  return (
    <div>
      {isLoading === true ? (
        <CircularProgress />
      ) : (
        <Box sx={{ minWidth: 275, paddingTop: 2, marginBottom: 10 }}>
          <Card variant="outlined">
            <CardContent>
              <Link href="#" underline="hover">
                {/* https://localhost:5000/mtPg8cJ5 */}
                {shortenedUrl !== undefined
                  ? shortenedUrl.shortUrl
                  : "loading state"}
              </Link>
            </CardContent>
          </Card>
        </Box>
      )}
    </div>
  );
};

export default UrlShortnerResult;
