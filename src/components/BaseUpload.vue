<template>
    <div class='base-upload'>
        <Upload multiple
                action=''
                type="drag"
                :before-upload="beforeUpload">
            <div class='content'>
                <Icon type="ios-cloud-upload"></Icon>
            </div>
        </Upload>
    </div>
</template>

<script>
import { Upload, Icon } from 'iview'

export default {
    props: {
        params: {
            type: Object,
            default: () => { }
        },
        callback: Function
    },

    methods: {
        // 再图片提交之前，停止上传
        async beforeUpload (file) {
            const filePath = window.URL.createObjectURL(file);

            this.params.size = file.size;
            this.params.name = file.name;
            this.params.filePath = filePath;
            this.callback();

            return Promise.reject();
        },
    },

    components: {
        Upload,
        Icon
    }
}
</script>

<style>
.base-upload {
    color: #3399ff;
    width: max-content;
    margin: 50px auto;
}

.base-upload .content {
    padding: 20px 0;
}

.ivu-upload-drag {
    border: none;
    height: 200px;
    width: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #f5f5f5;
    border-radius: 100%;
    transition: background-color 0.5s;
    cursor: pointer;
}

.ivu-upload-drag:hover {
    border: none;
    background: #efefef;
}

.ivu-upload-drag .ivu-icon {
    font-size: 52px;
    transition: all 0.5s cubic-bezier(0.53, -1.34, 0.74, 2.57);
}

.ivu-upload-drag:hover .ivu-icon {
    font-size: 100px;
}
</style>
