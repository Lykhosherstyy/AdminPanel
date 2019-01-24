<template>
	<div>
		<div class="scrollbar-wrapper">
			<sidebar-menu class="menu-wrapper"/>
		</div>
	</div>
</template>

<script>
	import SidebarMenu from '../../../components/Menu.vue'
    export default {
        name: "Sidebar",
				components:{
            SidebarMenu
				}
    }
</script>

<style lang="scss" scoped>
	.scrollbar-wrapper{
		overflow: scroll;
		overflow-x: hidden;
		height: 100%;
	}
</style>