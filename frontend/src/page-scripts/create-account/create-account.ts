import type { IAuthCreateAccountDetails, IAuthLoginAttemptResponse } from "@terabithia/shared-types"


const SERVERURL = import.meta.env.VITE_SERVER_URL

const signupForm = document.getElementById("signup-form") 
const loginForm = document.getElementById("login-form") 

const signupTabButton = document.getElementById("signup-tab-button")
const loginTabButton = document.getElementById("login-tab-button")

const signupUsernameInputField = document.getElementById("signup-username") as HTMLInputElement
const signupPasswordInputField = document.getElementById("signup-password") as HTMLInputElement
const signupComfirmPasswordInputField = document.getElementById("signup-confirm-password") as HTMLInputElement
const signupButton = document.getElementById("signup-button")

const loginUsernaneInputField = document.getElementById("login-username") as HTMLInputElement
const loginPasswordInputField = document.getElementById("login-password") as HTMLInputElement
const loginButton = document.getElementById("login-button")

signupTabButton.addEventListener("click", () => {
  signupForm.classList.remove("hidden")
  loginForm.classList.add("hidden")
})

loginTabButton.addEventListener("click", () => {
  signupForm.classList.add("hidden")
  loginForm.classList.remove("hidden")
})

loginButton.addEventListener("click", async () => {
  const password = loginPasswordInputField.value
  const username = loginUsernaneInputField.value

  if(!username) {
    alert('username is empty')
  }

  if(!password) {
    alert("password is empty")
  }
 
  const accountDetails: IAuthCreateAccountDetails = {
    username,
    password
  }

  const response = await fetch(`${SERVERURL}/auth/login-account`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(accountDetails)  
  })

  const autResponse: IAuthLoginAttemptResponse = await response.json()
  console.log(autResponse)
  if(!autResponse.success) {
    alert(autResponse.error.reason)
    return
  }
  else if(autResponse.success) {
    sessionStorage.setItem("terabithia:account-details", 
      JSON.stringify({
        token: autResponse.token,
        username: autResponse.username
      })
    ) 
    alert(`welcome back ${autResponse.username}`)
    window.location.href = "/"
  }
})


signupButton.addEventListener("click", async () => {
  const password = signupPasswordInputField.value
  const username = signupUsernameInputField.value

  if(!username) {
    alert('username is empty')
  }

  if(password.length < 6) {
    alert("password must be atleat 6 characthers")
  }

  if(password != signupComfirmPasswordInputField.value) {
    alert("password did not match")
    return
  }


 
  const accountDetails: IAuthCreateAccountDetails = {
    username,
    password
  }

  const response = await fetch(`${SERVERURL}/auth/create-account`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(accountDetails)  
  })

  const autResponse: IAuthLoginAttemptResponse = await response.json()
  console.log(autResponse)
  if(!autResponse.success) {
    alert(autResponse.error.reason)
    return
  }
  else if(autResponse.success) {
    sessionStorage.setItem("terabithia:account-details", 
      JSON.stringify({
        token: autResponse.token,
        username: autResponse.username
      })
    ) 
    console.log("nssj")
    window.location.href = "/"
  }
})
