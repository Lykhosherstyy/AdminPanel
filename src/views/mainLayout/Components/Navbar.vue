<template>
	<div class="navbar-container d-flex">
		<hamburger :toggle-click="toogleSidebar" :is-active="sidebar.opened" class="hamburger-container"/>
		<breadcrumb />
		<lang-switcher></lang-switcher>
		<profile-menu />
		<!--<div class="avatar-container" @click="toogleSidebar">df</div>-->
	</div>
</template>

<script>
    import { mapGetters } from 'vuex'
		import Hamburger from '../../../components/Hamburger.vue'
    import Breadcrumb from '../../../components/Breadcrumb.vue';
    import ProfileMenu from '../../../components/ProfileMenu.vue'
    import LangSwitcher from '../../../components/LangSwitcher.vue'
    export default {
        name: "Navbar",
				components:{
            Hamburger,
            Breadcrumb,
            ProfileMenu,
            LangSwitcher
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
		height: 50px;
		line-height: 50px;
		border-bottom: 1px solid rgba(0,0,0,0.2);
	}
</style>