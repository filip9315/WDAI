const generateButton = document.getElementById("generateButton");


function generatePassword() {

    const minLength = parseInt(document.getElementById("minLength").value);
    const maxLength = parseInt(document.getElementById("maxLength").value);
    const includeUppercase = document.getElementById("uppercase").checked;
    const includeSpecialChars = document.getElementById("specialChars").checked;
    
    console.log(minLength)
    console.log(maxLength)
    if (minLength > maxLength || minLength <= 0 || maxLength <= 0) {
        alert("Błędne wartości dla długości hasła.");
        return;
    }

    const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
    const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const specialChars = "!@#$%^&*()_+[]{}|;:',.<>?";

    let charset = lowercaseChars;
    if (includeUppercase) charset += uppercaseChars;
    if (includeSpecialChars) charset += specialChars;

    let password = "";
    const length = Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength;
    console.log("length: " + length)

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        password += charset[randomIndex];
    }

    alert(`Wygenerowane hasło: ${password}`);
}

generateButton.addEventListener('click', generatePassword);