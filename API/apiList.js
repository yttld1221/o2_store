import api from './api.js';
import baseUrl from './config';
const path = baseUrl.dev; //请求地址
const req = require.context("./requestApi", true, /\.js$/);
let apis = {}
req.keys().forEach(key => {
    let name = key.substring(2, key.length - 3);
    apis[name] = req(key).default;
});
// 
module.exports = {
    ...apis,
    path,
}
