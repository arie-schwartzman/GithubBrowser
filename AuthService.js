var buffer = require('buffer');
var AsyncStorage = require('react-native').AsyncStorage;

class AuthService {

    getAuthInfo(cb) {
        AsyncStorage.multiGet(['auth', 'user'], (err, value) => {
            if (err) {
                return cb(err);
            }
            if (!value) {
                return cb();
            }
            if (!value[0]) {
                return cb();
            }
            var authInfo = {
                header: {
                    Authorization: 'Basic ' + value[0][1]
                },
                user: JSON.parse(value[1][1])
            }
            return cb(null, authInfo);
        })
    }

    login(creds, cb) {
        const b = new buffer.Buffer(creds.userName + ":" + creds.password);
        const encodedAuth = b.toString('base64');

        fetch('https://api.github.com/user', {
            headers: {
                'Authorization': 'Basic ' + encodedAuth
            }
        }).then((response) => {
            if (response.status >= 200 && response.status < 300) {
                return response;
            }
            throw {
                badCredentials: response.status === 401,
                unknownError: response.status !== 401
            }
        })
            .then((response) => {
                return response.json();
            })
            .then((results) => {
                AsyncStorage.multiSet([
                    ['auth', encodedAuth],
                    ['user', JSON.stringify(results)]
                ], (err) => {
                    if (err) {
                        throw err;
                    }
                    cb({ success: true })
                })
            }).catch((err) => {
                cb(err);
            }).finally(() => {
                cb({ showProgress: false });
            });
    }
}

module.exports = new AuthService();