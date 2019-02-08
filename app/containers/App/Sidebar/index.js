// @flow
import { compose } from 'recompose'
import { get } from 'lodash-es'
import { withData } from 'spunky'
import { withRouter } from 'react-router-dom'

import Sidebar from './Sidebar'
import { returnPendingTxCount } from '../../../actions/pendingActivityActions'

const mapPendingTransactionsDataToProps = count => ({
  pendingTransactionsCount: count,
})

export default compose(
  withRouter, // allow `NavLink` components to re-render when the window location changes
  withData(returnPendingTxCount, mapPendingTransactionsDataToProps),
)(Sidebar)
