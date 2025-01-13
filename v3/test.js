



const { subtle } = globalThis.crypto;

let encoder = new TextEncoder();
let decoder = new TextDecoder();

function open(password) {
    let key =  crypto.subtle.digest({
        name: 'SHA-256'
    }, encoder.encode(password)).then(result => crypto.subtle.importKey('raw', result, {
        name: 'AES-CBC'
    }, true, ['encrypt', 'decrypt']));
    console.log(key);
    return key;
}



(async function() {

    
    const key = await subtle.generateKey({
        name: 'HMAC',
        hash: 'SHA-256',
        length: 256,
    }, true, ['sign', 'verify']);
    
    const enc = new TextEncoder();
    const message = enc.encode('I love cupcakes');
    console.log(message);
    const digest = await subtle.sign({
        name: 'HMAC',
    }, key, message);
    console.log(digest);

    const key2 = await open("password");
    console.log("key2 ", key2);
    const string = "I love cupcakes"
    const iv = crypto.getRandomValues(new Uint8Array(16));

    const result = await crypto.subtle.encrypt({
      name: 'AES-CBC',
      iv
    }, key2, encoder.encode(string));

    console.log('result ', result);


    

    
})(); 















