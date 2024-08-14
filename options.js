var $ = function(id) {
    return document.getElementById(id);
},

show_message = function(message, hide_in_seconds) {
    $('message').innerHTML = message;
    if (hide_in_seconds) {
        setTimeout(function() {
            $('message').innerHTML = '&nbsp;';
        }, hide_in_seconds * 1000);
    }
},

validate = async function() {
    const {userkey, token} = await chrome.storage.local.get(['userkey', 'token']);

    if (!userkey || !token) {
        show_message('Please fill both fields!');
        return;
    }

    var url = 'https://api.telegram.org/bot' + token + '/sendMessage';
    url += '?chat_id=' + encodeURIComponent(userkey);
    url += '&text=' + encodeURIComponent('"Send to Telegram" configured successfully!');

    fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(async (response) => {
        if (!response.ok) {
            throw new Error("Wrong API Token or User ID.");
        } else {
            await chrome.storage.local.set({'valid': token + userkey});
            show_message('"Send to Telegram" configured successfully!');
        }
    })
    .catch((error) => {
        console.error(`Fetch Error: ${error}`);
        alert(error);
        show_message(error);
    });
},

save = async function() {
    await chrome.storage.local.set({'userkey': $('userkey').value});
    await chrome.storage.local.set({'token': $('token').value});
    show_message('Saved!');

    validate();
},

load = async function() {
    const {userkey, token} = await chrome.storage.local.get(['userkey', 'token']);
    $('token').value = token || '';
    $('userkey').value = userkey || '';
};

$('save').addEventListener('click', save);
window.addEventListener("load", load);