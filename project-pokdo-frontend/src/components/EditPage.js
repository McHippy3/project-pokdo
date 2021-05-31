import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import {
  Button,
  CircularProgress,
  TextField,
  Typography,
} from "@material-ui/core";

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

const apiURL = "http://206.189.203.185:8000/api";

export default function EditPage(props) {
  const { id } = useParams();
  const classes = useStyles();
  const [values, setValues] = useState({
    name: "",
    about: "",
    location: "",
    admissions: "",
    image: null,
  });
  const [imageName, setImageName] = useState("No Image Selected");
  const [imageUpdated, setImageUpdated] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
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
        });
        if (data.image) {
          setImageName(data.image.split("/").pop());
        }
        setLoading(false);
      });
  }, [id]);

  const handleImage = (event) => {
    let fileExtension = event.target.value.split(".").pop();
    if (!["gif", "jpeg", "jpg", "png"].includes(fileExtension)) {
      return;
    }
    setImageName(event.target.value.replace(/^.*[\\\/]/, ""));
    setImageUpdated(true);
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
    if (imageUpdated) {
      data.append("image", values.image);
    }

    fetch(apiURL + "/listing/" + id + "/", {
      method: "PATCH",
      body: data,
    }).then(() => {
      history.push("/");
    });
  };

  return loading ? (
    <CircularProgress className={classes.loader} />
  ) : (
    <div className={classes.centeredHorizontal}>
      <Typography gutterBottom style={{ color: "#052470" }} variant="h5">
        Update School
      </Typography>
      <input
        style={{ display: "none" }}
        id="contained-button-file"
        type="file"
        onChange={handleImage}
      />
      <div className={classes.imageUploader}>
        <label htmlFor="contained-button-file" style={{ marginRight: "10px" }}>
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
        defaultValue={values.name}
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
        defaultValue={values.about}
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
        defaultValue={values.location}
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
        defaultValue={values.admissions}
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
