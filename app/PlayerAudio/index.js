import PlayerAudio from "./PlayerAudio";
import * as actions from "./actions";
import { connect } from "react-redux";
import { getPlayerAudio } from "../reducers";

const mapStateToProps = (state, props) => {
  return {
    ...getPlayerAudio(state)
  };
};

const mapDispatchToProps = {
  ...actions
};

export default connect(mapStateToProps, mapDispatchToProps)(PlayerAudio);
