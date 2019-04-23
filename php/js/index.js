// 事件绑定
function bindEvent () {
    const el = document.querySelector('input');

    el.addEventListener('change', () => {
        main(el.files[0])
    });
}


function main (file) {
    const formNode = document.querySelector('form'),
        formData = new FormData(formNode);

    preview(file);

    ajax({
        url: './php/Ascii.php',
        data: formData
    }).then(res => {
        const imgEl = document.querySelector('.after');
        imgEl.src = res.responseText;
    }).catch(err => {
        throw err;
    })
}

// 图片预览
function preview (file) {
    const f = new FileReader(),
        imgEl = document.querySelector('.before');

    f.readAsDataURL(file);
    f.onload = () => {
        imgEl.src = f.result;
    }
}

// ajax
function ajax ({ url, data }) {
    return new Promise(resolve => {
        const xhr = new XMLHttpRequest();

        xhr.open('post', url);
        xhr.send(data);
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
                resolve(xhr)
            }
        };
    })
}

bindEvent();