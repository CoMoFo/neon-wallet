// @flow
import React from 'react'
import classNames from 'classnames'
import { intersectionBy } from 'lodash-es'

import Transactions from './Transactions'
import Panel from '../../Panel'
import { pruneConfirmedOrStaleTransaction } from '../../../actions/pendingTransactionActions'
import styles from './TransactionHistoryPanel.scss'

type Props = {
  className: ?string,
  transactions: Array<Object>,
  handleFetchAdditionalTxData: () => any,
  pendingTransactions: Array<Object>,
  address: string,
  dispatch: Dispatch,
}

export default class TransactionHistory extends React.Component<Props> {
  static defaultProps = {
    transactions: [],
    pendingTransactions: [],
  }

  render() {
    const { className, transactions, pendingTransactions } = this.props
    const filteredPendingTransactions = this.pruneConfirmedTransactionsFromPending()
    console.log({
      filteredPendingTransactions,
      transactions,
      pendingTransactions,
    })
    this.pruneReturnedTransactionsFromStorage()
    return (
      <Panel
        className={classNames(styles.transactionHistoryPanel, className)}
        onScroll={this.handleScroll}
      >
        <Transactions
          className={styles.transactions}
          transactions={transactions}
          pendingTransactions={filteredPendingTransactions || []}
        />
      </Panel>
    )
  }

  pruneConfirmedTransactionsFromPending() {
    const { transactions, pendingTransactions } = this.props
    const confirmed = transactions.map(tx => tx.txid)
    return pendingTransactions.reduce((accum, currVal) => {
      if (confirmed.find(tx => tx === currVal.txid)) return accum
      accum.push(currVal)
      return accum
    }, [])
  }

  async pruneReturnedTransactionsFromStorage() {
    const { transactions, pendingTransactions, address, dispatch } = this.props
    const toBePurged = intersectionBy(transactions, pendingTransactions, 'txId')
    console.log({ toBePurged, dispatch })
    // eslint-disable-next-line
    for (const transaction of toBePurged) {
      // eslint-disable-next-line
      await pruneConfirmedOrStaleTransaction(
        address,
        transaction.txid,
        dispatch,
      )
    }
  }

  handleScroll = (e: SyntheticInputEvent<EventTarget>) => {
    const { handleFetchAdditionalTxData } = this.props
    const bottom =
      e.target.scrollHeight - e.target.scrollTop === e.target.clientHeight
    if (bottom) {
      handleFetchAdditionalTxData()
    }
  }
}
