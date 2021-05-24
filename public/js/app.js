
function checkUser(res){
    let users = res.data;
    for (let user of users){
        if (user.username === username.value && user.password === password.value){
            login.style.display = "none";
            container.style.display = "flex";
        }
    }
};

function displayText(response){
    let messages = response.data;
    console.log(messages)
    if (chat !== null){
        chat.remove()
    }
    let store = document.createElement('div');
    store.className = "chat"
    for (message of messages){
        let p = document.createElement('p');
        p.textContent =  message.username + " : " + message.text;
        store.appendChild(p);
    }
    chatbox.appendChild(store);
    
    
};

function sentUser(event){
    event.preventDefault()
    let user = {username: nameinput.value, password: passwordinput.value}

    const url = "http://localhost:5000/users"
    axios
    .post(url,user)
    .then(checkUser)
}

function saveText(event){
    event.preventDefault()
    let message = {username: username.value, text: usermsg.value}
    const url = "http://localhost:5000/messages"
    axios
    .post(url,message)
    .then(displayText)
}

function loadUser(){
    const url = "http://localhost:5000/users"
    axios
    .get(url)
    .then(checkUser)
}

function loadData(){
    const url = "http://localhost:5000/messages"
    axios
    .get(url)
    .then(displayText);
}

let nameinput = document.querySelector('#user');
let passwordinput = document.querySelector('#pass');
let usermsg = document.querySelector('#usermsg');
let chatbox = document.querySelector('.chatbox');
let username = document.querySelector('#username');
let password = document.querySelector('#password');
let login = document.querySelector('.login');
let container = document.querySelector('.container');
let chat = document.querySelector('.chat');

const save = document.querySelector("#save");
save.addEventListener('click', saveText);

const btnlog = document.querySelector('#btnlog');
btnlog.addEventListener('click', loadUser);

const btnup = document.querySelector('#logup');
btnup.addEventListener('click', sentUser);

loadData();
