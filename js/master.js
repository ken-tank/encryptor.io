function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function generatePseudoRandomString(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

function generateCryptoSecureRandomString(byteLength) {
    try {
        // 1. Menggunakan sumber keacakan kriptografi-aman
        const randomBytes = new Uint8Array(byteLength);
        crypto.getRandomValues(randomBytes);
        
        // 2. Mengubah byte acak menjadi string Base64 yang aman untuk penyimpanan/transmisi
        // Ini adalah cara standar dan paling aman untuk mendapatkan "string random" kriptografi.
        const base64String = btoa(String.fromCharCode.apply(null, randomBytes));
        
        return base64String;
    } catch (error) {
        console.error("Gagal menghasilkan string acak kriptografi-aman:", error);
        throw error;
    }
}

async function CopyToClipboard(input_id) {
    var text = document.getElementById(input_id).value;
    await navigator.clipboard.writeText(text);
    console.log("copied to clipboard");
}

document.getElementById("copy-text-input").addEventListener(
    "click",
    () => {
        CopyToClipboard("sha256aes_input");
    }
)

document.getElementById("copy-text-output").addEventListener(
    "click",
    () => {
        CopyToClipboard("sha256aes_output");
    }
)

document.getElementById("btn-key-random").addEventListener(
    "click",
    () => {
        var field = document.getElementById("sha256aes_key");
        field.value = generateCryptoSecureRandomString(32);
    }
)

document.getElementById("btn-iv-random").addEventListener(
    "click",
    () => {
        var field = document.getElementById("sha256aes_iv");
        field.value = generateCryptoSecureRandomString(12);
    }
)