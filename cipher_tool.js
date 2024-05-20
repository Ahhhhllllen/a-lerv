function caesarCipher(text, shift) {
    let result = '';
    // Loop through each character in the input text
    for (let i = 0; i < text.length; i++) {
        let charCode = text.charCodeAt(i); // Get the ASCII code of the current character
        
        // Check if the character is an uppercase letter
        if (charCode >= 65 && charCode <= 90) {
            // Convert the character to its new shifted value, wrapping around the alphabet using modulo 26
            result += String.fromCharCode(((charCode - 65 + shift) % 26) + 65);
        // Check if the character is a lowercase letter
        } else if (charCode >= 97 && charCode <= 122) {
            // Convert the character to its new shifted value, wrapping around the alphabet using modulo 26
            result += String.fromCharCode(((charCode - 97 + shift) % 26) + 97);
        } else {
            // If it's not a letter, add it unchanged to the result
            result += text.charAt(i);
        }
    }
    return result; // Return the encrypted text
}

function atbashCipher(text) {
    let result = '';
    // Loop through each character in the input text
    for (let i = 0; i < text.length; i++) {
        let charCode = text.charCodeAt(i); // Get the ASCII code of the current character
        
        // Check if the character is an uppercase letter
        if (charCode >= 65 && charCode <= 90) {
            // Convert the character using the Atbash cipher (mirroring the alphabet)
            result += String.fromCharCode(90 - (charCode - 65));
        // Check if the character is a lowercase letter
        } else if (charCode >= 97 && charCode <= 122) {
            // Convert the character using the Atbash cipher (mirroring the alphabet)
            result += String.fromCharCode(122 - (charCode - 97));
        } else {
            // If it's not a letter, add it unchanged to the result
            result += text.charAt(i);
        }
    }
    return result; // Return the encrypted text
}

function rot13Cipher(text) {
    // ROT13 is a Caesar cipher with a fixed shift of 13
    return caesarCipher(text, 13);
}

function base64Encode(text) {
    // Encode the input text to Base64 format
    return btoa(text);
}

function base64Decode(text) {
    try {
        // Decode the input text from Base64 format
        return atob(text);
    } catch (e) {
        // Handle invalid Base64 input
        return 'Invalid Base64 input';
    }
}

function encrypt() {
    let text = document.getElementById("inputText").value; // Get the input text from the HTML input element
    let outputText = ""; // Initialize the output text

    // Get the selected cipher type from the HTML radio buttons
    let selectedCipher = document.querySelector('input[name="cipherType"]:checked').value;
    switch(selectedCipher) {
        case "caesar":
            let shift = parseInt(document.getElementById("shift").value); // Get the shift value for the Caesar cipher
            outputText = caesarCipher(text, shift); // Encrypt the text using the Caesar cipher
            break;
        case "atbash":
            outputText = atbashCipher(text); // Encrypt the text using the Atbash cipher
            break;
        case "rot13":
            outputText = rot13Cipher(text); // Encrypt the text using the ROT13 cipher
            break;
        case "base64":
            outputText = base64Encode(text); // Encode the text using Base64 encoding
            break;
        default:
            outputText = "Invalid cipher type"; // Handle invalid cipher type
            break;
    }

    document.getElementById("outputText").value = outputText; // Display the encrypted text in the HTML output element
}

function decrypt() {
    let text = document.getElementById("inputText").value; // Get the input text from the HTML input element
    let decryptedText = ""; // Initialize the decrypted text

    // Get the selected cipher type from the HTML radio buttons
    let selectedCipher = document.querySelector('input[name="cipherType"]:checked').value;
    switch(selectedCipher) {
        case "caesar":
            // Provide both right to left and left to right shifts for the Caesar cipher
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
            decryptedText = atbashCipher(text); // Decrypt the text using the Atbash cipher
            break;
        case "rot13":
            decryptedText = rot13Cipher(text); // Decrypt the text using the ROT13 cipher
            break;
        case "base64":
            decryptedText = base64Decode(text); // Decode the text from Base64 encoding
            break;
        default:
            decryptedText = "Invalid cipher type"; // Handle invalid cipher type
            break;
    }

    document.getElementById("outputText").value = decryptedText; // Display the decrypted text in the HTML output element
}
