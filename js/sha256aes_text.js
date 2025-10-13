function SHA256AES_Text() {
    var key = document.getElementById("sha256aes_key");
    var key_raw = document.getElementById("sha256aes_key_raw");
    //var iv = "SV85x1MH5OM4qwtt/rlllaNbmjXNtCfiiFA3QzpSggE=";
    var iv = document.getElementById("sha256aes_iv");
    var iv_raw = document.getElementById("sha256aes_iv_raw");
    var input = document.getElementById("sha256aes_input");
    var output = document.getElementById("sha256aes_output");
    var encrypt = document.getElementById("sha256aes_encrypt");
    var decrypt = document.getElementById("sha256aes_decrypt");

    function uint8ArrayToHexString(uint8array) {
        return Array.from(uint8array)
            .map(byte => byte.toString(16).padStart(2, '0')) // Pastikan setiap byte jadi 2 digit hex
            .join(''); // Gabungkan semua digit
    }

    key.addEventListener(
        "change",
        async callback => {
            var hash = await EncryptorSHA256.computeSha256Hash(callback.target.value);
            var string = uint8ArrayToHexString(hash);
            key_raw.value = string;
        }
    )

    iv.addEventListener(
        "change",
        async callback => {
            var hash = await EncryptorSHA256.generate128BitIV(callback.target.value);
            var string = uint8ArrayToHexString(hash);
            iv_raw.value = string;
        }
    )

    encrypt.addEventListener(
        "click",
        () => {
            if (key.value == "") {
                output.value = "Error: Key Can't Null"
                return;
            }
            if (iv.value == "") {
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
            if (key.value == "") {
                output.value = "Error: Key Can't Null"
                return;
            }
            if (iv.value == "") {
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