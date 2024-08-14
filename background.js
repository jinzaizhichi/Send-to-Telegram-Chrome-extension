var open_options = function() {
    if (chrome.runtime.openOptionsPage) {
        return chrome.runtime.openOptionsPage();
    }
    return chrome.tabs.create({
        url: chrome.runtime.getURL('options.html')
    });
},

combo_valid = async function() {
    const {valid, token, userkey} = await chrome.storage.local.get(['valid', 'token', 'userkey']);

    if (!valid || valid !== token + userkey) {
        open_options();
        return false;
    }
    return true;
},

show_badge_text = function(color, text, timeout){
    chrome.action.setBadgeBackgroundColor({
        'color': color
    });
    chrome.action.setBadgeText({
        'text': text
    });
    setTimeout(function() {
        chrome.action.setBadgeText({
            'text': ''
        });
    }, timeout * 1000);
},

push_message = async function(source, tab, selection, device) {
    if (!combo_valid()) {
        return false;
    }

    if (selection) {
        var text = encodeURIComponent(selection.substring(0, 512));
    } else {
        var text = encodeURIComponent(tab.url.substring(0, 500));
    }

    const {userkey, token} = await chrome.storage.local.get(['userkey', 'token']);
    var url = 'https://api.telegram.org/bot' + token + '/sendMessage';
    url += '?chat_id=' + encodeURIComponent(userkey);
    url += '&text=' + text;
    url += encodeURIComponent('\n\nFrom: \n' + tab.title + '\n' + tab.url)

    fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then((response) => {
        if (!response.ok) {
            throw new Error("Network response was not ok.");
        } else {
            show_badge_text('#006400', '✓', 2);
        }
    })
    .catch((error) => {
        console.error(`Fetch Error: ${error}`);
        alert('Error: ' + error);
        show_badge_text('#ff0000', '✗', 2);
    });
    
    return false;
},

setup_context_menus = function() {
    var devices = ['Telegram Bot'],
        ctxs = ['page', 'link', 'image', 'selection'];
    chrome.contextMenus.removeAll();
    if (devices.length) {
        for(var j = 0; j < ctxs.length; j++) {
            for (var i = 0; i < devices.length; i++) {
                chrome.contextMenus.create({
                    'title': 'Push this ' + ctxs[j] + ' to ' + devices[i],
                    'contexts': [ctxs[j]],
                    'id': 'ctx:' + ctxs[j] + ':' + devices[i]
                });
            }
        }
    }
};

chrome.action.onClicked.addListener(function(tab) {
    chrome.tabs.sendMessage(tab.id, {
        method: 'selection'
    }, function(text) {
        push_message('badge', tab, text);
    });
});

chrome.runtime.onMessage.addListener(function(request) {
    if (request && request.action == "reload-contextmenus") {
        setup_context_menus();
    }
});

chrome.contextMenus.onClicked.addListener(function(info, tab) {
    var devices = ['Telegram Bot'];
    if (devices.length) {
        for (var i = 0; i < devices.length; i++) {
            if (info.menuItemId === 'ctx:page:' + devices[i]) {
                return push_message('menu', tab, '', devices[i]);
            } else if (info.menuItemId === 'ctx:link:' + devices[i]) {
                return push_message('menu', tab, info.linkUrl, devices[i]);
            } else if (info.menuItemId === 'ctx:image:' + devices[i]) {
                return push_message('menu', tab, info.srcUrl, devices[i]);
            } else if (info.menuItemId === 'ctx:selection:' + devices[i]) {
                return push_message('menu', tab, info.selectionText, devices[i]);
            }
        }
    }
});

if (combo_valid()) {
    setup_context_menus();
}