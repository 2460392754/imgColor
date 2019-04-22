<template>
    <div class="ascii">
        <h2 id='title'>图片转Ascii</h2>

        <!-- 上传 -->
        <base-upload :params="imgParams.before"
                     :callback="uploadSuccessCallback"></base-upload>

        <!-- 帮助按钮 -->
        <base-help :isShow.sync="modal.help"></base-help>

        <!-- 隐藏的canvas -->
        <div class="cavHide"
             :style="{color:imgParams.after.color}">
            <pre></pre>
        </div>

        <!-- 下载按钮 -->
        <a v-show="false"
           :download="imgParams.after.name"
           :href="imgParams.after.filePath"
           id='download'></a>

        <!-- 加载中 -->
        <base-spin :isShow="spinIsShow"
                   content="开始图片转换, 可能会出现卡顿"></base-spin>

        <!-- 帮助对话框 -->
        <base-modal :isShow.sync="modal.help">
            <h2 slot="header">注意事项</h2>
            <div slot='content'>
                <h3>如何使用</h3>
                <p>点击上传按钮，上传图片等待转换完成即可</p>
                <br />
                <h3>如何下载</h3>
                <p>转换完成会弹出下载对话框,点击下载即可(图片过大，下载会延迟)</p>
                <br />
                <h3>上传或图片转换过程中产生长时间卡顿</h3>
                <p>图片分辨率过大，计算过程中造成线程阻塞，从而使浏览器出现长时间卡顿或未响应</p>
                <br />
                <h3>如何解决卡顿</h3>
                <p>1.渣机勿用 2.耐心等待 3.使用任务管理器结束浏览器进程</p>
                <br />
                <h3>为什么上传的图片比下载时图片的分辨率和占用空间都要大</h3>
                <p>原本图片中的像素大小是1px，经过处理每个像素转换成字符后，像素比大小是18px。从而使分辨率和占用空间都比原先要大的多</p>
                <br />
                <h3>目前bug</h3>
                <p>1.无法生成分辨率过大的图片 2.线程阻塞无法停止</p>
            </div>
        </base-modal>

        <!-- 参数对话框 -->
        <base-modal :isShow.sync="modal.params">
            <h2 slot="header">当前图片参数数据</h2>
            <div slot="content">
                <img :src="imgParams.before.filePath">
                <div>
                    <div>
                        <h3>修改之前的数据</h3>
                        <p>名称: {{imgParams.before.name}}</p>
                        <p>大小: {{imgParams.before.size}}</p>
                        <p>分辨率: {{imgParams.before.resolution.width}}x{{this.imgParams.before.resolution.height}}</p>
                    </div>
                    <div>
                        <h3>修改之后的数据 (参数可能有误差，已转换后的参数为准)</h3>
                        <div class='slider'>
                            <span>缩放比例: </span>
                            <Slider v-model="imgParams.after.slider"
                                    :min="0.1"
                                    :max="2"
                                    :step="0.1"
                                    show-stops></Slider>
                        </div>
                        <div class='slider'>
                            <span>填充方案: </span>
                            <Slider v-model="imgParams.after.action"
                                    :min="1"
                                    :max="6"
                                    :step="1"
                                    show-stops>
                            </Slider>
                        </div>
                        <div class='color'>
                            <span>颜色: </span>
                            <ColorPicker v-model="imgParams.after.color"
                                         size="small" />
                        </div>
                        <p>大小: {{imgParams.after.size}}</p>
                        <p>分辨率: {{imgParams.after.resolution.width}}x{{imgParams.after.resolution.height}}</p>
                    </div>
                </div>
            </div>
            <div slot="footer">
                <Button @click="_modalHide('params')">取消</Button>
                <Button type="primary"
                        @click="_modalHide('params');_modalOk()">开始转换</Button>
            </div>
        </base-modal>

        <!-- 下载框 -->
        <base-modal :isShow.sync="modal.download">
            <h2 slot="header">ascii图片参数数据</h2>
            <div slot="content">
                <img :src="imgParams.after.filePath" />
                <div>
                    <div class='downloadName'>
                        <span>下载名称: </span>
                        <Input v-model="imgParams.after.name" />
                    </div>
                    <p>缩放比例: {{imgParams.after.slider}}</p>
                    <p>填充方案: {{imgParams.after.action}}</p>
                    <p>大小: {{imgParams.after.size}}</p>
                    <p>分辨率: {{imgParams.after.resolution.width}}x{{imgParams.after.resolution.height}}</p>
                    <p>总耗时: {{time.end - time.start}}ms</p>
                    <h3>(图片效果已实物为准)</h3>
                </div>
            </div>
            <div slot="footer">
                <Button @click="_modalHide('download')">取消</Button>
                <Button type="primary"
                        @click="_modalHide('download');_downloadModalOk()">开始下载</Button>
            </div>
        </base-modal>
    </div>
