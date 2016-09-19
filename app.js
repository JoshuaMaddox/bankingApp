const BankingApp = React.createClass({
  getInitialState() {
    return({
      transactions: [],
      // transactionType: '',
      debitsTotal: 0,
      creditsTotal: 0,
      // transactionDescriptions: [],
      balance: 0,
      transactionToEdit: [{
        description: '',
        debit: 0,
        credit: 0,
        transactionType: '',
        transactionID: ''
      }]
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
    const { transactions } = this.state
    this.setState({
      transactions: transactions.filter(transaction => transaction.transactionID !== transactionID)
    })
  },


  //Likely need to change this name to match the new functionality to HERE
  _editTransaction(transaction) {
    //rdit to here!!!!
    const { transactions, transactionToEdit } = this.state
    this.setState({
      transactionToEdit: [transaction]
    })
  },
  
  updateTotal(creditsTotal, debitsTotal) {
    console.log('creditsTotal: ', creditsTotal, '\ndebitsTotal: ', debitsTotal)
  },

  //back to here



  render(transaction) {
    const { transactions } = this.state

    let thisThingThrice = this.state.transactionToEdit[0].debit
    let thisThing = (x) => {return x}
    let thisThingAlso = parseFloat(thisThing)
    console.log("----------------------------------------: ", thisThing)//---------------------------------ENDED HERE

    return(
        <div className="container">
          <div className="row">
            <div className="col-sm-4">
              <h3 className="debits">
                <span id='balance' className="balances">Balance:<br />$ {this.state.balance}</span>
                <span id='debitsTotal' className="balances">Total Debits:<br />$ {this.state.debitsTotal}</span>
                <span id='creditsTotal' className="balances">Total Credits:<br />$ {this.state.creditsTotal}</span>
                <p>{thisThing}</p>
              </h3>
            </div>
            <div className="col-sm-8 form-entry">
              <NewTransactionForm  _addTransaction={this._addTransaction} updateTotal={this.updateTotal} />
            </div>
  {/*EDIT MODAL FORM HERE */}
            <div className="modal fade" id="editTransaction"  role="dialog" aria-labelledby="myModalLabel">
              <div className="modal-dialog" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    <h4 className="modal-title" id="myModalLabel">{thisThing}</h4>
                  </div>
                  <div className="modal-body">
                  {/*EDIT MODAL FORM HERE */}
                  <div className="form-container">
                    <form onSubmit={this.submitForm}>
                      <div className="form-group">
                        <label htmlFor="newTransaction">Transaction Description: </label>
                        <input  ref='description' type="text" className='form-control' id='newTrans' required/>
                      </div>
                      <div className="form-group">
                        <label htmlFor="newPrice">{thisThing()}</label>
                        <input defaultValue={thisThing(thisThingThrice)} ref='amount' type="text" min="0" className='form-control' id='newAmount' required/>
                      </div>
                      <div className="form-group">
                        <label htmlFor="transactionType">Is this transaction a Debit or Credit?</label>
                        <input defaultValue={this.state.transactionToEdit[0].transactionType} ref='transactionType' type="text" className='form-control' id='transactionType' required/>
                      </div>
                      {/*<button   id="debit" value='debit'  className='btn btn-danger' ref='debit'>Create New Transaction</button>*/}
                    </form>
                      {/*<button  onClick={() => updateTotal(1,2)} >Test</button>*/}
                  {/* FORM-CONTAINER */}
                  </div>
                  {/*MODAL FORM ENDS HERE */}
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-default" data-dismiss="modal">I Changed My Mind</button>
                    <button type="button" className="btn btn-primary">Update Transaction</button>
                  </div>
                </div>
              </div>
            </div>
  {/*EDIT MODAL FORM HERE */}
            <TransactionsTable transactions={transactions} _removeTransaction={this._removeTransaction} _editTransaction={this._editTransaction}/>
          </div>
        </div> 
    )  
  }
})




//create a popUp modal on load:

// onClick of the edit button, open a modal.

// populate the modal with info from the form

// user upates the information and clicks submit

// update the transacction (filter and replace at the filter point????)


const TransactionsTable = props => {
  //Destructure the transactions object that is 
  //wired via <TransactionsTable transactions={transactions} />
  const { transactions, _removeTransaction, _editTransaction } = props;

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
              <td>{/*transaction gets passed to partent with the whole object*/}
                <button onClick={_editTransaction.bind(null, transaction)} className="btn btn-primary" data-toggle="modal" data-target="#editTransaction">Edit</button>
              </td>
              <td>
                <button onClick={_removeTransaction.bind(null, transaction.transactionID)} className="btn btn-danger">Delete</button>
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
        //Gets passed up to BankingApp to update the state of transactions
        this.props._addTransaction(transaction)
    } else {
      console.log('Please enter "Debit" or "Credit"')
    }
  },


  render() {
    //let {updateTotal} = this.props

    return(
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
              <button   id="debit" value='debit'  className='btn btn-danger' ref='debit'>Create New Transaction</button>
            </form>
              {/*<button  onClick={() => updateTotal(1,2)} >Test</button>*/}
          {/* FORM-CONTAINER */}
          </div>  
    )
  }
})


  


ReactDOM.render (
  <BankingApp />,
  document.getElementById('root')

)