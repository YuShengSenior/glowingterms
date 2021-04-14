const axios = require("axios")
const qs = require("querystring")
var instance = axios.create({ timeout: 1000 });
instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
instance.interceptors.request.use(function (config) {
    if (config.method === 'post') {
        config.data = qs.stringify(config.data)
    }
    return config;
}, function (error) {
    return Promise.reject(error);
});

instance.interceptors.response.use(
    (res) => res.status === 200 ? Promise.resolve(res) : Promise.reject(res),
    (err) => {
        console.log(err)
        const { response } = err;
        if (response) {
            errorHandle(response.status, response.data);
            return Promise.reject(response);
        } else {
            console.log('请求失败')
        }
    }
);

const errorHandle = (status, other) => {
    switch (status) {
        case 400:
            console.log("信息校验失败");
            break;
        case 401:
            console.log("认证失败");
            break;
        case 403:
            console.log("token校验失败");
            break;
        case 404:
            console.log("请求的资源不存在");
            break;
        default:
            console.log(other);
            break;

    }
}

module.exports = { instance: instance }
