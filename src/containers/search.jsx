import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { reduxForm, Field, formValueSelector } from "redux-form";
import { Modal, OverlayTrigger, Button } from "react-bootstrap";

import checkAuthorization from "../templates/check-auth";
import history from "../../lib/history";

import loadUser from "../../actions/user";
import loadModels from "../../actions/models";
import loadMakes from "../../actions/makes";
import loadLocations from "../../actions/locations";

import searchRequest from "../../actions/search";
import removeRequest from "../../actions/remove";

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = { selectedValue: 0 };

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = {
      show: false,
      searchid: null
    };
  }

  handleClose() {
    this.setState({ show: false, searchid: null });
  }

  handleShow(e) {
    this.setState({
      show: true,
      searchid: e
    });
  }

  submit = values => {
    this.props.searchRequest(values);
  };

  componentWillMount() {
    if (checkAuthorization() === false) {
      history.push("/login");
    }

    if (checkAuthorization() === true) {
      this.props.loadUser();
      this.props.loadModels();
      this.props.loadMakes();
      this.props.loadLocations();
    }
  }

  render() {
    const { handleSubmit, user, models, makes, locations } = this.props;

    const remove = val => {
      this.props.removeRequest(val);
      this.handleClose();
    };

    return (
      <div className="container">
        {user.firstname ? (
          <div>
            <div className="search">
              {/* Search Container */}
              <div className="search-form container">
                <div className="row justify-content-md-center">
                  Search Your Dream Car
                </div>
                <form id="Search" onSubmit={handleSubmit(this.submit)}>
                  <div className="row border">
                    <div className="col">
                      <div className="row justify-content-md-center">
                        <div className="col">
                          <div className="dropdown">
                            <Field
                              component="select"
                              className="btn btn-secondary dropdown-toggle"
                              name="selectMake"
                              onChange={event =>
                                this.setState({
                                  selectedValue: event.target.value
                                })
                              }
                              value={this.state.selectedValue}
                            >
                              <option defaultValue value="0">
                                Make...
                              </option>
                              {makes != undefined ? (
                                makes.map(make => (
                                  <option
                                    key={parseInt(make.make_id)}
                                    value={parseInt(make.make_id)}
                                  >
                                    {make.make_name}
                                  </option>
                                ))
                              ) : (
                                <option>Loading....</option>
                              )}
                            </Field>
                          </div>
                        </div>
                        <div className="col">
                          <div className="dropdown">
                            <Field
                              name="selectModel"
                              component="select"
                              className="btn btn-secondary dropdown-toggle"
                              disabled={this.state.selectedValue == 0}
                            >
                              {models != undefined ? (
                                <React.Fragment>
                                  <option defaultValue value="0" key="0">
                                    Make...
                                  </option>
                                  {this.state.selectedValue != 0 &&
                                  models.filter(
                                    model =>
                                      model.make_id == this.state.selectedValue
                                  ).length > 0 ? (
                                    models
                                      .filter(
                                        model =>
                                          model.make_id ==
                                          this.state.selectedValue
                                      )
                                      .map(model => (
                                        <option
                                          key={parseInt(model.model_id)}
                                          value={parseInt(model.model_id)}
                                        >
                                          {model.model_name}
                                        </option>
                                      ))
                                  ) : (
                                    <option> Model...</option>
                                  )}
                                </React.Fragment>
                              ) : (
                                <option>Loading....</option>
                              )}
                            </Field>
                          </div>
                        </div>
                        <div className="col">
                          <div className="dropdown">
                            <Field
                              name="selectLocation"
                              component="select"
                              className="btn btn-secondary dropdown-toggle"
                              placeholder="Select Location"
                            >
                              {locations != undefined ? (
                                locations.map(location => (
                                  <option
                                    key={location.location_id}
                                    value={location.location_id}
                                  >
                                    {location.location}
                                  </option>
                                ))
                              ) : (
                                <option>Loading....</option>
                              )}
                            </Field>
                          </div>
                        </div>
                      </div>
                      <div className="row justify-content-md-center">
                        <div className="col">
                          <Field
                            name="minPrice"
                            component="input"
                            className="min-price form-control col"
                            placeholder="Min Price"
                          />
                        </div>
                        <div className="col">
                          <Field
                            name="maxPrice"
                            component="input"
                            className="max-price form-control col"
                            placeholder="Max Price"
                          />
                        </div>
                        <div className="col">
                          <button className="btn btn-secondary" action="submit">
                            Search
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        ) : (
          <div />
        )}

        <Modal
          show={this.state.show}
          onHide={this.handleClose}
          style={{ opacity: "1" }}
        >
          <Modal.Header closeButton>
            <Modal.Title>Confirm</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>
              Are you sure you want to remove this search? {this.state.searchid}
            </h4>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.handleClose}>Cancel</Button>
            <Button onClick={() => remove(this.state.searchid)}>Confirm</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

CarLandingPage.propTypes = {
  handleSubmit: PropTypes.func,
  searchRequest: PropTypes.func,
  user: PropTypes.object,
  models: PropTypes.array,
  makes: PropTypes.array,
  locations: PropTypes.array,
  remove: PropTypes.func,
  removeRequest: PropTypes.func
};

const mapStateToProps = state => ({
  user: state.user.userInfo,
  models: state.models.models,
  makes: state.makes.makes,
  locations: state.locations.locations,
  search: state.search,
  initialValues: {
    minPrice: 0,
    maxPrice: 100000000
  }
});

function mapDispatchToProps(dispatch) {
  return {
    loadUser: function() {
      return dispatch(loadUser());
    },
    loadModels: function() {
      return dispatch(loadModels());
    },
    loadMakes: function() {
      return dispatch(loadMakes());
    },
    loadLocations: function() {
      return dispatch(loadLocations());
    },
    searchRequest: function(values) {
      return dispatch(searchRequest(values));
    },
    removeRequest: function(val) {
      return dispatch(removeRequest(val));
    }
  };
}

const connected = connect(
  mapStateToProps,
  mapDispatchToProps
)(Search);

const formed = reduxForm({
  form: "Search",
  enableReinitialize: true
})(connected);

export default formed;
