<template>
    <div class='mainColor'>
        <h2 id='title'>获取图片主色调</h2>

        <!-- 上传 -->
        <base-upload :params="imgParams"
                     :callback="uploadSuccessCallback" />

        <!-- 帮助按钮 -->
        <base-help :isShow.sync="modal.help" />

        <!-- 帮助对话框 -->
        <base-modal :isShow.sync="modal.help">
            <h2 slot="header">注意事项</h2>
            <div slot='content'>
                <h3>如何使用</h3>
                <p>点击上传按钮，上传图片即可</p>
                <br />
                <h3>目前bug</h3>
                <p>透明显示为白色</p>
            </div>
        </base-modal>

        <Card>
            <img :src="imgParams.filePath">
            <div class="echarts"></div>
        </Card>

        <!-- 加载中 -->
        <base-spin :isShow="spinIsShow"
                   content="开始图片转换, 可能会出现卡顿"></base-spin>
    </div>
</template>

<script>
import { Card } from 'iview';
import BaseUpload from '@/components/BaseUpload';
import BaseHelp from '@/components/BaseHelp';
import BaseModal from '@/components/BaseModal';
import BaseSpin from '@/components/BaseSpin';
import echarts from "echarts";
import rgbHex from "rgb-hex";
import computed from "@/js/computed.js";

export default {
    data () {
        return {
            imgParams: {
                size: null,
                name: null,
                filePath: null
            },
            modal: {
                help: false
            },
            spinIsShow: false
        };
    },

    methods: {
        // 图片上传成功回调
        uploadSuccessCallback () {
            this.spinIsShow = true;
            console.log(this.spinIsShow)
            this._echartsInit();
        },

        // rgb to 16进制
        _rgbToHex (rgba) {
            return "#" + rgbHex(`rgba(${rgba})`);
        },

        // 数据格式化
        _colorArrFormat (arr) {
            let tempArr = [];

            for (let item of arr) {
                let rgbaArr = item[0].split(",");

                rgbaArr.length = 3;
                rgbaArr.join(",");

                const Hex = this._rgbToHex(rgbaArr);
                const count = item[1];

                tempArr.push({
                    name: Hex,
                    value: count
                });
            }

            return this._echartsParamsInit(tempArr);
        },

        // echarts 初始化
        async _echartsInit () {
            const colorArr = await computed.mainColor(this.imgParams.filePath),
                echartsDom = echarts.init(document.querySelector(".mainColor .echarts")),
                options = this._colorArrFormat(colorArr);

            echartsDom.setOption(options)
            this.spinIsShow = false;
        },

        // echarts 配置初始化
        _echartsParamsInit (arr) {
            const tempObj = {
                tooltip: {
                    trigger: "item",
                    formatter: "{a} <br/>{b}: {c} ({d}%)"
                },
                legend: {
                    orient: "vertical",
                    top: "middle",
                    x: "right",
                    data: []
                },
                series: [
                    {
                        name: "颜色",
                        type: "pie",
                        radius: ["50%", "70%"],
                        avoidLabelOverlap: false,
                        label: {
                            normal: {
                                show: false,
                                position: "center"
                            },
                            emphasis: {
                                show: true,
                                textStyle: {
                                    fontSize: "30",
                                    fontWeight: "bold"
                                }
                            }
                        },
                        // 阴影
                        itemStyle: {
                            shadowBlur: 100,
                            shadowOffsetX: 0,
                            shadowOffsetY: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.1)'
                        },
                        labelLine: {
                            normal: {
                                show: false
                            }
                        },
                        data: []
                    }
                ],
                color: []
            };

            for (const item of arr) {
                const { name } = item;

                tempObj.legend.data.push(name);
                tempObj.color.push(name);
                tempObj.series[0].data.push(item);
            }

            return tempObj;
        },
    },

    components: {
        BaseUpload,
        BaseHelp,
        BaseModal,
        BaseSpin,
        Card,
    }
};
</script>

<style>
.mainColor img {
    max-width: 300px;
}

.mainColor .ivu-card {
    max-width: 1000px;
    margin: auto;
}

.mainColor .ivu-card-body {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: center;
}

.mainColor .echarts,
.mainColor #g2 {
    height: 400px;
    max-width: 600px;
    width: 100%;
}
</style>
