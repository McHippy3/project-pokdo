import React, { useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import { Button, TextField, Typography } from "@material-ui/core";

import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  centeredHorizontal: {
    margin: "auto",
    minWidth: "710px",
    maxWidth: "710px",
    paddingTop: "25px",
  },
  textField: {
    width: "100%",
    marginBottom: "10px",
  },
  textBox: {
    width: "100%",
    marginBottom: "10px",
  },
  imageUploader: {
    marginBottom: "10px",
  },
}));

const apiURL = "http://localhost:8000/api";

export default function CreatePage(props) {
  const classes = useStyles();
  const [values, setValues] = useState({
    name: "",
    about: "",
    location: "",
    admissions: "",
    image: null,
  });
  const [imageName, setImageName] = useState("No Image Selected");
  const [error, setError] = useState(false);
  const history = useHistory();

  const handleImage = (event) => {
    let fileExtension = event.target.value.split('.').pop();
    if (!["gif", "jpeg", "jpg", "png"].includes(fileExtension)) {
      return;
    }
    setImageName(event.target.value.replace(/^.*[\\\/]/, ""));
    let newValues = values;
    newValues.image = event.target.files[0];
    setValues(newValues);
  };

  const handleName = (event) => {
    let newValues = values;
    newValues.name = event.target.value;
    setValues(newValues);
  };

  const handleAbout = (event) => {
    let newValues = values;
    newValues.about = event.target.value;
    setValues(newValues);
  };

  const handleLocation = (event) => {
    let newValues = values;
    newValues.location = event.target.value;
    setValues(newValues);
  };

  const handleAdmissions = (event) => {
    let newValues = values;
    newValues.admissions = event.target.value;
    setValues(newValues);
  };

  const handleSubmit = () => {
    if (values.name === "") {
      setError(true);
      return;
    }
    const data = new FormData();
    data.append("school_name", values.name);
    data.append("about", values.about);
    data.append("location", values.location);
    data.append("admissions", values.admissions);
    data.append("image", values.image);

    fetch(apiURL + "/listing/", {
      method: "POST",
      body: data,
    }).then(() => {
      history.push("/");
    });
  };

  return (
    <div className={classes.centeredHorizontal}>
      <Typography gutterBottom style={{ color: "#052470" }} variant="h5">
        Add a School
      </Typography>
      <input
        style={{ display: "none" }}
        id="contained-button-file"
        type="file"
        onChange={handleImage}
      />
      <div className={classes.imageUploader}>
        <label htmlFor="contained-button-file" style={{marginRight: "10px"}}>
          <Button variant="contained" color="default" component="span">
            Upload
          </Button>
        </label>
        {imageName}
      </div>
      <TextField
        error={error ? true : false}
        label="Name"
        name="name"
        className={classes.textField}
        variant="outlined"
        onChange={handleName}
        fullWidth={true}
        required={true}
        helperText={error ? "This field is required" : ""}
      />
      <TextField
        id="outlined-multiline-static"
        label="About:"
        name="about"
        multiline
        className={classes.textBox}
        rows={4}
        variant="outlined"
        onChange={handleAbout}
        fullWidth={true}
      />
      <TextField
        id="outlined-multiline-static"
        label="Location:"
        name="location"
        className={classes.textBox}
        multiline
        rows={4}
        variant="outlined"
        onChange={handleLocation}
        fullWidth={true}
      />
      <TextField
        id="outlined-multiline-static"
        label="Admissions:"
        name="admissions"
        className={classes.textBox}
        multiline
        rows={4}
        variant="outlined"
        onChange={handleAdmissions}
        fullWidth={true}
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        className={classes.button}
        onClick={handleSubmit}
      >
        Submit
      </Button>
    </div>
  );
}
