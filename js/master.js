function delay(ms)
{
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function CopyToClipboard(input_id)
{
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