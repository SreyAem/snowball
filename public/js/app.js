
function checkUser(res){
    
    let users = res.data;
    for (let user of users){
        if (user.username === username.value && user.password === password.value){
            login.style.display = "none";
            container.style.display = "flex";
            loadData()
        }
        // else{
        //     document.querySelector('.info').reset();
        // }
    }
    
    
};

function createUser(res){
    
    document.querySelector('#logup').reset();
    logup.style.display = "none";
    login.style.display = "flex";
    
    loadUser();
}

function logupUser(){
    
    login.style.display = 'none';
    logup.style.display = 'block';
}

function displayText(response){
   
    let messages = response.data;
    let chat = document.querySelector('.chat');
    if (messages.length > 0){
       
        if (chat !== null){
            chat.remove()
        }

        let store = document.createElement('div');
        store.className = "chat"
        for (message of messages){
            let p = document.createElement('p');
            p.textContent =  message.username + " : " + message.text;
            if (message.username === username.value){
                p.style.textAlign = "right"
            }
            store.appendChild(p);
        }
        chatbox.appendChild(store);
        document.querySelector('#message').reset();
    }
};

function sentUser(event){
    event.preventDefault()
    if (passwordinput.value === confirmpass.value){
        let user = {username: nameinput.value, password: passwordinput.value, pic: pic.value};

        const url = "http://localhost:5000/users"
        axios
        .post(url,user)
        .then(createUser)
    }
    else{
        alert('Password not the same')
    }
    
}

function saveText(event){
    event.preventDefault()

    let message = {username: username.value, text: usermsg.value}
    const url = "http://localhost:5000/messages"
    axios
    .post(url,message)
    .then(displayText)
}

function loadUserData(){
    
    const url = "http://localhost:5000/users"
    axios
    .get(url)
    .then(createUser)
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

// setInterval(loadData, 1000);

let nameinput = document.querySelector('#user');
let passwordinput = document.querySelector('#pass');
let usermsg = document.querySelector('#usermsg');
let chatbox = document.querySelector('.chatbox');
let username = document.querySelector('#username');
let password = document.querySelector('#password');
let login = document.querySelector('.login');
let container = document.querySelector('.container');
let logup = document.querySelector('.logup');
let confirmpass = document.querySelector('#confirm');
let pic = document.querySelector('#pic');

const btnlogup = document.querySelector('#btnlogup');
btnlogup.addEventListener('click', logupUser);

const save = document.querySelector("#save");
save.addEventListener('click', saveText);

const btnlog = document.querySelector('#btnlog');
btnlog.addEventListener('click', loadUser);

const btnup = document.querySelector('#btnup');
btnup.addEventListener('click', sentUser);

loadData();
