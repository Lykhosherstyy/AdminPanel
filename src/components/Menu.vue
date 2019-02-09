<template>
	<div>
		<nav>
			<ul role="menubar" class="nav sidebar-nav flex-column">
				<template v-for="(route, index) in app.menu">
					<menu-item v-if="canAccess(route)" :item="route" :index="index" />
				</template>
			</ul>
		</nav>
	</div>
</template>

<script>

    import { mapState } from "vuex";
    import MenuItem from "./MenuItem.vue";

    export default {
        name: "Menu",
				components:{
            MenuItem
				},
				computed:{
            ...mapState(["app", "auth"])
				},
				methods:{
            canAccess(item){
								if(item.permisions.length){
                    return item.permisions.includes(this.auth.role);
								}
								return !item.permisions.length
						}
				}
    }
</script>

<style lang="scss" scoped>

</style>