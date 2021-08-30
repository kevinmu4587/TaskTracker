<template>
    <button :style="{background: colour}" class="btn"
    @click="onClick()">
        {{text}}
    </button>
</template>

<script>
export default {
    name: 'Button',
    props: {
        text: String,
        colour: String
    },
    methods: {
        onClick() {
            this.$emit('btn-click')
        }
    }
}
</script>

<style scoped>

</style>