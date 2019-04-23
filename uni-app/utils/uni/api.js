import params from '@/js/params'

const network = (() => {
	// 请求
	const request = function({
		url,
		method = 'get',
		data = {},
		header = {},
		jsonFormat = false,
	}) {

		if (!jsonFormat) {
			header['content-type'] = 'application/x-www-form-urlencoded';
		}

		return new Promise((resolve, reject) => {
			uni.request({
				url: params.hostName + url,
				method: method,
				data: data,
				header: header,
				success: res => {
					resolve(res);
				},
				fail: err => {
					reject(err);
				}
			});
		})
	}

	return {
		request
	}
})();





const media = (() => {
	// 图片
	const img = (function() {
		/**
		 * 上传本地相册图片或者相机拍照, h5有bug
		 * 暂不支持全平台 19.4.17
		 * 
		 * @params {object} obj
		 * @params {number} obj.count 		最多可以选择的图片张数，默认9
		 * @params {array}  obj.sizeType 	original 原图，compressed 压缩图，默认二者都有
		 * @params {array}  obj.sourceType 	album 从相册选图，camera 使用相机，默认二者都有
		 */
		const upload = function(obj = {}) {
			return new Promise((resolve, reject) => {
				uni.chooseImage({
					count: obj.count,
					sizeType: obj.sizeType,
					sourceType: obj.sourceType,
					success: res => resolve(res),
					fail: err => reject(err)
				});
			})
		}

		// 保存
		const save = function(filePath) {
			return new Promise((resolve, reject) => {
				uni.saveImageToPhotosAlbum({
					filePath,
					success: res => resolve(res),
					fail: err => reject(err)
				});
			})
		}

		// 预览
		const preview = function() {}

		// 获取图片信息
		const getInfo = function(src) {
			return new Promise((resolve, reject) => {
				uni.getImageInfo({
					src,
					success: res => resolve(res),
					fail: err => reject(err)
				});
			})
		}

		return {
			upload,
			save,
			preview,
			getInfo
		}
	})()

	return {
		img
	}
})();





const file = (() => {
	// 保存文件
	const save = function(path) {
		return new Promise((resolve, reject) => {
			uni.saveFile({
				tempFilePath: path,
				success: res => resolve(res),
				fail: err => reject(err)
			});
		})
	}

	// 获取本地已保存的文件列表
	const getSaveFileList = function() {
		return new Promise((resolve, reject) => {
			uni.getSavedFileList({
				success: res => resolve(res),
				fail: err => reject(err)
			});
		})
	}

	// 获取本地文件的文件信息。此接口只能用于获取已保存到本地的文件
	const getSaveFileInfo = function(filePath) {
		return new Promise((resolve, reject) => {
			uni.getSavedFileInfo({
				filePath,
				success: res => resolve(res),
				fail: err => reject(err)
			});
		})
	}

	/**
	 * 删除本地存储的文件
	 * 
	 * @param {string} file 
	 */
	const removeSaveFile = function(file) {
		return new Promise((resolve, reject) => {
			uni.removeSavedFile({
				filePath: file,
				success: res => resolve(res),
				fail: err => reject(err)
			});
		})
	}

	// 获取文件信息
	const getInfo = function(filePath) {
		return new Promise((resolve, reject) => {
			uni.getFileInfo({
				filePath,
				success: res => resolve(res),
				fail: err => reject(err)
			});
		})
	}

	return {
		save,
		getInfo,
		getSaveFileList,
		getSaveFileInfo,
		removeSaveFile
	}
})();






// 路由
const route = (() => {
	const redirectTo = function(path) {
		uni.redirectTo({
			url: path
		});
	}

	const navigateTo = function(path) {
		uni.navigateTo({
			url: path
		});
	}

	const navigateBack = function(num) {
		uni.navigateBack({
			delta: num
		});
	}

	const reLaunch = function(path) {
		uni.reLaunch({
			url: path
		});
	}

	const getCurrentPages = function() {
		console.log(getCurrentPages())
	}

	return {
		redirectTo,
		navigateTo,
		navigateBack,
		reLaunch
	}
})();






const system = (() => {
	// 系统信息
	const info = function() {
		return new Promise(resolve => {
			uni.getSystemInfo({
				success: res => resolve(res)
			});
		})
	}

	const canUse = function(str) {
		return uni.canIUse(str);
	}

	// 剪贴板
	const copy = (function() {
		const get = function() {
			return new Promise((resolve, reject) => {
				uni.getClipboardData({
					success: res => resolve(res),
					fail: () => reject()
				});
			})
		}

		/**
		 * @params {string} data 设置系统剪贴板的内容
		 */
		const set = function(data) {
			return new Promise((resolve, reject) => {
				uni.setClipboardData({
					data,
					success: () => resolve(),
					fail: () => reject()
				});
			})
		}

		return {
			get,
			set
		}
	})()

	return {
		info,
		canUse,
		copy,
	}
})()






