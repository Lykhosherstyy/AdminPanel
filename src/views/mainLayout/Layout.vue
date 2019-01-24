<template>
	<div :class="classObj" class="app-wrapper">
		<div v-if="sidebar.opened" class="drawer-bg" @click="handleClickOutside"/>
		<sidebar class="sidebar-container"/>
		<div class="main-container">
			<navbar/>
			<router-view class="animated fadeIn"/>
			<!--<app-main/>-->
		</div>
	</div>
</template>

<script>
	import Navbar from './Components/Navbar.vue'
  import Sidebar from './Components/Sidebar.vue'
    export default {
        name: 'Layout',
        components: {
            Navbar,
            Sidebar,
            // AppMain,
        },
        computed: {
            sidebar() {
                return this.$store.state.app.sidebar
            },
            device() {
                return this.$store.state.app.device
            },
            classObj() {
                return {
                    hideSidebar: !this.sidebar.opened,
                    openSidebar: this.sidebar.opened
                }
            }
        },
        methods: {
            handleClickOutside() {
                this.$store.dispatch('closeSideBar', { withoutAnimation: false })
            }
        }
    }
</script>

<style lang="scss" scoped>
	.app-wrapper {
		position: relative;
		height: 100%;
		width: 100%;
	}
</style>