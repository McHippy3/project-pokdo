import { useState, useEffect } from "react";

import { makeStyles } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

const useStyles = makeStyles((theme) => ({
  loader: {
    position: "relative",
    marginLeft: "50%",
    marginTop: "20%",
  },
  shopCard: {
    marginTop: 40,
    marginLeft: 10,
    marginRight: 10,
    padding: 10,
  },
  centeredHorizontal: {
    margin: "auto",
    width: "80%",
  },
  squareImage: {
    objectFit: "cover",
    width: "100px",
    height: "100px"
  }
}));

const apiURL = "http://localhost:8000/api";

export default function HomePage() {
  const classes = useStyles();
  const [loading, setLoading] = useState(true);
  const [listings, setListings] = useState([]);

  useEffect(() => {
    fetch(apiURL + "/listing/", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        let newList = [];
        data.forEach(function (entry) {
          newList.push({
            schoolName: entry.school_name,
            about: entry.about,
            location: entry.location,
            admissions: entry.admissions,
            image: entry.image,
          });
        });
        setListings(newList);
        setLoading(false);
      });
  }, []);

  return loading ? (
    <CircularProgress className={classes.loader} />
  ) : (
    <div className={classes.centeredHorizontal}>
      {listings.map((entry) => (
        <Card className={classes.shopCard}>
          <Grid container direction="row" spacing={4}>
            <Grid item xs={3}>
              <img
                src={entry.image ? entry.image : "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/600px-No_image_available.svg.png"}
                alt=""
                className={classes.squareImage}
              />
            </Grid>
            <Grid item xs={7}>
              <div>
                <Typography gutterBottom variant="subtitle1">
                  {}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Owned: {1}
                </Typography>
              </div>
            </Grid>
            <Grid item xs={2}>
              <Button variant="contained" color="primary" onClick={() => {}}>
                Buy
              </Button>
            </Grid>
          </Grid>
        </Card>
      ))}
    </div>
  );
}