const canvas = (() => {
	/**
	 * 创建 ctx
	 * 
	 * @params {string} id cav的tag id
	 * @params {object} that (非必填)
	 */
	const create = function(id, that) {
		return uni.createCanvasContext(id, that);
	}

	// 当前画布指定区域的内容导出生成指定大小的图片，并返回文件路径
	const cavToImg = function({
		x = 0,
		y = 0,
		id,
		width,
		height,
		destWidth, // cav输出宽度
		destHeight,
		quality= 0.1 // 图片质量
	}) {
		return new Promise((resolve, reject) => {
			uni.canvasToTempFilePath({
				x,
				y,
				width,
				height,
				destWidth,
				destHeight,
				canvasId: id,
				quality,
				success: res => resolve(res),
				fail: err => reject(err)
			})
		})
	}

	// 像素数据
	const pixel = (function() {
		const get = function({
			x = 0,
			y = 0,
			id,
			width,
			height
		}, that) {
			return new Promise((resolve, reject) => {
				uni.canvasGetImageData({
					canvasId: id,
					x,
					y,
					width,
					height,
					success: res => resolve(res),
					fail: err => reject(err)
				}, that);
			});
		}

		const set = function({
			x = 0,
			y = 0,
			id,
			data,
			width,
			height
		}, that) {
			return new Promise((resolve, reject) => {
				uni.canvasPutImageData({
					canvasId: id,
					x,
					y,
					width,
					height,
					data,
					success: res => resolve(res),
					fail: err => reject(err)
				}, that)
			});
		}

		return {
			get,
			set
		}
	}).call()

	return {
		create,
		cavToImg,
		pixel
	}
})();







const ui = (() => {
	// 显示消息提示框
	const showToast = function({
		title = 'title',
		icon = null,
		image = null,
		mask = false,
		duration = 1500,
		position = null
	} = {}) {
		return new Promise((resolve, reject) => {
			uni.showToast({
				title,
				icon,
				image,
				mask,
				duration,
				success: res => resolve(res),
				fail: err => reject(err)
			});
		})
	}

	return {
		showToast
	}
})();







const plugins = (() => {
	// 获取 服务供应商
	const getProvider = function() {
		return new Promise((resolve, reject) => {
			uni.getProvider({
				service: 'oauth',
				success: res => {
					resolve(res.provider[0])
				},
				fail: err => reject(err)
			});
		})
	}

	// 登录
	const login = async function() {
		const provider = await getProvider();

		return new Promise((resolve, reject) => {
			uni.login({
				provider,
				success: res => resolve(res),
				fail: err => reject(err)
			});
		})
	}

	// 检查登录状态是否过期
	const checkSession = function() {
		return new Promise((resolve, reject) => {
			uni.checkSession({
				success: res => resolve(res),
				fail: err => reject(err)
			})
		})
	}

	// 获取用户信息
	const userInfo = async function() {
		const provider = await getProvider();

		return new Promise((resolve, reject) => {
			uni.getUserInfo({
				provider,
				success: res => resolve(res),
				fail: err => reject(err)
			});
		})
	}

	return {
		login,
		checkSession,
		userInfo
	}
})();







const storage = (() => {
	/**
	 * 从本地缓存中异步获取指定 key 对应的内容。
	 * 
	 * @param {string} key 
	 */
	const get = function(key) {
		return new Promise((resolve, reject) => {
			uni.getStorage({
				key,
				success: res => resolve(res.data),
				fail: err => reject(err)
			});
		})
	}

	/**
	 * 将数据存储在本地缓存中指定的 key 中，会覆盖掉原来该 key 对应的内容，这是一个异步接口。
	 * 
	 * @param {string} key 
	 * @param {string} val 
	 */
	const set = function(key, val) {
		return new Promise((resolve, reject) => {
			uni.setStorage({
				key,
				data: val,
				success: res => resolve(res),
				fail: err => reject(err)
			});
		})
	}

	// 异步获取当前 storage 的相关信息。
	const getInfo = function() {
		return new Promise((resolve, reject) => {
			uni.getStorageInfo({
				success: res => resolve(res),
				fail: err => reject(err)
			});
		})
	}

	/**
	 * 从本地缓存中异步移除指定 key
	 * 
	 * @param {string} key 
	 */
	const remove = function(key) {
		return new Promise((resolve, reject) => {
			uni.removeStorage({
				key,
				success: res => resolve(res),
				fail: err => reject(err)
			});
		})
	}

	// 异步 清理本地数据缓存
	const clear = function() {
		uni.clearStorage();
	}

	return {
		get,
		set,
		getInfo,
		remove,
		clear
	}
})();





export default {
	network,
	media,
	file,
	route,
	system,
	ui,
	canvas,
	plugins,
	storage
}
