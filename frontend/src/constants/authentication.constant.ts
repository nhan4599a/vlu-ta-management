const msalConfig = {
    auth: {
        clientId: "5118cdeb-e864-4380-be14-28471b0db820",
        authority: "https://login.microsoftonline.com/common",
        redirectUri: "http://localhost:5173/post-login",
        navigateToLoginRequestUrl: false,
    },
    cache: {
        cacheLocation: "sessionStorage",
        storeAuthStateInCookie: false,
    },
};

const loginRequest = {
    scopes: ["User.Read"]
};


const graphConfig = {
    graphMeEndpoint: "https://graph.microsoft.com/v1.0/me",
};

export default {
    msalConfig,
    loginRequest,
    graphConfig
}