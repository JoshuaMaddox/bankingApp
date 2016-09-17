const BankingApp = React.createClass({

  gitInitialState() {
    return({
      transactions: [],
      transactionType: '',
      debitsTotal: [],
      creditsTotal: [],
      transactionDescriptions: [],
      balance: 0
    })
  },

  //Get the transation amount and add or subtract it from the balance
  _addTransaction(transaction) {
    const { transactions } = this.state;
    this.setState({
      transactions: [...transactions, transaction]
    })
  },

  //Show the new balance, the total debits, the total credits and the description to the user
  // _showTransactions () {
  // },

  //Add a timestap to the transaction
  render() {
    return(
      <div>
        <NewTransationForm />
      </div>
    )  
  }
})

const NewTransationForm = React.createClass({
  
  //Try to get debit or credit as transaction type and add or remove a -minus if needed
  submitForm(event) {
    event.preventDefault()
    let { description, amount, transactionType } = this.refs
    let tempTransactionType = transactionType.value.toLowerCase().replace(/\s/g, '')
    if(tempTransactionType  === 'debit' || tempTransactionType === 'credit') {
      alert('successful')
    } else {
      console.log('Please enter "Debit" or "Credit"')
    }
    let transaction = {
      description: description.value,
      amount: parseFloat(amount.value),
      transactionType: transactionType.value.toLowerCase()
    }
    console.log('I am typeof ', typeof transactionType.value )
    this.props._addTransaction(transaction)
  },

  render() {
    return(
      <div className="container">
        <div className="row">
          <h1>Banking Stuff</h1>
          
        </div>{/* ROW */}
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
              <label htmlFor="transationType">Is this transaction a Debit or Credit?</label>
              <input ref='transactionType' type="text" className='form-control' id='transactionType' required/>
            </div>
            <button   id="debit" value='debit'  className='btn btn-danger' ref='debit'>Submit Transaction</button>
          </form>
        {/* FORM-CONTAINER */}
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