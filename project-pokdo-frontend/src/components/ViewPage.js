import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Button, CircularProgress, Typography } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  loader: {
    position: "relative",
    marginLeft: "50%",
    marginTop: "20%",
  },
  centeredHorizontal: {
    margin: "auto",
    minWidth: "710px",
    maxWidth: "710px",
    paddingTop: "25px",
  },
  images: {
    objectFit: "cover",
    width: "100%",
    height: "210px",
  },
  editButton: {
    marginTop: "10px",
    marginBottom: "10px",
  },
  infoBlock: {
    fontFamily: "sans-serif",
    marginBottom: "10px"
  }
}));

const apiURL = "http://localhost:8000/api";

export default function ViewPage(props) {
  const classes = useStyles();
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [values, setValues] = useState({
    name: "",
    about: "",
    location: "",
    admissions: "",
    image: null,
  });
  const history = useHistory();

  useEffect(() => {
    fetch(apiURL + "/listing/" + id, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setValues({
          name: data.school_name,
          about: data.about,
          location: data.location,
          admissions: data.admissions,
          image: data.image,
        });
        setLoading(false);
      });
  }, [id]);

  return loading ? (
    <CircularProgress className={classes.loader} />
  ) : (
    <div className={classes.centeredHorizontal}>
      <img src={values.image} className={classes.images} alt=""></img>
      <Button
        variant="contained"
        className={classes.editButton}
        color="primary"
        onClick={() => {
          history.push("/edit/" + id);
        }}
      >
        <EditIcon />
      </Button>
      <Typography gutterBottom style={{ color: "#052470" }} variant="h5">
        {values.name}
      </Typography>

      <div className={classes.infoBlock}>
        <Typography variant="h6">About</Typography>
        <Typography variant="p">{values.about}</Typography>
      </div>
      <div className={classes.infoBlock}>
        <Typography variant="h6">Location</Typography>
        <Typography variant="p">{values.location}</Typography>
      </div>
      <div className={classes.infoBlock}>
        <Typography variant="h6">Admissions</Typography>
        <Typography variant="p">{values.admissions}</Typography>
      </div>
    </div>
  );
}
