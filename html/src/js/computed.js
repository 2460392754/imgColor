const computed = (() => {
    /**
     * 图片主色
     * 
     * @param {string} imgSrc 图片路径
     * @resolve {array} 图片前十10主色调
     */
    const mainColor = function (imgSrc) {
        return new Promise(async resolve => {
            const { data } = await init(imgSrc),
                rgbaArr = _dataFormatRGB(data),
                colorArr = _computedColor(rgbaArr);

            resolve(colorArr);
        })
    }

    /**
     * 图片转ascii
     * 
     * @param {object} obj 
     * @param {string} obj.filePath 图片路径
     * @param {number} obj.slider 缩放比例
     * @param {number} obj.action ascii填充方案选项
     * @param {string} obj.color 填充颜色
     * @resolve {object} ascii图片参数
     */
    const ascii = function ({ filePath, slider, action, color }) {
        return new Promise(resolve => {
            init(filePath).then(obj => {
                obj.data = _dataFormatRGB(obj.data);

                return _computedAscii(obj, action, slider, color);
            }).then(dataUri => {
                const blob = _dataURIToBlob(dataUri),
                    size = blob.size,
                    filePath = URL.createObjectURL(blob);

                resolve({
                    filePath,
                    size
                });
            })
        })
    }

    /**
     * cav 初始化
     * 
     * @param {*} imgPath 图片路径
     * @param {*} scale 画布缩放比例
     * @resolve {object} 图片参数
     */
    const init = function (imgPath, scale = 1) {
        const img = new Image();
        img.src = imgPath;

        return new Promise(resolve => {
            img.onload = () => {
                const cav = document.createElement("canvas");
                const ctx = cav.getContext('2d');

                const width = img.width * scale,
                    height = img.height * scale;

                cav.width = width;
                cav.height = height;
                ctx.scale(scale, scale);
                ctx.drawImage(img, 0, 0);

                const data = ctx.getImageData(0, 0, width, height).data;

                resolve({
                    data,
                    width,
                    height
                });
            }
        })
    }

    /**
     * 计算颜色，获取前 10 主色调
     * 
     * @param {array} rgbaArr 
     * @return {array} 
     */
    const _computedColor = function (rgbaArr) {
        let tempObj = {};

        for (let i = 0, len = rgbaArr.length; i < len; i++) {
            const val = tempObj[rgbaArr[i]] || 0;
            tempObj[rgbaArr[i]] = val + 1;
        }

        let arr = Object.entries(tempObj);

        arr.sort((a, b) => {
            return b[1] - a[1]
        })

        arr.length > 10 && (arr.length = 10);

        return arr;
    }

    // 格式化 RGBA
    const _dataFormatRGB = function (data) {
        let arr = [];
        let tempArr = [];

        for (let i = 0, len = data.length; i < len; i++) {
            tempArr.push(data[i]);
            tempArr.length === 4 && (arr.push(tempArr.join(',')), tempArr = []);
        }

        return arr;
    }

    /**
     * 生成ascii
     * 
     * @param {object} obj 图片参数
     * @param {number} action 填充方案选项
     * @param {number} scale 图片缩放
     * @param {string} color ascii字符颜色
     * @resolve {string} 画布路径
     */
    const _computedAscii = function (obj, action, scale, color) {
        const { data, width, height } = obj;
        // ascii字符填充方案
        const asciiTwoArr = [
            ["@", "#", "&", "$", "%", "*", "o", "!", ";", "."],
            ["M", "N", "H", "Q", "$", "O", "C", "?", "7", ">", "!", ":", "–", ";", "."],
            ["@", "#", "%", "M", "N", "H", "Q", "$", "O", "C", "?", "7", ">", "!", ":", "-", ";", "."],
            ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]", "a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "'", "z", "x", "c", "v", "b", "n", "m", ",", ".", "/", "`", "~", "!", "@", "#", "$", "%", "^", "&", "<", "(", ")", "*", "+", "{", "}", ":", "\"", "?", ">", " ", "|"],
            ["$", "@", "B", "%", "8", "&", "W", "M", "#", "*", "o", "a", "h", "k", "b", "d", "p", "q", "w", "m", "Z", "O", "0", "Q", "L", "C", "J", "U", "Y", "X", "z", "c", "v", "u", "n", "x", "r", "j", "f", "t", "/", "\\", " | ", "(", ")", "1", "{ ", "}", "[", "]", " ? ", " - ", "_", " + ", "~", " < ", " > ", "i", "!", "l", "I", "; ", ": ", ", ", "\"", "^", "`", "'", "."],
            ["/", "|", "(", ")", "1", "{", "}", "$", "@", "B", "%", "8", "&", "W", "M", "#", "Z", "O", "0", "Q", "L", "C", "J", "U", "Y", "X", "*", "h", "k", "b", "d", "p", "q", "w", "m", "o", "a", "h", "k", "b", "d", "p", "q", "w", "m", "z", "c", "v", "u", "n", "x", "r", "j", "f", "t", "[", "]", "?", "-", "_", "+", "~", "<", ">", "i", "!", "l", "I", ";", ":", ",", "\"", "^", "`", "'", "."],
        ];

        const asciiArr = asciiTwoArr[action],
            asciiArrLen = asciiArr.length,
            cav = document.createElement('canvas'),
            ctx = cav.getContext('2d');
        let tempStr = '';

        // 正常缩放比例下 分辨率是原先的15倍
        cav.width = width * 15 * scale;
        cav.height = height * 15 * scale;
        ctx.font = "10px Consolas, monospace";
        ctx.fillStyle = "#fff";
        ctx.fillRect(0, 0, cav.width, cav.height);
        ctx.fillStyle = color;
        ctx.scale(1.14 * scale, 1 * scale);

        return new Promise(resolve => {
            for (let i = 0, len = data.length; i < len; i++) {
                const agbaArr = data[i].split(','),
                    avg = (Number(agbaArr[0]) + Number(agbaArr[1]) + Number(agbaArr[2])) / 3,
                    pos = parseInt((avg / 255) * (asciiArrLen - 1));

                tempStr += asciiArr[pos] + asciiArr[pos];

                if ((i + 1) % width === 0 && i !== 0) {
                    ctx.fillText(tempStr, 0, (i + 1) / width * 15);
                    tempStr = "";
                }
            }

            resolve(cav.toDataURL('image/png'));
        });
    }

    /**
     * uri转blob对象
     * 
     * @param {string} dataURI 
     * @return {object} blob对象
     */
    const _dataURIToBlob = function (dataURI) {
        let binStr = atob(dataURI.split(',')[1]),
            len = binStr.length,
            tempArr = new Uint8Array(len);

        for (let i = 0; i < len; i++) {
            tempArr[i] = binStr.charCodeAt(i);
        }

        return new Blob([tempArr]);
    }

    return {
        mainColor,
        ascii
    }
})();

export default computed