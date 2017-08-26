import Register from "./Registger";
import * as actions from "./actions";
import { connect } from "react-redux";
import { getRegister } from "../reducers";

const mapStateToProps = (state, props) => {
  return {
    //...getNav(state),
    ...getRegister(state)
  };
};

const mapDispatchToProps = {
  ...actions
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