</template>

<script>
import {
    Message as $Message,
    Modal as $Modal,
    Slider,
    ColorPicker,
    Button,
    Input
} from 'iview'
import BaseUpload from "@/components/BaseUpload";
import BaseSpin from '@/components/BaseSpin';
import BaseModal from '@/components/BaseModal';
import BaseHelp from '@/components/BaseHelp';
import computed from "@/js/computed.js";

export default {
    data () {
        return {
            imgParams: {
                // 上传的图片
                before: {
                    filePath: null,
                    size: null,
                    name: null,
                    resolution: {
                        width: null,
                        height: null
                    }
                },

                // 转换成 ascii 图片
                after: {
                    filePath: null,
                    slider: 1,
                    action: 3,
                    name: null,
                    size: null,
                    color: '#000000',
                    resolution: {
                        width: null,
                        height: null
                    }
                }
            },
            modal: {
                params: false,
                download: false,
                help: false
            },
            downloadParams: {
                filePath: null,
                name: null
            },
            time: {
                start: null,
                end: null
            },
            spinIsShow: false
        };
    },

    methods: {
        // 图片转ascii
        async _imgToAscii () {
            this.time.start = new Date().getTime();

            const { filePath } = this.imgParams.before,
                { slider, action } = this.imgParams.after,
                afterObj = await computed.ascii({
                    filePath,
                    slider,
                    action: action - 1
                });

            this.imgParams.after.filePath = afterObj.filePath;
            this.imgParams.after.size = this._sizeFormat(afterObj.size);
            this.imgParams.after.name = `img_${this.time.start}.png`;
            this.spinIsShow = false;
            this.time.end = new Date().getTime();
            $Message.success('加载完成');

            this._popupDownloadModal();
        },

        // 图片上传成功回调
        uploadSuccessCallback () {
            $Message.success('图片上传完成');
            this._popupModal();
        },






        // 隐藏 对话框
        _modalHide (type) {
            this.modal[type] = false;
        },

        // 弹出 参数对话框
        async _popupModal () {
            const { size, filePath } = this.imgParams.before,
                { slider } = this.imgParams.after;

            this.imgParams.before.size = this._sizeFormat(size);
            this.imgParams.before.resolution = await this._imgResolution(filePath);

            this.imgParams.after.size = this._scaleSize(size, slider);
            this.imgParams.after.resolution = this._imgComputedResolution(slider);

            this.modal.params = true;
        },

        // 确认 参数对话框
        _modalOk () {
            this._modalWarn().then(() => {
                this.spinIsShow = true;
                setTimeout(this._imgToAscii, 1000);
            }).catch(() => $Message.warning('已取消转换'));
        },

        // 图片分辨率过大 警告
        _modalWarn () {
            return new Promise((resolve, reject) => {
                const { width, height } = this.imgParams.after.resolution;

                if (width * height < 10E7) return resolve();

                setTimeout(() => {
                    $Modal.confirm({
                        title: '转换后图片分辨率过大',
                        content: '总像素大小已过亿,可能会造成浏览器卡顿或未响应，或者图片转换错误',
                        okText: '继续转换',
                        onOk: () => resolve(),
                        onCancel: () => reject()
                    });
                }, 1500);
            })
        },

        // 弹出 下载对话框
        _popupDownloadModal () {
            this.modal.download = true;
        },

        // 确认 下载对话框
        _downloadModalOk () {
            $Message.success('开始下载(可能会有延迟)');
            document.getElementById('download').click();
            this.imgParams.after.filePath = null;
        },










        /**
         * 大小格式转换
         * 
         * @param {number} size 图片大小
         * @return {string} 
         */
        _sizeFormat (size) {
            const arr = ['B', 'KB', 'MB'];

            if (size >= 10E5) {
                size = parseInt(size / 10E5) + arr[2];
            } else if (size >= 10E2) {
                size = parseInt(size / 10E2) + arr[1];
            } else {
                size += arr[0];
            }

            return size;
        },

        // 图片缩放后大小，正常缩放比例下 分辨率是原先的20倍
        _scaleSize (size, scale) {
            const obj = {
                '0.1': 0.051,
                '0.2': 0.139,
                '0.3': 0.260,
                '0.4': 0.393,
                '0.5': 0.5,
                '0.6': 0.976,
                '0.7': 0.976,
                '0.8': 1.259,
                '0.9': 1.046,
                '1': 1,
                '1.1': 1.287,
                '1.2': 1.365,
                '1.3': 1.504,
                '1.4': 1.833,
                '1.5': 1.944,
                '1.6': 2.199,
                '1.7': 3.601,
                '1.8': 4.217,
                '1.9': 3.958,
                '2': 4.324
            }

            size = String(size);

            if (size.indexOf('MB') !== -1) size = parseInt(size) * 10E5;
            else if (size.indexOf('KB') !== -1) size = parseInt(size) * 10E2;
            else size = parseInt(size);

            size *= obj[scale] * 20.377;

            return this._sizeFormat(size);
        },

        /**
         * 获取 图片分辨率
         * 
         * @param {string} filePath 图片路径
         * @return {object} 图片分辨率
         */
        _imgResolution (filePath) {
            return new Promise(resolve => {
                const img = new Image();

                img.src = filePath;
                img.onload = () => {
                    resolve({
                        width: img.width,
                        height: img.height
                    });
                };
            })
        },

        /**
         * 计算 修改之后的图片分辨率，正常缩放比例下 分辨率是原先的18倍
         * 
         * @param {number} scale 缩放比例
         * @return {object} 图片缩放后的分辨率
         */
        _imgComputedResolution (scale) {
            const { width, height } = this.imgParams.before.resolution;

            return {
                width: parseInt(width * 18 * scale),
                height: parseInt(height * 18 * scale)
            };
        },

        // 下载文件
        download () {
            if (this.downloadParams.filePath === null) {
                $Message.warning("图片未加载或正在加载中...");
                return;
            }

            const time = new Date().getTime();
            this.downloadParams.name = `img_${time}.png`;
        },
    },

    watch: {
        'imgParams.after.slider' (slider) {
            const { size } = this.imgParams.before;

            this.imgParams.after.resolution = this._imgComputedResolution(slider);
            this.imgParams.after.size = this._scaleSize(size, slider);
        }
    },

    components: {
        BaseUpload,
        BaseSpin,
        BaseModal,
        BaseHelp,
        Slider,
        ColorPicker,
        Button,
        Input
    }
};
</script>

<style>
.ascii .cavHide {
    height: 0;
    overflow-y: hidden;
}

.ascii #htmlCav {
    width: max-content;

    /* pre标签格式化文本后，每个字符 1.36 width ≈ 1 height */
    transform: scaleX(1.36);
    transform-origin: 0 0;
}
</style>
