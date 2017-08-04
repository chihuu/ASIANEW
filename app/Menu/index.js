import Menu from './Menu'
import * as actions from './actions'
import {connect} from 'react-redux'
import {getMenu} from '../reducers'

const mapStateToProps = (state, props)=> {
  return {
    //...getNav(state),
    ...getMenu(state),
  }
}

const mapDispatchToProps = {
  ...actions
}

export default connect(mapStateToProps, mapDispatchToProps)(Menu)
