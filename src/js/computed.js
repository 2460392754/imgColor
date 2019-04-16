import html2canvas from 'html2canvas';

const computed = (() => {
    // 图片主色
    const mainColor = function (imgSrc) {
        return new Promise(async resolve => {
            const { data } = await init(imgSrc),
                rgbaArr = _dataFormatRGB(data),
                colorArr = _computedColor(rgbaArr);

            resolve(colorArr);
        })
    }

    // img to ascii
    const ascii = function ({ filePath, slider, action }) {
        return new Promise(resolve => {
            let width,
                height;

            init(filePath).then(obj => {
                obj.data = _dataFormatRGB(obj.data);
                width = obj.width;
                height = obj.height;

                return _computedAscii(obj, action);
            }).then(htmlParams => {
                const WHScale = width / height;

                return _htmlToCav(htmlParams, WHScale, slider);
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

    // cav 初始化
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

    // 计算颜色
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

        arr.length = 10;

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

    // 计算 ascii
    const _computedAscii = function (obj, action) {
        const { data, width } = obj;
        const asciiTwoArr = [
            ["@", "#", "&", "$", "%", "*", "o", "!", ";", "."],
            ["M", "N", "H", "Q", "$", "O", "C", "?", "7", ">", "!", ":", "–", ";", "."],
            ["@", "#", "%", "M", "N", "H", "Q", "$", "O", "C", "?", "7", ">", "!", ":", "-", ";", "."],
            ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]", "a", "s", "d", "f", "g", "h", "j", "k", "l", ";", "'", "z", "x", "c", "v", "b", "n", "m", ",", ".", "/", "`", "~", "!", "@", "#", "$", "%", "^", "&", "<", "(", ")", "*", "+", "{", "}", ":", "\"", "?", ">", " ", "|"],
            ["$", "@", "B", "%", "8", "&", "W", "M", "#", "*", "o", "a", "h", "k", "b", "d", "p", "q", "w", "m", "Z", "O", "0", "Q", "L", "C", "J", "U", "Y", "X", "z", "c", "v", "u", "n", "x", "r", "j", "f", "t", "/", "\\", " | ", "(", ")", "1", "{ ", "}", "[", "]", " ? ", " - ", "_", " + ", "~", " < ", " > ", "i", "!", "l", "I", "; ", ": ", ", ", "\"", "^", "`", "'", "."],
            ["/", "|", "(", ")", "1", "{", "}", "$", "@", "B", "%", "8", "&", "W", "M", "#", "Z", "O", "0", "Q", "L", "C", "J", "U", "Y", "X", "*", "h", "k", "b", "d", "p", "q", "w", "m", "o", "a", "h", "k", "b", "d", "p", "q", "w", "m", "z", "c", "v", "u", "n", "x", "r", "j", "f", "t", "[", "]", "?", "-", "_", "+", "~", "<", ">", "i", "!", "l", "I", ";", ":", ",", "\"", "^", "`", "'", "."],
        ];
        // console.log
        const asciiArr = asciiTwoArr[action],
            asciiArrLen = asciiArr.length,
            el = document.createElement('div'),
            preNode = document.querySelector('.ascii>.cavHide>pre');

        let tempStr = '';
        el.id = 'htmlCav';

        return new Promise(resolve => {
            for (let i = 0, len = data.length; i < len; i++) {
                const agbaArr = data[i].split(','),
                    avg = (Number(agbaArr[0]) + Number(agbaArr[1]) + Number(agbaArr[2])) / 3,
                    pos = parseInt((avg / 255) * (asciiArrLen - 1));

                tempStr += asciiArr[pos] + asciiArr[pos];

                if ((i + 1) % width === 0 && i !== 0) {
                    tempStr += "\n";
                }
            }

            el.innerText = tempStr;
            preNode.firstChild && preNode.removeChild(preNode.firstChild);
            preNode.appendChild(el)

            const htmlDom = document.querySelector('.ascii #htmlCav');

            resolve({
                width: htmlDom.scrollWidth,
                height: htmlDom.scrollHeight
            });
        })
    }

    // html to canvas
    const _htmlToCav = function ({ width, height }, WHScale, scale) {
        width = parseInt(width * WHScale * (height / width)); // 等比缩放

        const opts = {
            width,
            height,
            scale,
        }

        return new Promise(resolve => {
            // 图片展示
            html2canvas(document.querySelector('.ascii>.cavHide>pre'), opts).then(cavDom => {
                const ctx = cavDom.getContext('2d');

                // 关闭抗锯齿
                ctx.mozImageSmoothingEnabled = false;
                ctx.webkitImageSmoothingEnabled = false;
                ctx.msImageSmoothingEnabled = false;
                ctx.imageSmoothingEnabled = false;

                resolve(cavDom.toDataURL("image/png"))
            })
        })
    }

    // datauri to blob
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