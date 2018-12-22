import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Navigation from "../templates/navigation";
import LoginNav from "../templates/loginNav";
import { reduxForm } from "redux-form";
import { Modal, Button } from "react-bootstrap";

import checkAuthorization from "../templates/check-auth";
import history from "../../lib/history";

import loadUser from "../../actions/user";
import loadRunningSearch from "../../actions/runningSearch";

import removeRequest from "../../actions/remove";

import Search from "../../containers/search";

class CarLandingPage extends Component {
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
      this.props.loadRunningSearch();
    }
  }

  render() {
    const { user, runningSearch } = this.props;

    const remove = val => {
      this.props.removeRequest(val);
      this.handleClose();
    };

    return (
      <div id="app-container">
        {user.firstname ? (
          <div>
            <div className="fixed">
              <div className="row navigation">
                <div className="col-md-">
                  <Navigation />
                </div>
                <div className=".col-sm-">
                  <LoginNav />
                </div>
              </div>
            </div>
            <div id="landing" className="row justify-content-md-center">
              <div className="wrapper">
                <div className="App">
                  {/* Heading for Welcome */}
                  <header className="App-header">
                    <div className="row justify-content-md-center">
                      Welcome {user.firstname}
                    </div>
                  </header>

                  {/* Search Container */}
                  <div className="container-1">
                    <Search />
                  </div>

                  {/* Current Searches */}
                  <div className="container-2">
                    <div className="row justify-content-md-center">
                      Current Searches
                    </div>

                    {/* Repeating Results */}
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
                                  <div className="col">
                                    {searchRes.make_name}
                                  </div>
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
                                  <div className="col">
                                    {searchRes.location}
                                  </div>
                                </div>
                              </div>
                              <div className="col-4">
                                <div className="row align-items-center">
                                  <div className="col">
                                    <button
                                      className="btn btn-secondary"
                                      searchid={searchRes.search_id}
                                      onClick={e =>
                                        this.handleShow(
                                          e.target.getAttribute("searchid")
                                        )
                                      }
                                    >
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
  user: PropTypes.object,
  runningSearch: PropTypes.array,
  remove: PropTypes.func,
  removeRequest: PropTypes.func
};

const mapStateToProps = state => ({
  user: state.user.userInfo,
  runningSearch: state.runningSearch.runningSearch
});

function mapDispatchToProps(dispatch) {
  return {
    loadUser: function() {
      return dispatch(loadUser());
    },
    loadRunningSearch: function() {
      return dispatch(loadRunningSearch());
    },
    removeRequest: function(val) {
      return dispatch(removeRequest(val));
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
