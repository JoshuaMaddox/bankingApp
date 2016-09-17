const BankingApp = React.createClass({
  getInitialState() {
    return({
      transactions: [],
      transactionType: '',
      debitsTotal: 0,
      creditsTotal: 0,
      // transactionDescriptions: [],
      balance: 0
    })
  },
  
  //Get the transaction amount and add or subtract it from the balance
  _addTransaction(transaction) {
    //Destructure the state objects
    const { transactions, debitsTotal, creditsTotal, balance } = this.state;
    let debitToState = transaction.debit + debitsTotal,
        creditsToState = transaction.credit + creditsTotal,
        balanceToState = creditsToState + debitToState
    this.setState({
      balance: balanceToState,
      creditsTotal: creditsToState,
      debitsTotal: debitToState,
      transactions: [...transactions, transaction]
    })
  },

  _removeTransaction(transactionID) {
    console.log('I am the transaction ID in _removeTransaction: ', transactionID)
    //Destructure the transactions object, gaining access to the
    //individual transactions
    const { transactions } = this.state
    this.setState({
      transactions: transactions.filter(transaction => transaction.transactionID)
    })
  },

  updateTotal(creditsTotal, debitsTotal) {
    console.log('creditsTotal: ', creditsTotal, '\ndebitsTotal: ', debitsTotal)
  },

  //Add a timestap to the transaction
  render() {
    const { transactions } = this.state

    return(
        <div className="container">
          <div className="row">
            <NewTransactionForm  _addTransaction={this._addTransaction} updateTotal={this.updateTotal} />
              <h3 className="debits">
                <span id='debitsTotal' className="balances">Total Debits: {this.state.debitsTotal}</span>
                <span id='creditsTotal' className="balances">Total Credits: {this.state.creditsTotal}</span>
                <span id='balance' className="balances">Balance: {this.state.balance}</span>
              </h3> 
            <TransactionsTable transactions={transactions} _removeTransaction={this._removeTransaction} />
          </div>
        </div> 
    )  
  }
})


const TransactionsTable = props => {
  //Destructure the transactions object that is 
  //wired via <TransactionsTable transactions={transactions} />
  const { transactions, _removeTransaction } = props;

  return (
    <table className="table ">
      <thead>
        <tr>
          <th>DESCRIPTION</th>
          <th>AMOUNT</th>
          <th>TYPE</th>
          <th>DATE</th>
        </tr>
      </thead>
      <tbody>
        {/*Video 22:59*/}
        {transactions.map(transaction => {
          //could just wrap with parenthesis
          return (
            <tr key={transaction.transactionID}>
              <td>{transaction.description}</td>
              <td>{transaction.debit + transaction.credit}</td>
              <td>{transaction.transactionType}</td>
              <td>
                <button onClick={_removeTransaction.bind(null, transaction.transactionID)} className="btn btn-danger">x</button>
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

const NewTransactionForm = React.createClass({
  submitForm(event) {
    event.preventDefault()

    //Gets the refs from the new form entry
    let { description, amount, transactionType } = this.refs
    let isDebit = 0;
    let isCredit = 0;

    //Takes in a string from the transactionType form field forces it to lowercase and 
    //removes any white space the user may have entered 
    let tempTransactionType = transactionType.value.toLowerCase().replace(/\s/g, '')
    if(tempTransactionType  === 'debit' || tempTransactionType === 'credit') {
      alert('successful')
    } else {
      console.log('Please enter "Debit" or "Credit"')
    }

    // Checks to see if the transaction is a debit or a credit and then
    // sets the value of isDebit or isCredit accordingly
    if(tempTransactionType === 'debit') {
       isDebit = -parseFloat(amount.value) 
    } else {
      isCredit = parseFloat(amount.value)
    }

    // Creates a transaction and then passes into the prop _addTransaction
    let transaction = {
      description: description.value,
      debit: isDebit,
      credit: isCredit,
      transactionType: transactionType.value.toLowerCase(),
      transactionID: uuid()
    }
    console.log("I am transaction in the child", transaction)
    //Gets passed up to BankingApp to update the state of transactions
    console.log("I am the props: ", this.props._addTransaction(transaction))
    this.props._addTransaction(transaction)
  },

  render() {
    //let {updateTotal} = this.props

    return(
      <div className="container">
        <div className="row">
          <h1>Banking Stuff</h1> 
          <div className="form-container">
            <form onSubmit={this.submitForm}>
              <div className="form-group">
                <label htmlFor="newTransaction">Transaction Description: </label>
                <input ref='description' type="text" className='form-control' id='newTrans' required/>
              </div>
              <div className="form-group">
                <label htmlFor="newPrice">Transaction Amount:</label>
                <input ref='amount' type="number" className='form-control' id='newAmount' min='0' step='0.01' required/>
              </div>
              <div className="form-group">
                <label htmlFor="transactionType">Is this transaction a Debit or Credit?</label>
                <input ref='transactionType' type="text" className='form-control' id='transactionType' required/>
              </div>
              <button   id="debit" value='debit'  className='btn btn-danger' ref='debit'>Submit Transaction</button>
            </form>
              {/*<button  onClick={() => updateTotal(1,2)} >Test</button>*/}
          {/* FORM-CONTAINER */}
          </div>
        {/* ROW */}
        </div>
      {/* CONTAINER */}
      </div>
    )
  }
})


  


ReactDOM.render (
  <BankingApp />,
  document.getElementById('root')

)