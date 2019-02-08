// @flow
import { createActions } from 'spunky'
// import Neon from '@cityofzion/neon-js'
// import { isEmpty } from 'lodash-es'

// import { toBigNumber } from '../core/math'
// import { getStorage, setStorage } from '../core/storage'
// import { getNode, getRPCEndpoint } from './nodeStorageActions'
// import {
//   findAndReturnTokenInfo,
//   getImageBySymbol,
// } from '../util/findAndReturnTokenInfo'

export const ID = 'pendingActivityCount'

export const returnPendingTxCount = createActions(
  ID,
  ({ pendingTxCount }) => () => pendingTxCount,
)
