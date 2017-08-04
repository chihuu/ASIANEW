import Home from './Home'
import * as actions from './actions'
import {connect} from 'react-redux'
import {getHome} from '../reducers'

const mapStateToProps = (state, props)=> {
  return {
    ...getHome(state),
  }
}

const mapDispatchToProps = {
  ...actions
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
