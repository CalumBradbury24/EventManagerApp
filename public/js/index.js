
//logout 
const logoutButton = document.getElementById('logout');
if (logoutButton) {
    logoutButton.addEventListener('click', () => {
        console.log('logout button clicked')
        logout();
    })
}

if (window.location.href === 'http://localhost:5000/home') {
    //When the user clicks on the button, toggle between hiding and showing the dropdown content 
    const dropdownButton = document.querySelector('.dropdown-button');
    dropdownButton.addEventListener('click', () => {
        document.querySelector(".dropdown-content ").classList.toggle("show");
    })

    // Close the dropdown menu if the user clicks outside of it
    window.onclick = function (event) {
        if (!event.target.matches('.dropdown-button')) {
            let dropdowns = document.getElementsByClassName("dropdown-content");
            let i;
            for (i = 0; i < dropdowns.length; i++) {
                let openDropdown = dropdowns[i];
                if (openDropdown.classList.contains('show')) {
                    openDropdown.classList.remove('show');
                }
            }
        }
    }
}
