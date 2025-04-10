async function test() {

const res = await fetch("http://localhost:3000/api/buyer", {
    "credentials": "include",
    "headers": {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:135.0) Gecko/20100101 Firefox/135.0",
        "Accept": "*/*",
        "Accept-Language": "en-US,en;q=0.5",
        "Content-Type": "application/json",
        "Sec-Fetch-Dest": "empty",
        "Sec-Fetch-Mode": "cors",
        "Sec-Fetch-Site": "same-origin",
        "Priority": "u=0"
    },
    "referrer": "http://localhost:3000/cart",
    "body": "[{\"userinfo\":{\"name\":\"Test\",\"phone\":\"993939939393\",\"address\":\"dkg;sdkgodsk;kgdsfg\"},\"id\":[{\"length\":1000000000000}]}]",
    "method": "POST",
    "mode": "cors"
});
const data = await res.json();
console.log("Data",data)
}
test()