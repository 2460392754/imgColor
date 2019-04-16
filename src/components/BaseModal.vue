<template>
    <Modal v-model="copyIsShow"
           class="base-modal">
        <div slot="header"
             class='header'>
            <Icon type="md-information-circle"
                  size="28" />
            <slot name="header"></slot>
        </div>

        <slot name="content"></slot>

        <div slot="footer">
            <slot name="footer"></slot>
        </div>
    </Modal>
</template>

<script>
import { Modal, Icon } from 'iview';

export default {
    props: {
        isShow: Boolean,
        title: String
    },

    data () {
        return {
            copyIsShow: this.isShow
        }
    },

    watch: {
        isShow (val) {
            this.copyIsShow = val;
        },

        copyIsShow (val) {
            this.$emit('update:isShow', val);
        }
    },

    components: {
        Modal,
        Icon
    }
}
</script>

<style>
.base-modal .ivu-modal-wrap {
    display: flex;
    justify-content: center;
    align-items: center;
}

.base-modal .ivu-modal {
    top: 0px;
}

.base-modal img {
    width: 80%;
    margin: auto;
    display: block;
    box-shadow: 0 0 3px 0px #e8e8e8;
    margin-bottom: 20px;
}
.base-modal .header {
    display: flex;
    align-items: center;
}

.base-modal .ivu-modal-header,
.base-modal .ivu-modal-footer {
    border: none;
}

.base-modal .ivu-icon {
    color: #2d8cf0;
}

.base-modal .slider,
.base-modal .downloadName {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.base-modal .ivu-slider,
.base-modal .ivu-input-type {
    width: 87%;
}

.base-modal p,
.base-modal .color {
    padding: 7px 0;
}

.base-modal .ivu-modal-body > div > div > div:nth-of-type(2) {
    margin-top: 20px;
}

.base-modal .ivu-color-picker .ivu-btn-default {
    display: none;
}
</style>
