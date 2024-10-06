function SHA256AES_File() 
{
    var key = document.getElementById("sha256aes-file_key");
    var iv = document.getElementById("sha256aes-file_iv");
    //var iv = "SV85x1MH5OM4qwtt/rlllaNbmjXNtCfiiFA3QzpSggE=";
    var input = document.getElementById("sha256aes-file_input");
    var encrypt = document.getElementById("sha256aes-file_encrypt");
    var decrypt = document.getElementById("sha256aes-file_decrypt");
    var error = document.getElementById("sha256aes-file_error");

    var file;
    input.addEventListener("change", function(event) {
        file = event.target.files[0];
    });

    const arrayBufferToString = (exportedPrivateKey) => {
        const byteArray = new Uint8Array(exportedPrivateKey);
        let byteString = '';
        for (var i = 0; i < byteArray.byteLength; i++) {
            byteString += String.fromCodePoint(byteArray[i]);
        }
        return byteString;
    }
    const stringToArrayBuffer = (string) => {
        let byteArray = new Uint8Array(string.length);
        for (var i = 0; i < string.length; i++) {
            byteArray[i] = string.codePointAt(i);
        }
        return byteArray;
    }

    encrypt.addEventListener(
        "click",
        () => {
            if (key.value == "") 
            {
                error.innerHTML = "Error: Key Can't Null"
                return;
            }
            if (iv.value == "") 
            {
                error.innerHTML = "Error: IV Can't Null"
                return;
            }
            if (!file)
            {
                error.innerHTML = "Error: Input Can't Null"
                return;
            }
            const reader = new FileReader();
            
            reader.onload = async function(e) {
                const hex = e.target.result;
                const i = arrayBufferToString(hex);
                const encrypt = await EncryptorSHA256.encrypt(i, key.value, iv.value);
                const o = stringToArrayBuffer(encrypt);
                const blob = new Blob([o], { type: 'application/octet-stream' });
                const link = document.createElement('a');
                link.href = URL.createObjectURL(blob);
                link.download = file.name;
                document.body.appendChild(link);
                link.click();

                URL.revokeObjectURL(link.href);
                document.body.removeChild(link);
            }
            reader.onerror = function(e) {
                error.innerHTML = `Error: ${e.message}`
            }
            reader.readAsArrayBuffer(file);
        }
    );
    decrypt.addEventListener(
        "click",
        () => {
            if (key.value == "") 
            {
                error.innerHTML = "Error: Key Can't Null"
                return;
            }
            if (iv.value == "") 
            {
                error.innerHTML = "Error: IV Can't Null"
                return;
            }
            if (!file)
            {
                error.innerHTML = "Error: Input Can't Null"
                return;
            }
            const reader = new FileReader();
            
            reader.onload = async function(e) {
                const hex = e.target.result;
                const i = arrayBufferToString(hex);
                const decrypt = await EncryptorSHA256.decrypt(i, key.value, iv.value);
                const o = stringToArrayBuffer(decrypt);
                const blob = new Blob([o], { type: 'application/octet-stream' });
                const link = document.createElement('a');
                link.href = URL.createObjectURL(blob);
                link.download = file.name;
                document.body.appendChild(link);
                link.click();

                URL.revokeObjectURL(link.href);
                document.body.removeChild(link);
            }
            reader.onerror = function(e) {
                error.innerHTML = `Error: ${e.message}`
            }
            reader.readAsArrayBuffer(file);
        }
    );
    console.log("Initialize");
}

SHA256AES_File();