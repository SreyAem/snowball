
function checkUser(res){
    
    let users = res.data;
    for (let user of users){
        if (user.username === username.value && user.password === password.value){
            login.style.display = "none";
            container.style.display = "flex";
            loadData()
        }
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

        let colorinput = document.getElementById('favcolor').value;
        let store = document.createElement('div');
        store.className = "chat"
        for (message of messages){

            let div = document.createElement('div');
            div.className = "boxleft"
            let p = document.createElement('p');
            p.textContent =  message.text;
            let span = document.createElement('div');
            span.textContent = message.username + ",      " + message.time;
            p.style.fontWeight = message.bold;
            p.style.fontStyle = message.italic;
            p.style.textDecoration = message.underline;

            if (message.username === username.value){
                div.className = "boxright"
                p.style.textAlign = "right"
                span.style.textAlign = "right"
                p.style.backgroundColor = colorinput
            }
            store.appendChild(span)
            div.appendChild(p)
            store.appendChild(div);
            
        }
        chatbox.appendChild(store);
        document.querySelector('#message').reset();

        let  btn =document.getElementById("usermsg");
        btn.style.fontWeight = 'normal';
        btn.style.fontStyle = 'normal';
        btn.style.textDecoration = 'none';
        underlineStyle = "none";
        boldStyle = "normal";
        italicStyle = "normal;"
    }
};

function bold(event) {
    event.preventDefault()
    let  btn =document.getElementById("usermsg") ;
 
    if(btn.style.fontWeight == 'normal'){
        btn.style.fontWeight = 'bold';
        boldStyle = "bold"
    }
    else{
        btn.style.fontWeight = 'normal';
        boldStyle = "normal"
    }
}

function italic(event) {
    event.preventDefault()
    let  btn =document.getElementById("usermsg") ;
  
    if(btn.style.fontStyle == 'normal'){
        btn.style.fontStyle = 'italic';
        italicStyle = "italic"
    }
    else{
        btn.style.fontStyle = 'normal';
        italicStyle = "normal"
    }
}

function underline(event) {
    event.preventDefault()
    let  btn =document.getElementById("usermsg") ;
  
    if(btn.style.textDecoration == 'none'){
        btn.style.textDecoration = 'underline';
        underlineStyle = "underline"
    }
    else{
        btn.style.textDecoration = 'none';
        underlineStyle = "none"
    }
}


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
    let today = new Date();
    let time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    

    let message = {
        username: username.value, 
        text: usermsg.value,
        bold: boldStyle,
        italic: italicStyle,
        underline: underlineStyle,
        time: time,
    }
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

let underlineStyle = "none";
let boldStyle = "normal";
let italicStyle = "normal;";

const btnlogup = document.querySelector('#btnlogup');
btnlogup.addEventListener('click', logupUser);

const save = document.querySelector("#save");
save.addEventListener('click', saveText);

const btnlog = document.querySelector('#btnlog');
btnlog.addEventListener('click', loadUser);

const btnup = document.querySelector('#btnup');
btnup.addEventListener('click', sentUser);

const btnB = document.querySelector("#bold");
btnB.addEventListener('click', bold);

const btnI = document.querySelector('#italic');
btnI.addEventListener('click', italic);

const btnU = document.querySelector('#underline');
btnU.addEventListener('click', underline);

loadData();
