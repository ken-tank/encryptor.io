var key = document.getElementById("key");
var iv = document.getElementById("iv");
var input = document.getElementById("input");
var output = document.getElementById("output");
var encrypt = document.getElementById("encrypt");
var decrypt = document.getElementById("decrypt");

function Init() 
{
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

Init();