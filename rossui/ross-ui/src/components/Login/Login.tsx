import React from 'react';
import queryString from 'querystring';
import { withRouter, useLocation } from 'react-router-dom';

const Login = () => {
    const location = useLocation();

    let code = queryString.parse(location.search)["?code"];
    // if (code)
    // {
    //     console.log({grantType: "authorization_code", scope: ["identify"], code: code});
    //     oauth.tokenRequest(
    //         {grantType: "authorization_code", 
    //         scope: "identify",
    //         code: code, 
    //         clientId:"788510734904590398", 
    //         clientSecret:"Si6cbl56sEZLK8DJPjKN2iGkw_JF20Io"})
    //         .then(resp => oauth.getUser(resp.access_token)
    //         .then(user => {
    //             console.log(user)
    //             const mytoken = jwt.sign(user.id, "mysecretkeyRoSS");
    //             setToken(mytoken);
    //         }))
    //     }

    const sendToDiscord = () => {
        window.location.replace(discordURI);
    }

    if (!code)
    {
        return ( <div className="login-wrapper"><button onClick={sendToDiscord}>Log in with Discord</button></div>);
    }        
        
    return <div>You're logged in - token stuff next!</div>
}

export default withRouter(Login);