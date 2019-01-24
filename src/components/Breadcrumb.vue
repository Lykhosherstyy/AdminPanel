<template>
	<div class="breadcrumb-container">
		<breadcrumbs-item v-for="(item, index) in this.breadcrumbList" :item="item" :link="index == breadcrumbList.length-1" :key="item.path"></breadcrumbs-item>
	</div>
</template>

<script>
	import BreadcrumbsItem from '../components/BreadcrumbsItem.vue'
    export default {
        name: "Breadcrumb",
				components:{
          BreadcrumbsItem
				},
        data() {
            return {
                breadcrumbList: []
            }
        },
        watch: {
            $route() {
                this.getBreadcrumb()
            }
        },
        created() {
            this.getBreadcrumb()
        },
        methods: {
            getBreadcrumb() {
                const matched = this.$route.matched.filter(item => item.name)

                this.breadcrumbList = matched.filter(item => item.meta.breadcrumb )

            }
        }
    }
</script>

<style lang="scss" scoped>
	.breadcrumb-container{
		display: inline-block;
		font-size: 14px;
		line-height: 50px;
		margin-left: 10px;
	}
</style>