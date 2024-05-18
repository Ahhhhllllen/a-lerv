function caesarCipher(text, shift) {
    let result = '';
    for (let i = 0; i < text.length; i++) {
        let charCode = text.charCodeAt(i);
        if (charCode >= 65 && charCode <= 90) {
            result += String.fromCharCode(((charCode - 65 + shift) % 26) + 65);
        } else if (charCode >= 97 && charCode <= 122) {
            result += String.fromCharCode(((charCode - 97 + shift) % 26) + 97);
        } else {
            result += text.charAt(i);
        }
    }
    return result;
}

function atbashCipher(text) {
    let result = '';
    for (let i = 0; i < text.length; i++) {
        let charCode = text.charCodeAt(i);
        if (charCode >= 65 && charCode <= 90) {
            result += String.fromCharCode(90 - (charCode - 65));
        } else if (charCode >= 97 && charCode <= 122) {
            result += String.fromCharCode(122 - (charCode - 97));
        } else {
            result += text.charAt(i);
        }
    }
    return result;
}

function rot13Cipher(text) {
    return caesarCipher(text, 13);
}

function base64Encode(text) {
    return btoa(text);
}

function base64Decode(text) {
    try {
        return atob(text);
    } catch (e) {
        return 'Invalid Base64 input';
    }
}

function encrypt() {
    let text = document.getElementById("inputText").value;
    let outputText = "";

    let selectedCipher = document.querySelector('input[name="cipherType"]:checked').value;
    switch(selectedCipher) {
        case "caesar":
            let shift = parseInt(document.getElementById("shift").value);
            outputText = caesarCipher(text, shift);
            break;
        case "atbash":
            outputText = atbashCipher(text);
            break;
        case "rot13":
            outputText = rot13Cipher(text);
            break;
        case "base64":
            outputText = base64Encode(text);
            break;
        default:
            outputText = "Invalid cipher type";
            break;
    }

    document.getElementById("outputText").value = outputText;
}

function decrypt() {
    let text = document.getElementById("inputText").value;
    let decryptedText = "";
    let selectedCipher = document.querySelector('input[name="cipherType"]:checked').value;

    switch(selectedCipher) {
        case "caesar":
            decryptedText += "Right to Left Shifts:\n";
            for (let shift = 0; shift < 26; shift++) {
                decryptedText += "Shift " + shift + ": " + caesarCipher(text, 26 - shift) + "\n";
            }
            decryptedText += "\nLeft to Right Shifts:\n";
            for (let shift = 0; shift < 26; shift++) {
                decryptedText += "Shift " + shift + ": " + caesarCipher(text, shift) + "\n";
            }
            break;
        case "atbash":
            decryptedText = atbashCipher(text);
            break;
        case "rot13":
            decryptedText = rot13Cipher(text);
            break;
        case "base64":
            decryptedText = base64Decode(text);
            break;
        default:
            decryptedText = "Invalid cipher type";
            break;
    }

    document.getElementById("outputText").value = decryptedText;
}
