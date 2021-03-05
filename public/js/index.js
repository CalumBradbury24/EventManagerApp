
//import "@babel/polyfill"; //for older browser compatibility
const logoutButton = document.getElementById('logout');

if(logoutButton){
  logoutButton.addEventListener('click', () => {
    console.log('logout button clicked')
    logout();
  })
}