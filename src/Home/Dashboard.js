import React from "react";
import { connect } from "react-redux";
import * as actions from "../reduxStore/actions/index";

function Dashboard() {
  return <div></div>;
}

const mapStateToProps = (state) => {
  return {
    login: state.login,
  };
};

const mapDispatchToProps = (dispatch) => ({
  removeLogin: () => {
    dispatch(actions.removeLogin());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
