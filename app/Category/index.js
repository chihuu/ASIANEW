import Category from "./Category";
import * as actions from "./actions";
import { connect } from "react-redux";
import { getCategory } from "../reducers";

const mapStateToProps = (state, props) => {
  return {
    ...getCategory(state)
  };
};

const mapDispatchToProps = {
  ...actions
};

export default connect(mapStateToProps, mapDispatchToProps)(Category);
