<template>
	<div class="navbar-container">
		<hamburger :toggle-click="toogleSidebar" :is-active="sidebar.opened" class="hamburger-container"/>
		<breadcrumb class="breadcrumb-container"/>
		<profile-menu />
		<!--<div class="avatar-container" @click="toogleSidebar">df</div>-->
	</div>
</template>

<script>
    import { mapGetters } from 'vuex'
		import Hamburger from '../../../components/Hamburger.vue'
    import Breadcrumb from '../../../components/Breadcrumb.vue';
    import ProfileMenu from '../../../components/ProfileMenu.vue'
    export default {
        name: "Navbar",
				components:{
            Hamburger,
            Breadcrumb,
            ProfileMenu
				},
        computed: {
            ...mapGetters([
                'sidebar',
            ])
        },
        methods: {
            toogleSidebar() {
                this.$store.dispatch('TOGGLE_SIDEBAR');
            }
        }
    }
</script>

<style lang="scss" scoped>
	.navbar-container{
		display: flex;
		flex-direction: row;
	}
</style>