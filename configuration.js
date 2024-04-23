const mode = 0;

const host_local = "http://localhost:8080";
const host_remote = "https://flowershop-mattpan09.onrender.com";

function getHost() {
    return (mode == 0) ? host_local : host_remote;
}

function isLoggedIn() {
    if (localStorage.getItem("token")) {
        return true;
    }
    else {
        return false;
    }
}

function getTheToken() {
    return localStorage.getItem("token");
}

function saveTheToken(token) {
    localStorage.setItem("token", token);
    // updateTheNavigationBar();
}

function removeTheToken() {
    localStorage.removeItem("token");
    // updateTheNavigationBar();
}

function saveTheUsername(username) {
    localStorage.setItem("username", JSON.stringify(username));
}

function getTheUsername() {
    return localStorage.getItem("username");
}

function removeTheUsername() {
    localStorage.removeItem("username");
}

//Update the counter in the navigation bar
function saveTheItem(item) {
    localStorage.setItem("item", JSON.stringify(item));
}

function getTheItem() {
    return localStorage.getItem("item");
}

function removeTheItem() {
    localStorage.removeItem("item");
}

function hasItem() {
    if (localStorage.getItem("item")) {
        return true;
    }
    else {
        return false;
    }
}

let configuration = {
    isLoggedIn: () => isLoggedIn(),
    host: () => getHost(),
    token: () => getTheToken(),
    item: () => getTheItem(),
    username: () => getTheUsername(),
};

function saveThePreviousPage(page) {
    localStorage.setItem("previousPage", JSON.stringify(page));
}

function getThePreviousPage() {
    return localStorage.getItem("previousPage");
}




async function login() {
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    let customer = { username: username, password: password };
    let request = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(customer),
    };
    try {
        let response = await fetch(getHost() + "/login", request);
        if (response.status === 200) {
            alert("The login was successful!");
            const token = await response.text();
            saveTheToken(token);
            saveTheUsername(username);
            window.location.href = JSON.parse(getThePreviousPage());
        }
        else {
            console.log(`response status: ${response.status}`);
            removeTheToken();
            alert("Something went wrong!");
        }
    }
    catch(error) {
        console.log(error);
        removeTheToken();
        alert("Something went wrong!");
    }
}

async function logout() {
    if (!isLoggedIn()) {
        alert("You are already logged out!");
        return;
    }


    removeTheToken();
    removeTheUsername();
    alert("You have been logged out!");
    location.href = "index.html";
}