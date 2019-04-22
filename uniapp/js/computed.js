import $uni from '@/utils/uni/api.js';

const computed = (() => {
	// 图片主色
	const mainColor = function(id, path) {
		return new Promise(async resolve => {
			const {
				data
			} = await _init(id, path);

			const rgbaArr = _dataFormatRGB(data),
				colorArr = _computedColor(rgbaArr);

			resolve(colorArr);
		})
	}

	// 图片转ascii
	const ascii = function({
		cavId,
		path,
		cavHtmlTempId,
		scale = 1,
		action = 2
	}) {
		return new Promise(resolve => {
			let width, height;

			_init(cavId, path).then(obj => {
				obj.data = _dataFormatRGB(obj.data);
				width = obj.width;
				height = obj.height;

				const opts = {
					...obj,
					id: cavHtmlTempId,
					action,
					scale,
				}

				_computedAscii(opts).then(obj => resolve(obj));
			})
		});
	}

	// 初始化,h5有bug，ctx draw错误
	const _init = function(id, imgPath) {
		return new Promise(async resolve => {
			const ctx = $uni.canvas.create(id, this);
			let width, height;

			Promise.resolve()
				// 获取图片宽、高
				.then(() => {
					return new Promise(async _resolve => {
						const retObj = await $uni.media.img.getInfo(imgPath);

						width = retObj.width;
						height = retObj.height;

						_resolve();
					})
				})
				// 删除文件缓存
				.then(() => {
					// #ifndef H5
					return new Promise(async _resolve => {
						const {
							fileList
						} = await $uni.file.getSaveFileList();

						for (let items of Object.values(fileList)) {
							await $uni.file.removeSaveFile(items.filePath);
						}

						_resolve();
					});
					// #endif
				})
				// 清空cav
				.then(() => {
					return new Promise(_resolve => {
						ctx.draw(false, _resolve)
					})
				})
				// 绘制图片
				.then(() => {
					return new Promise(_resolve => {
						ctx.drawImage(imgPath, 0, 0, width, height);
						ctx.draw(false, _resolve);
					})
				})
				// 获取像素点,android有bug, cav获取像素缩放比例错误
				.then(async () => {
					// #ifdef APP-PLUS
					width *= 2.75,
						height *= 2.75
					// #endif

					const opts = {
							id,
							width,
							height
						},
						{
							data
						} = await $uni.canvas.pixel.get(opts);

					resolve({
						data,
						width,
						height
					})
				})
		});
	}

	// 格式化 RGBA
	const _dataFormatRGB = function(data) {
		let arr = [];
		let tempArr = [];

		for (let i = 0, len = data.length; i < len; i++) {
			tempArr.push(data[i]);
			tempArr.length === 4 && (arr.push(tempArr.join(',')), tempArr = []);
		}
		// console.log(JSON.stringify(arr))

		return arr;
	}

	// 计算颜色
	const _computedColor = function(rgbaArr) {
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

	// 计算 ascii值,ascii图片分辨率是原先的15倍
	const _computedAscii = function({
		data,
		width,
		height,
		id,
		action,
		scale
	}) {
		const asciiTwoArr = [
				["@", "#", "&", "$", "%", "*", "o", "!", ";", "."],
				["M", "N", "H", "Q", "$", "O", "C", "?", "7", ">", "!", ":", "–", ";", "."],
				["@", "#", "%", "M", "N", "H", "Q", "$", "O", "C", "?", "7", ">", "!", ":", "-", ";", "."],
				["q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "[", "]", "a", "s", "d", "f", "g", "h", "j", "k", "l", ";",
					"'", "z", "x", "c", "v", "b", "n", "m", ",", ".", "/", "`", "~", "!", "@", "#", "$", "%", "^", "&", "<", "(",
					")", "*", "+", "{", "}", ":", "\"", "?", ">", " ", "|"
				],
				["$", "@", "B", "%", "8", "&", "W", "M", "#", "*", "o", "a", "h", "k", "b", "d", "p", "q", "w", "m", "Z", "O",
					"0", "Q", "L", "C", "J", "U", "Y", "X", "z", "c", "v", "u", "n", "x", "r", "j", "f", "t", "/", "\\", " | ", "(",
					")", "1", "{ ", "}", "[", "]", " ? ", " - ", "_", " + ", "~", " < ", " > ", "i", "!", "l", "I", "; ", ": ",
					", ", "\"", "^", "`", "'", "."
				],
				["/", "|", "(", ")", "1", "{", "}", "$", "@", "B", "%", "8", "&", "W", "M", "#", "Z", "O", "0", "Q", "L", "C",
					"J", "U", "Y", "X", "*", "h", "k", "b", "d", "p", "q", "w", "m", "o", "a", "h", "k", "b", "d", "p", "q", "w",
					"m", "z", "c", "v", "u", "n", "x", "r", "j", "f", "t", "[", "]", "?", "-", "_", "+", "~", "<", ">", "i", "!",
					"l", "I", ";", ":", ",", "\"", "^", "`", "'", "."
				],
			],
			asciiArr = asciiTwoArr[action],
			asciiArrLen = asciiArr.length;

		let tempStr = '',
			tempStr2 = '',
			path;

		return new Promise(async resolve => {
			const ctx = $uni.canvas.create(id, this);

			Promise.resolve()
				// 设置cav参数, 等宽字体
				.then(() => {
					return new Promise(_resolve => {
						ctx.font = "10px Consolas, monospace";
						ctx.setFillStyle('#fff')
						ctx.fillRect(0, 0, width * 15, height * 15)
						ctx.setFillStyle('#000')
						ctx.draw(false, _resolve)
					})
				})
				// 填充文字数据,h5缩放比例 1.364:1
				.then(() => {
					return new Promise(_resolve => {
						// #ifdef H5
						ctx.scale(1.364, 1);
						// #endif

						// #ifdef APP-PLUS
						ctx.scale(0.45, 0.363);
						// #endif

						console.log(data.length)
						for (let i = 0, len = data.length; i < len; i++) {
							const agbaArr = data[i].split(','),
								avg = (Number(agbaArr[0]) + Number(agbaArr[1]) + Number(agbaArr[2])) / 3,
								pos = parseInt((avg / 255) * (asciiArrLen - 1));

							tempStr2 += asciiArr[pos] + asciiArr[pos];

							if ((i + 1) % width === 0 && i !== 0) {
								ctx.fillText(tempStr2, 0, (i + 1) / width * 15);
								tempStr2 = '';
							}
						}

						ctx.draw(true, _resolve);
					});
				})
				// cav转图片
				.then(() => {
					console.log('cav转图片')
					return new Promise(_resolve => {
						width *= 15;
						height *= 15;

						const destWidth = width * scale,
							destHeight = height * scale,
							opts = {
								id,
								width,
								height,
								destWidth,
								destHeight,
							}
						// #ifndef H5
						// h5中 每个字符的宽高比大概是1:1.37
						opts.width *= 0.73;
						// #endif

						// #ifdef APP-PLUS
						//uniapp里android里有bug，cav获取像素点宽和高大概设置成其他的平台的2.75倍
						opts.destWidth /= 2.75;
						opts.destHeight /= 2.75;
						// #endif
						
// 						ctx.draw(true, () => {
// 							console.log(4)
// 							_resolve(opts);
// 						});
						_resolve(opts);
					})
				})
				// 返回参数
				.then(async opts => {
					console.log('返回参数')
					// ctx.draw(true, async () => {
						const {
							tempFilePath
						} = await $uni.canvas.cavToImg(opts);

						let size = null;

						// #ifndef H5
						const retObj = await $uni.file.getInfo(tempFilePath);
						size = retObj.size;
						// #endif

						path = tempFilePath;

						resolve({
							path: tempFilePath,
							size,
							width,
							height
						});
					// })
				})
		});
	}

	return {
		mainColor,
		ascii
	}
})();

export default computed
