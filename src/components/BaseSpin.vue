<template>
    <!-- 加载动画 -->
    <div class='base-spin'></div>
</template>

<script>
import { Spin as $Spin, Icon } from 'iview'
import Vue from 'vue';

Vue.component('Icon', Icon);

export default {
    props: {
        isShow: Boolean,
        content: [String, Number]
    },

    methods: {
        show () {
            $Spin.show({
                render: (h) => {
                    return h('div', [
                        h('Icon', {
                            'class': 'demo-spin-icon-load',
                            props: {
                                type: 'ios-loading',
                                size: 18
                            }
                        }),
                        h('div', this.content)
                    ])
                }
            });
        },

        hide () {
            $Spin.hide();
        },
    },

    created () {
        this.isShow && this.show();
    },

    watch: {
        isShow (val) {
            val ? this.show() : this.hide();
        }
    },
}
</script>

<style>
.demo-spin-icon-load {
    animation: ani-demo-spin 1s linear infinite;
}
</style>
