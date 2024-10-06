function SHA256AES_Text() 
{
    var key = document.getElementById("sha256aes_key");
    //var iv = "SV85x1MH5OM4qwtt/rlllaNbmjXNtCfiiFA3QzpSggE=";
    var iv = document.getElementById("sha256aes_iv");
    var input = document.getElementById("sha256aes_input");
    var output = document.getElementById("sha256aes_output");
    var encrypt = document.getElementById("sha256aes_encrypt");
    var decrypt = document.getElementById("sha256aes_decrypt");

    encrypt.addEventListener(
        "click",
        () => {
            if (key.value == "") 
            {
                output.value = "Error: Key Can't Null"
                return;
            }
            if (iv.value == "") 
            {
                output.value = "Error: IV Can't Null"
                return;
            }
            var i = input.value;
            var o = EncryptorSHA256.encrypt(i, key.value, iv.value);
            o.then((value) => {
                output.value = value;
            })
        }
    );
    decrypt.addEventListener(
        "click",
        () => {
            if (key.value == "") 
            {
                output.value = "Error: Key Can't Null"
                return;
            }
            if (iv.value == "") 
            {
                output.value = "Error: IV Can't Null"
                return;
            }
            var i = input.value;
            var o = EncryptorSHA256.decrypt(i, key.value, iv.value);
            o.then((value) => {
                output.value = value;
            })
        }
    );
    console.log("Initialize");
}

SHA256AES_Text();