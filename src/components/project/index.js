import React, { useState, useEffect } from "react";
import { TrixEditor } from "react-trix";
import "trix/dist/trix";
import { makeStyles } from "@material-ui/core/styles";
import ReactChipInput from "react-chip-input";
import ChipInput from "material-ui-chip-input";
import CKEditor from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Axios from "../../helpers/Axios";
import { headers } from "../../helpers/AuthHelpers";
import Snackbar from "../feedback/Snackbar";
import Backdrop from "../feedback/Backdrop";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import CountryList from "react-select-country-list";
import { TextField } from "@material-ui/core";
import { KeyboardDatePicker } from "@material-ui/pickers";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 400,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default () => {
  const classes = useStyles();
  const [tags, setTags] = useState([]);
  const [categories, setCategories] = useState([]);
  const [backdropOpen, setBackdropOpen] = useState(false);
  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const [snackBarMessage, setSnackBarMessage] = useState("");
  const [snackBarSeverity, setSnackBarSeverity] = useState("info");
  const [formData, setFormData] = useState({});
  const countries = CountryList().getData();

  const handleChange = (e) => {
    console.log(e);
    const { name, value } = e.target;
    const _formDataCopy = formData;
    _formDataCopy[name] = value;
    setFormData(_formDataCopy);
    console.log(formData);
  };

  const addChip = (value) => {
    const chips = tags.slice();
    chips.push(value);
    setTags(chips);
    const _formDataCopy = formData;
    _formDataCopy.tags = chips;
    setFormData(_formDataCopy);
    console.log(formData);
  };
  const removeChip = (index) => {
    const chips = tags.slice();
    chips.splice(index, 1);
    setTags(chips);
    const _formDataCopy = formData;
    _formDataCopy.tags = chips;
    setFormData(_formDataCopy);
    console.log(formData);
  };

  const saveProject = (e) => {
    e.preventDefault();
    setBackdropOpen(true);
    setSnackBarSeverity("info");
    setSnackBarMessage("Saving your project");
    setSnackBarOpen(true);
    Axios.post("api/projects", formData, { headers })
      .then((response) => {
        setFormData({});
        setSnackBarSeverity("success");
        setSnackBarMessage("Successfully saved your project");
        setSnackBarOpen(true);
        setBackdropOpen(false);
        HTMLFormElement.reset();
      })
      .catch((error) => {
        console.log(error.response);
        setSnackBarOpen(true);
        setSnackBarSeverity("error");
        setSnackBarMessage("Unable to save your project");
        setBackdropOpen(false);
      });
  };

  const getCategories = () => {
    Axios.get("api/categories", { headers })
      .then((response) => {
        setBackdropOpen(false);
        setCategories(response.data.data);
      })
      .catch((error) => {
        setSnackBarSeverity("error");
        setSnackBarMessage("Unable to load categories");
        setSnackBarOpen(true);
      });
  };

  useEffect(() => {
    setBackdropOpen(true);
    getCategories();
  }, []);

  return (
    <div className="row">
      <div className="col col-xl-3 order-xl-3 col-lg-3 order-lg-2 col-md-3 order-md-1 col-sm-12 col-12">
        <div className="Project-profile">
          <div id="accordion" role="tablist" aria-multiselectable="true">
            <div className="card">
              <div className="card-header" role="tab" id="headingOne">
                <h6 className="mb-0">
                  <a
                    data-toggle="collapse"
                    data-parent="#accordion"
                    href="#collapseOne"
                    aria-expanded="true"
                    aria-controls="collapseOne"
                  >
                    Project Settings
                    <svg className="olymp-dropdown-arrow-icon">
                      <use href="svg-icons/sprites/icons.svg#olymp-dropdown-arrow-icon"></use>
                    </svg>
                  </a>
                </h6>
              </div>

              <div
                id="collapseOne"
                className="collapse show"
                role="tabpanel"
                aria-labelledby="headingOne"
              >
                <ul className="Project-profile-menu">
                  <li>
                    <a href="#" className="active">
                      Create Project
                    </a>
                  </li>
                  <li>
                    <a href="#">My Projects</a>
                  </li>
                  {/* <li>
                                            <a href="#">Sponsor's &amp; Partners</a>
                                        </li> */}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col col-xl-9 order-xl-9 col-lg-9 order-lg-2 col-md-9 order-md-1 col-sm-12 col-12">
        <div className="ui-block">
          <div className="ui-block-title">
            <h6 className="title">Basic Page Information</h6>
          </div>
          <div className="ui-block-content">
            <form onSubmit={saveProject}>
              <div className="row">
                <div className="col col-lg-6 col-md-6 col-sm-12 col-12">
                  <FormControl
                    variant="outlined"
                    className={classes.formControl}
                  >
                    <TextField
                      id="outlined-basic"
                      label="Name"
                      name="name"
                      variant="outlined"
                      onChange={handleChange}
                      required
                    />
                  </FormControl>
                  <div className="form-group ">
                    <FormControl
                      variant="outlined"
                      className={classes.formControl}
                    >
                      <input
                        type="date"
                        name="start_date"
                        required
                        onChange={(e) => handleChange(e)}
                        className="date-input"
                        style={{ height: "55px" }}
                      />
                    </FormControl>
                  </div>
                </div>
                <div className="col col-lg-6 col-md-6 col-sm-12 col-12">
                  <FormControl
                    variant="outlined"
                    className={classes.formControl}
                  >
                    <InputLabel>Country</InputLabel>
                    <Select
                      required
                      value={formData.country}
                      name="country"
                      onChange={handleChange}
                      label="Country"
                    >
                      {countries.map((country, key) => (
                        <MenuItem value={country.value}>
                          {country.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <FormControl
                    variant="outlined"
                    className={classes.formControl}
                  >
                    <InputLabel>Category</InputLabel>
                    <Select
                      value={formData.category_id}
                      name="category_id"
                      onChange={handleChange}
                      required
                      label="Category"
                    >
                      {categories.map((category) => (
                        <MenuItem value={category.value}>
                          {category.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
                <div className="col col-lg-12 col-md-12 col-sm-12 col-12">
                  <div className="form-group">
                    <label className="control-label">
                      Short Summary. (50 - 100 words)
                    </label>
                    <TrixEditor
                      name="short_summary"
                      required
                      className="form-control trixy"
                      onChange={(e) => {
                        handleChange({
                          target: { name: "short_summary", value: e },
                        });
                      }}
                    />
                    <span className="material-input"></span>
                  </div>
                </div>
                <div className="col col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                  <div className="form-group">
                    <label className="control-label">
                      Detailed Description Of Project. (300 - 500 words)
                    </label>
                    <TrixEditor
                      name="description"
                      required
                      className="form-control trixy"
                      onChange={(e) => {
                        handleChange({
                          target: { name: "description", value: e },
                        });
                      }}
                    />
                    <span className="material-input"></span>
                  </div>
                </div>
                <div className="col col-lg-12 col-md-12 col-sm-12 col-12">
                  <div className="form-group">
                    <label className="control-label">
                      Tags. Hit enter when you add a tag
                    </label>
                    <ChipInput
                      fullWidth={true}
                      variant="outlined"
                      value={tags}
                      onAdd={(chip) => addChip(chip)}
                      onDelete={(chip, index) => removeChip(index)}
                    />
                    <span className="material-input"></span>
                  </div>
                </div>

                <div className="col col-lg-6 col-md-6 col-sm-12 col-12">
                  <button
                    type="submit"
                    href="#"
                    className="btn btn-primary btn-lg full-width"
                  >
                    Save all Changes
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Snackbar
        severity={snackBarSeverity}
        open={snackBarOpen}
        setOpen={setSnackBarOpen}
        message={snackBarMessage}
      />
      <Backdrop open={backdropOpen} />
    </div>
  );
};
