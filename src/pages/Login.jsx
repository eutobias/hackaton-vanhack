// Libs
import React from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'

// Component
class Login extends React.Component {

  constructor(props) {
    super(props)
    this.bindEnterToSubmitForm = this.bindEnterToSubmitForm.bind(this)
    this.state = { redirect: false }
  }

  componentDidMount() {
    if (document) {
      document.querySelector('body').addEventListener("keypress", this.bindEnterToSubmitForm);
    }
  }

  componentWillUnmount() {
    if (document) {
      document.querySelector('body').removeEventListener("keypress", this.bindEnterToSubmitForm)
    }
  }

  bindEnterToSubmitForm(e) {
    if (e.keyCode === 13) {
      this.submitForm()
    }
  }

  getInputValue(id) {
    if (!document)
      return

    return document.getElementById(id).value
  }

  submitForm(e) {
    console.log("login form submited")

    let email = this.getInputValue('input-email')
    let password = this.getInputValue('input-password')

    if (!email || !password) {
      alert("Please fill the fields")
      return
    }

    //That's the only way to not have a error 400 reponse, i did not have time do figure out why
    axios.post(`//api-vanhack-event-sp.azurewebsites.net/api/v1/Customer/auth?email=${email}&password=${password}`)
      .then((response) => {
        if (response.status === 200) {
          console.log('sucessfully logged in')
          this.props.customerLogin(true, response.data)
          this.setState({redirect:true})
        }
        else {
          console.log('invalid credentials')          
          alert("Your login or password is not correct, please check the fields and try again.")
        }
      })
      .catch((error) => {
        console.log('server error ', error)
        if (error)
          alert("Ops... something wrong happen with the server, please wait some minutes and try again please.")
      });
  }

  render() {
    if (this.state.redirect)
      return <Redirect to='/' />;
    else
      return (
        <div className="login-wrapper">
          <h3>Login</h3>

          <div className="form-wrapper">
            <div className="form-field">
              <label htmlFor="input-email">Email</label>
              <input id="input-email" />
            </div>
            <div className="form-field">
              <label htmlFor="input-login">Password</label>
              <input id="input-password" type="password" />
            </div>
            <div className="form-button">
              <button id="submit-button" onClick={this.submitForm.bind(this)}>Submit</button>
            </div>
          </div>

        </div>
      );
  }
};

export default Login;
