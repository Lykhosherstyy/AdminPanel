<template>
	<button>this.text</button>
</template>

<script>
    export default {
        name: "Button",
				props:{
            text:{
                type: String,
								required: true
						}
				}
    }
</script>

<style scoped>

</style>