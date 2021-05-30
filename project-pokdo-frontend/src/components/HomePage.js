import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import { makeStyles } from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import CircularProgress from "@material-ui/core/CircularProgress";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

import HeaderBar from "./HeaderBar";

const useStyles = makeStyles((theme) => ({
  newSchoolButton: {
    marginTop: "20px",
    marginLeft: "10px"
  },
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
    minWidth: "710px",
    maxWidth: "710px",
  },
  squareImage: {
    objectFit: "cover",
    width: "210px",
    height: "210px",
  },
  rightAlignButton: {
    display: "flex",
    justifyContent: "flex-end",
    marginTop: "10px",
  },
  admissionsText: {
    marginTop: "120px",
    backgroundColor: "rgb(45, 191, 18)",
    borderRadius: "15px",
    color: "#fff",
    fontWeight: 6,
  },
}));

const apiURL = "http://localhost:8000/api";

export default function HomePage() {
  const classes = useStyles();
  const [loading, setLoading] = useState(true);
  const [listings, setListings] = useState([]);
  const history = useHistory();

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
            id: entry.id,
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

  const truncateText = (text) => {
    if (text.length > 200) {
      return text.substring(0, 200) + "...";
    }
    return text;
  };

  return loading ? (
    <CircularProgress className={classes.loader} />
  ) : (
    <>
      <HeaderBar />
      <div className={classes.centeredHorizontal}>
        <Button variant="contained" color="primary" className={classes.newSchoolButton} onClick={() => {history.push('create/')}}>
          <AddIcon/>
        </Button>
        {listings.map((entry) => (
          <Card className={classes.shopCard} key={entry.id}>
            <Grid container direction="row" spacing={4}>
              <Grid item xs={4}>
                <img
                  src={
                    entry.image
                      ? entry.image
                      : "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/600px-No_image_available.svg.png"
                  }
                  alt=""
                  className={classes.squareImage}
                />
              </Grid>
              <Grid item xs={5}>
                <div>
                  <Typography
                    gutterBottom
                    style={{ color: "#052470" }}
                    variant="h5"
                  >
                    {entry.schoolName}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {truncateText(entry.location)}
                  </Typography>
                  <Typography variant="body2" gutterBottom>
                    {truncateText(entry.about)}
                  </Typography>
                </div>
              </Grid>
              <Grid item xs={3} justify="flex-end">
                <div className={classes.rightAlignButton}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {history.push("view/" + entry.id)}}
                  >
                    View Details
                  </Button>
                </div>
                <Typography
                  variant="body2"
                  align="center"
                  className={classes.admissionsText}
                  gutterBottom
                >
                  Enrolling Now
                </Typography>
              </Grid>
            </Grid>
          </Card>
        ))}
      </div>
    </>
  );
}
