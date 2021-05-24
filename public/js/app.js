
function checkUser(res){
    let users = res.data;
    for (let user of users){
        console.log(username.value)
        if (user.username === username.value && user.password === password.value){
            document.querySelector('.login').style.display = "none";
            document.querySelector('.container').style.display = "flex";
        }
    }
}

function displayText(response){
    let messages = response.data;
    document.querySelector('.chat').remove()
    let chat = document.createElement('div');
    for (message of messages){
        let p = document.createElement('p');
        p.textContent =  message.username + " : " + message.text
        chat.appendChild(p);
    }
    chatbox.appendChild(chat);
    
    
}

function sentUser(event){
    event.preventdefault()
    const nameinput = document.querySelector('#user').value;
    const passwordinput = document.querySelector('#pass').value;
    let user = {username: nameinput, password: passwordinput}

    const url = "http://localhost:5000/users"
    axios
    .post(url,user)
    .then(checkUser)
}

function saveText(event){
    const usermsg = document.querySelector('#usermsg').value;
    let message = {username: username, text: usermsg}

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

let chatbox = document.querySelector('.chatbox');
let username = document.querySelector('#username');
let password = document.querySelector('#password');
let login = document.querySelector('.login')
let container = document.querySelector('.container')

const save = document.querySelector("#save");
save.addEventListener('click', saveText);

// const btnlog = document.querySelector('#btnlog');
// btnlog.addEventListener('click', checkUser);

const btnup = document.querySelector('#logup');
btnup.addEventListener('click', sentUser);

loadUser()
loadData()
