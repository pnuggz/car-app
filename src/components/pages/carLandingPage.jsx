import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Navigation from "../templates/navigation";
import LoginNav from "../templates/loginNav";
import { reduxForm, Field, formValueSelector } from "redux-form";

import checkAuthorization from "../templates/check-auth";
import history from "../../lib/history";

import loadUser from "../../actions/user";
import loadModels from "../../actions/models";
import loadMakes from "../../actions/makes";
import loadLocations from "../../actions/locations";
import loadRunningSearch from "../../actions/runningSearch";

import searchRequest from "../../actions/search";

class CarLandingPage extends Component {
  constructor(props) {
    super(props);
    this.state = { selectedValue: 0 };
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
      this.props.loadRunningSearch();
    }
  }

  render() {
    const {
      handleSubmit,
      user,
      models,
      makes,
      locations,
      runningSearch
    } = this.props;

    return (
      <div className="container">
        {user.firstname ? (
          <div>
            <div className="row justify-content-md-center">
              <div className="col-md-">
                <Navigation />
              </div>
              <div className=".col-sm-">
                <LoginNav />
              </div>
            </div>
            <div id="home" className="row justify-content-md-center">
              <div className="App">
                {/* Heading for Welcome */}
                <header className="App-header">
                  <div className="row justify-content-md-center">
                    Welcome {user.firstname}
                  </div>
                </header>

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
                              {console.log(this.state.selectedValue)}
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
                                {console.log(this.state.selectedValue)}
                                {models != undefined ? (
                                  <React.Fragment>
                                    <option defaultValue value="0" key="0">
                                      Make...
                                    </option>
                                    {this.state.selectedValue != 0 &&
                                    models.filter(
                                      model =>
                                        model.make_id ==
                                        this.state.selectedValue
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
                            <button
                              className="btn btn-secondary"
                              action="submit"
                            >
                              Search
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
                {console.log(this.state)}

                {/* Current Searches */}
                <div className="container">
                  <div className="row justify-content-md-center">
                    Current Searches
                  </div>

                  {/* Repeating Results */}
                  {console.log(runningSearch)}
                  {runningSearch != undefined ? (
                    runningSearch.map(searchRes => (
                      <div
                        className="row justify-content-md-center border"
                        key={searchRes.search_id}
                      >
                        <div className="col">
                          <div className="row align-items-center">
                            <div className="col-4">
                              <div className="row align-items-center">
                                <div className="col">Make</div>
                              </div>
                              <div className="row align-items-center">
                                <div className="col">{searchRes.make_name}</div>
                              </div>
                            </div>
                            <div className="col-4">
                              <div className="row align-items-center">
                                <div className="col">Model</div>
                              </div>
                              <div className="row align-items-center">
                                <div className="col">
                                  {searchRes.model_name}
                                </div>
                              </div>
                            </div>
                            <div className="col-4">
                              <div className="row align-items-center">
                                <div className="col">Status</div>
                              </div>
                              <div className="row align-items-center">
                                <div className="col">
                                  {searchRes.status == 0
                                    ? "Running"
                                    : "Suspended"}
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="row align-items-center">
                            <div className="col-4">
                              <div className="row align-items-center">
                                <div className="col">Price Range</div>
                              </div>
                              <div className="row align-items-center">
                                <div className="col">
                                  ${searchRes.min_price} - $
                                  {searchRes.max_price}
                                </div>
                              </div>
                            </div>
                            <div className="col-4">
                              <div className="row align-items-center">
                                <div className="col">Location</div>
                              </div>
                              <div className="row align-items-center">
                                <div className="col">{searchRes.location}</div>
                              </div>
                            </div>
                            <div className="col-4">
                              <div className="row align-items-center">
                                <div className="col">
                                  <button className="btn btn-secondary">
                                    --
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="row justify-content-md-center border">
                      <div className="col">Loading...</div>
                    </div>
                  )}
                  {/* Repeat Ends Here */}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div />
        )}
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
  runningSearch: PropTypes.array
};

const mapStateToProps = state => ({
  user: state.user.userInfo,
  models: state.models.models,
  makes: state.makes.makes,
  locations: state.locations.locations,
  runningSearch: state.runningSearch.runningSearch,
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
    loadRunningSearch: function() {
      return dispatch(loadRunningSearch());
    }
  };
}

const connected = connect(
  mapStateToProps,
  mapDispatchToProps
)(CarLandingPage);

const formed = reduxForm({
  form: "Search",
  enableReinitialize: true
})(connected);

export default formed;
