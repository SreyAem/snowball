
function displayText(response){
    let messages = response.data;
    let chatbox = document.querySelector('.chatbox');
    document.querySelector('.chat').remove()
    let chat = document.createElement('div');
    for (message of messages){
        let p = document.createElement('p');
        p.textContent =  message.username + " : " + message.text
        chat.appendChild(p);
    }
    chatbox.appendChild(chat);
    
    
}


function saveText(event){
    const usermsg = document.querySelector('#usermsg').value;
    let message = {username: "A", text: usermsg}

    const url = "http://localhost:5000/messages"
    axios
    .post(url,message)
    .then(displayText)
}

// function loadUser(){
//     const url = "http://192.168.2.30:5000/users"
//     axios
//         .get(url)
//         .then(displayText)
// }

function loadData(){
    const url = "http://localhost:5000/messages"
    axios
    .get(url)
    .then(displayText);
}

const save = document.querySelector("#save");
save.addEventListener('click', saveText);


loadData()
// loadUser()