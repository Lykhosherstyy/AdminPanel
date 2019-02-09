<template>
	<div class="breadcrumb-item">
		<span v-if="checkIfParentRoute()">{{ generateTitle('menu.' +  item.meta.breadcrumb.title.toLowerCase()) }}</span>
		<router-link v-else :to="item.path" class="breadcrumb-item-link">{{ generateTitle('menu.' +  item.meta.breadcrumb.title.toLowerCase()) }}</router-link>
	</div>
</template>

<script>
    import { generateTitle } from "../utils/helpers";
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
					},
					generateTitle
				},
        created() {
            console.log();
        },
    }
</script>

<style lang="scss" scoped>
	.breadcrumb-item{
		float: left;
		& + & {
			padding-left: 0.5rem;
			&::before {
				display: inline-block;
				padding-right: 0.5rem;
				color: #6c757d;
				content: "/";
			}
		}
	}
</style>