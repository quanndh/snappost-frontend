export const FacebookAppId = '249068886329486';
export const GoogleClientId = "750065301705-mk6qe7fot41p2bo1s8mnqbl2otaquglm.apps.googleusercontent.com"
export default {
    apiHost: process.env.NODE_ENV == "production" ? "https://35.232.6.168/api" : "http://localhost:1337/api"
}