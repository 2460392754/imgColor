<template>
    <div class='boot'>
        <div class='btns'>
            <Button type="primary"
                    @click="clickProxy('mainColor')">图片主色调</Button>
            <Button type="primary"
                    @click="clickProxy('ascii')">图片转Ascii</Button>
        </div>
    </div>
</template>

<script>
import { Button } from 'iview';

export default {
    methods: {
        clickProxy (type) {
            this.$router.push('/' + type)
        },
    },

    components: {
        Button
    }
}
</script>

<style>
.boot > .btns {
    position: fixed;
    bottom: 200px;
    left: 50%;
    transform: translateX(-50%);
    width: max-content;
}

.boot > .btns > button {
    margin: 0 20px;
}
</style>
