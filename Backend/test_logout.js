import fetch from 'node-fetch';

async function test() {
    // 1. Log in
    const loginRes = await fetch('http://localhost:3000/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: 'adityasharma4131@gmail.com', password: 'dummy' })
    });
    const loginText = await loginRes.text();
    console.log("LOGIN Status:", loginRes.status);
    console.log("LOGIN Body:", loginText);

    if (loginRes.status !== 200) return;

    const token = JSON.parse(loginText).token;
    console.log("Extracted token:", token);

    const logoutRes = await fetch('http://localhost:3000/api/users/logout', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    });
    
    console.log("LOGOUT Status:", logoutRes.status);
    console.log("LOGOUT Body:", await logoutRes.text());
}

test();
