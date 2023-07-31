# dscbio-get-set
For NodeJS

Example usage code: test.js

```

const dbgt = require('dscbio-get-set').dbgt;

var token = null; // You can provide token, or it do auto.

if (dbgt.init(token)){
    console.log('Init done!');
} else {
    return console.log('No token!');
}
console.log('Token', dbgt.token);
console.log('UserID', dbgt.userid);

dbgt.setBio('Test').then(console.log);

dbgt.getBio().then(function (e){
    console.log(e.data);
});

dbgt.setBio(dbgt.getTimestamp());

console.log();

```