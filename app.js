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

  // // TYRING to get balance
  // updateBalance(transaction) {
    
  //   // let newBalance = this.debitsTotal
  //   // newBalance += this.transaction.debit
  //   // this.setState({
  //   //   this.debitsTotal += 
  //   // })
  // },
  

  //Get the transaction amount and add or subtract it from the balance
  _addTransaction(transaction) {
    //Destructure the state objects
    const { transactions, debitsTotal, creditsTotal, balance } = this.state;
    let debitToState = transaction.debit + debitsTotal
    this.setState({
      debitsTotal: debitToState,
      transactions: [...transactions, transaction]
    })
  },

  updateTotal(creditsTotal, debitsTotal) {
    console.log('creditsTotal: ', creditsTotal, '\ndebitsTotal: ', debitsTotal)
  },

  //Add a timestap to the transaction
  render() {
    return(
      <div>
        <div className="container">
          <h3 className="debits">
            <span className="debitsTotal">Your Total Debits: {this.state.debitsTotal}</span>
          </h3>
        </div>
        <NewTransactionForm  _addTransaction={this._addTransaction} updateTotal={this.updateTotal} />
      </div>
    )  
  }
})

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
      transactionType: transactionType.value.toLowerCase()
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
              <label htmlFor="transactionType">Is this transaction a Debit or Credit?</label>
              <input ref='transactionType' type="text" className='form-control' id='transactionType' required/>
            </div>
            <button   id="debit" value='debit'  className='btn btn-danger' ref='debit'>Submit Transaction</button>
          </form>
            {/*<button  onClick={() => updateTotal(1,2)} >Test</button>*/}
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