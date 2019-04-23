import $uni from '../uni/api';





const $openid = (() => {
    // 获取 openid
    const get = async function () {
        return _get().then(openid => {
            return openid;
        }).catch(async () => {
            const openid = await _reqGet();
            await _set(openid);

            return openid;
        })
    }

    const _get = function () {
        return $uni.storage.get('openid')
    }

    // 保存 openid
    const _set = function (val) {
        $uni.storage.set('openid', val)
    }

    // 请求获取 openid ,并会自动更新服务器中的 sessionKey
    const _reqGet = async function () {
        const code = await $uni.plugins.login();

        return new Promise(resolve => {
            $uni.network.request({
                url: '/wxMini/user/openid-get',
                method: 'post',
                data: { code }
            }).then(({ data }) => {
                resolve(data.openid)
            })
        })
    }

    return {
        get
    }
})();







const $sessionKey = (() => {
    // 自动校验更新
    const autoUpdate = function () {
        return new Promise(resolve => {
            Promise.all([_has(), _check()])
                .then(resolve)
                .catch(_set)
                .then(resolve)
        })
    }

    // 校验 sessionKey 是否过期
    const _check = function () {
        return $uni.plugins.checkSession();
    }

    // 服务器中是否存在该 sessionKey
    const _has = async function () {
        const openid = await $openid.get();

        return new Promise((resolve, reject) => {
            $uni.network.request({
                url: '/wxMini/user/session-has',
                method: 'post',
                data: { openid }
            }).then(retObj => {
                retObj.errcode ? resolve() : reject();
            })
        })
    }

    // 更新 sessionKey
    const _set = async function () {
        const code = await $uni.plugins.login();

        return new Promise(resolve => {
            $uni.network.request({
                url: '/wxMini/user/session-set',
                method: 'post',
                data: { code }
            }).then(resolve)
        })
    }

    return {
        autoUpdate
    }
})();






const $userInfo = (() => {
    // 获取 用户信息
    const get = function () {
        return _get().then(retObj => {
            return retObj;
        }).catch(async () => {
            const userInfo = await _reqGet();
            await _set(userInfo);

            return userInfo;
        })
    }

    const _get = function () {
        return $uni.storage.get('userInfo');
    }

    const _set = function (obj) {
        $uni.storage.set('userInfo', obj);
    }

    // 请求 获取用户信息
    const _reqGet = async function () {
        const openid = await $openid.get();

        return new Promise((resolve, reject) => {
            $uni.network.request({
                url: '/wxMini/user/user-info-get',
                method: 'post',
                data: { openid }
            }).then(({ data }) => {
                Array.isArray(data) ? reject() : resolve(data);
            })
        })
    }

    // 请求 保存用户信息, 数据需要解密 (sessionKey)
    const _reqSet = async function () {
        const openid = await $openid.get();
        await $sessionKey.autoUpdate();

        return new Promise(resolve => {
            $uni.plugins.userInfo().then(retObj => {
                $uni.network.request({
                    url: '/wxMini/user/user-info-set',
                    method: 'post',
                    data: {
                        ...retObj,
                        openid
                    }
                }).then(resolve)
            })
        })
    }

    return {
        get
    }
})();






const $phonenumber = (() => {
    // 获取 手机号
    const get = function (e) {
        return _reqGet().then(retArr => {
            return retArr;
        }).catch(() => {
            return _reqSet(e).then(get);
        })
    }

    // 请求 获取手机号
    const _reqGet = async function () {
        const openid = await $openid.get();

        return new Promise((resolve, reject) => {
            $uni.network.request({
                url: '/wxMini/user/user-phonenumber-get',
                method: 'post',
                data: { openid }
            }).then(({ data }) => {
                Array.isArray(data) ? reject() : resolve(data);
            })
        })
    }

    // 请求 保存手机号
    const _reqSet = async function (dataObj) {
        console.log(dataObj)
        const { errMsg, encryptedData, iv } = dataObj;
        const openid = await $openid.get();

        return new Promise((resolve, reject) => {
            if (!$other.isSuccess(errMsg)) reject();

            $uni.network.request({
                url: '/wxMini/user/user-phonenumber-set',
                method: 'post',
                data: {
                    openid,
                    encryptedData,
                    iv
                }
            }).then(resolve)
        })
    }

    return {
        get
    }
})();







const $other = (() => {
    /**
     * 判断 wx系统接口 返回的 errmsg 是否正确
     * 
     * @param {string} errmsg 
     * @return {boolean}
     */
    const isSuccess = function (errmsg) {
        console.log(errmsg)
        return errmsg.indexOf('ok') !== -1;
    }

    return {
        isSuccess
    }
})();






export default {
    openid: $openid,
    userInfo: $userInfo,
    phonenumber: $phonenumber
}