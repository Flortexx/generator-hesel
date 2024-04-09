window.onload = function() {
    var savedMessages = localStorage.getItem('passwordList');
    if (savedMessages) {
        document.getElementById("passwordList").innerHTML = savedMessages;
    }
};



document.getElementById('generatePassword').addEventListener('click', function() {
    var length = parseInt(document.getElementById('passwordLength').value);
    var includeNumbers = document.getElementById('includeNumbers').checked;
    var includeSpecialChars = document.getElementById('includeSpecialChars').checked;
    
    var generatedPassword = generatePassword(length, includeNumbers, includeSpecialChars);
    document.getElementById('generatedPassword').textContent = generatedPassword;
});

document.getElementById('addPassword').addEventListener('click', function() {
    var accountName = document.getElementById('accountName').value;
    var accountPassword = document.getElementById('accountPassword').value;

    if (accountName && accountPassword) {
        savePassword(accountName, accountPassword);
        displayPasswords();
    } else {
        alert('Please enter account name and password.');
    }
});

function generatePassword(length, includeNumbers, includeSpecialChars) {
    var charset = 'abcdefghijklmnopqrstuvwxyz';
    if (includeNumbers) charset += '0123456789';
    if (includeSpecialChars) charset += '!@#$%^&*()-_+=<>?';
    if (uppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    var password = '';
    for (var i = 0; i < length; i++) {
        var randomIndex = Math.floor(Math.random() * charset.length);
        password += charset.charAt(randomIndex);
    }
    return password;
}

function savePassword(accountName, accountPassword) {
    var passwords = JSON.parse(localStorage.getItem('passwords')) || {};
    passwords[accountName] = accountPassword;
    localStorage.setItem('passwords', JSON.stringify(passwords));
}

function displayPasswords() {
    var passwords = JSON.parse(localStorage.getItem('passwords')) || {};
    var passwordList = document.getElementById('passwordList');
    passwordList.innerHTML = '';
    for (var account in passwords) {
        var listItem = document.createElement('li');
        listItem.textContent = account + ': ' + passwords[account];
        passwordList.appendChild(listItem);
    }
}

