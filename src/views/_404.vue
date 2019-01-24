<template>
	<errorLayout>
		<h1 :class="">
			404
			<template v-if="resource">
				{{ resource }}
			</template>
			Not Found
		</h1>
	</errorLayout>
</template>

<script>
    import errorLayout from '../layouts/main.vue'
    export default {
        page: {
            title: '404',
            meta: [{ name: 'description', content: '404' }],
        },
        components: { errorLayout },
        props: {
            resource: {
                type: String,
                default: '',
            },
        },
    }
</script>

<style lang="css" scope>
	.title {
		text-align: center;
	}
</style>