

import { Safe } from "./safe.js"

const { subtle } = globalThis.crypto;

let encoder = new TextEncoder();
let decoder = new TextDecoder();

function open(password) {
    let key =  crypto.subtle.digest({
        name: 'SHA-256'
    }, encoder.encode(password)).then(result => crypto.subtle.importKey('raw', result, {
        name: 'AES-CBC'
    }, true, ['encrypt', 'decrypt']));
    console.log('key ', key);

    return key;
}

(async function() {
    const key = await subtle.generateKey({
        name: 'HMAC',
        hash: 'SHA-256',
        length: 256,
    }, true, ['sign', 'verify']);

    //data:application/octet-binary;base64,fWq9LDj5C8v6qkDVVYg27WF7xT35+TAujJBdgDlFo2c=
    const enc = new TextEncoder();
    const message = enc.encode('secret');
    console.log('message ', message);
    const digest = await subtle.sign({
        name: 'HMAC',
    }, key, message);
    console.log("digest ", digest);

    const key2 = await open("password");
    console.log("key2 ", key2);
    const string = "secret";
    const iv = crypto.getRandomValues(new Uint8Array(16));

    const result = await crypto.subtle.encrypt({
      name: 'AES-CBC',
      iv
    }, key2, encoder.encode(string));

    console.log('result ', result);


    const password = "toto";
    console.log('xxxxxxxxxxxxxxxxxxx');
    const text = "abcdefg";
    let safe = new Safe();
    
    await safe.open(password);

    const iv3 = safe.crypto.getRandomValues(new Uint8Array(16));    
    const result3 = await safe.crypto.subtle.encrypt({
        name: 'AES-CBC',
        iv3
    }, safe.#key, safe.#encoder.encode(string));
    
    console.log(result3.split(',')[1]);

    //reader.readAsDataURL(new Blob([iv, result], {type: 'text/enc'}));
    








    
    const encrypted = 'data:application/octet-binary;base64,' + await safe.encrypt(text);



    
})(); 















