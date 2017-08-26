import Login from "./Login";
import * as actions from "./actions";
import { connect } from "react-redux";
import { getLogin } from "../reducers";

const mapStateToProps = (state, props) => {
  return {
    //...getNav(state),
    ...getLogin(state)
  };
};

const mapDispatchToProps = {
  ...actions
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
