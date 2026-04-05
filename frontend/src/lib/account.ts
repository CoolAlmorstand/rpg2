




//get the stored account detaisl on session storage
export function getLocalAccountDetails() {
  const accountDetails = sessionStorage.getItem("terabithia:account-details")
  if(!accountDetails) {
    return null
  } else {
    return JSON.parse(accountDetails)
  }
}
