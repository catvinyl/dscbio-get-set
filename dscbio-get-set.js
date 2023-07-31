const fs = require('fs');
const https = require('https');
const axios = require('axios');

var dbgt = {
    fileEnvPath:'.env',
    envto: {
        token: 'DISCORD_TOKEN',
        userid: 'DISCORD_USERID'
    },
    token: null,
    userid: null,
    cacheUserId: true,
    api: {
        profile: 'https://discord.com/api/v9/users/@me/profile'
    }
};

dbgt.setEnvData = function (data, name){
    if(data){
        dbgt[name] = data;
        return true;
    }
    const envName = dbgt.envto[name];
    if (process.env[envName]){
        dbgt[name] = process.env[envName];
        return true;
    }
    if (fs.existsSync(dbgt.fileEnvPath)) {
        var text;
        try {
            text = fs.readFileSync(dbgt.fileEnvPath, { encoding: 'utf-8' });
        } catch (error) {

        }
        text = text.split('\n');
        for (let i = 0; i < text.length; i++) {
            const line = text[i];
            if (line.startsWith(envName + '=')){
                dbgt[name] = line.split('=')[1];
                return true;
            }
        }
    }
}

dbgt.getTimestamp = function (dateObj){
    var date = dateObj || new Date();
    const timestamp = date.getTime().toString().slice(0, 10);
    const str = '<t:' + timestamp + ':R>';
    return str;
}

// dbgt.getUserId = async function (tkn) {
//     const url = dbgt.api.profile;
//     const token = tkn || dbgt.token;
//     const res = await axios.get(url, { bio: text }, {
//         headers: {
//             'Authorization': token
//         }
//     });
//     return {res: res, userid: null };
// }

dbgt.getBio = async function (usrid, tkn) {
    const token = tkn || dbgt.token;
    var userid = usrid || dbgt.userid;
    const url = dbgt.api.profile.replace('@me', userid);
    const res = await axios.get(url, {
        headers: {
            'Authorization': token
        }
    });
    return res;
}

dbgt.setBio = async function (text, tkn) {
    const url = dbgt.api.profile;
    const token = tkn || dbgt.token;
    const res = await axios.patch(url, { bio: text }, {
        headers: {
            'Authorization': token
        }
    });
    return res;
}

dbgt.init = async function (token, userid) {
    if (!dbgt.setEnvData(token, 'token')){
        return false;
    }
    if (!dbgt.setEnvData(userid, 'userid')) {
        return false;
    }
    // if (dbgt.cacheUserId){
    //     dbgt.getUserId(dbgt.token).then(function(e){
    //         console.log(e);
    //         dbgt.userid = e.userid;
    //     });
    // }
    return true;
}

exports.dbgt = dbgt;