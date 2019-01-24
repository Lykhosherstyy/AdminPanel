<template>
	<div class="breadcrumb-item">
		<span v-if="checkIfParentRoute()">{{ item.meta.breadcrumb.title }}</span>
		<router-link v-else :to="item.path" class="breadcrumb-item-link">{{ item.meta.breadcrumb.title }}</router-link>
	</div>
</template>

<script>
    export default {
        name: "BreadcrumbsItem",
				data(){
            return {

						}
				},
        props: {
            item: {
                type: Object,
                required: true
            },
            link:{
                type:Boolean,
								required: true
						}
        },
				methods:{
					checkIfParentRoute(){

							return !!(this.item.path.split('/').length - 4)
					}
				},
        created() {
            console.log();
        },
    }
</script>

<style lang="scss" scoped>
	.breadcrumb-item{
		float: left;
	}
</style>