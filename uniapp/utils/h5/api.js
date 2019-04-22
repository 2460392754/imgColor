import clipboard from 'clipboard';

// 剪贴板
const copy = (function() {
	const get = function() {}

	const set = function(trigger, text) {
		const example = new clipboard(trigger, {
			text() {
				example.destroy();
				return text;
			}
		});
	}

	return {
		get,
		set
	}
})();

// 下载文件
const download = ({
	download,
	href
}) => {
	const a = document.createElement("a");

	a.download = download;
	a.href = href;


	// 	const blob = new Blob(["Hello,world!\n123123,123123"], {type: "text/csv,charset=UTF-8"});
	// 	a.href = window.URL.createObjectURL(blob);
	// 	a.download = new Date().getTime() +'文件.csv';

	a.click();
};

// base64 to blob
const base64ToBlob = function(dataURI) {
	let binStr = atob(dataURI.split(',')[1]),
		len = binStr.length,
		tempArr = new Uint8Array(len);

	for (let i = 0; i < len; i++) {
		tempArr[i] = binStr.charCodeAt(i);
	}

	return new Blob([tempArr], {type: "image/png"});
	
	
	
	
	let blob;
	
	try {
		blob = new Blob([tempArr], {
			type: "image/png"
		});
	} catch (e) {
		// TypeError old chrome and FF
		window.BlobBuilder = window.BlobBuilder ||
			window.WebKitBlobBuilder ||
			window.MozBlobBuilder ||
			window.MSBlobBuilder;
		if (e.name == 'TypeError' && window.BlobBuilder) {
			let bb = new BlobBuilder();
			bb.append([array.buffer]);
			blob = bb.getBlob("image/jpeg");
		} else if (e.name == "InvalidStateError") {
			// InvalidStateError (tested on FF13 WinXP)
			blob = new Blob([array.buffer], {
				type: "image/jpeg"
			});
		} else {
			alert('该浏览器不支持下载文件')
		}
	}
	
	return blob;
}

export default {
	copy,
	download,
	base64ToBlob
}
