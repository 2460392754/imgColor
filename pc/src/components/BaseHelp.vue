<template>
    <div class='base-help'
         @click="click">
        <Icon type="md-help"
              size="40" />
    </div>
</template>

<script>
import { Icon } from 'iview';

export default {
    props: {
        isShow: Boolean
    },

    methods: {
        click () {
            this.$emit('update:isShow', true);
        }
    },

    components: {
        Icon
    }
}
</script>

<style>
@keyframes baseHelpAnime {
    0% {
        transform: rotate(0deg);
    }
    50% {
        transform: rotate(180deg);
    }
    100% {
        transform: rotate(360deg);
    }
}

.base-help {
    border-radius: 100%;
    background: #f1f14f;
    width: 60px;
    height: 60px;
    text-align: center;
    line-height: 60px;
    color: #cecece;
    cursor: pointer;
    position: fixed;
    right: 10px;
    top: 10px;
    animation: 2s baseHelpAnime infinite;
    transition: color 0.5s, background-color 0.5s;
}

.base-help:hover {
    animation-play-state: paused;
    color: #bbbbbb;
    background: #f5f539;
}
</style>
