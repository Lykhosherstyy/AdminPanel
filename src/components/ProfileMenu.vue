<template>
	<div class="user-menu-container">
		<el-dropdown>
			<div class="user-details d-flex flex-align">
				<span class="user-role">{{ getRole }}</span>
				<img src="../static/img/root_profile_img.jpg" class="user-avatar" alt="avatar">
				<span class="dropdown-caret" :class="{up: isActive}"></span>
			</div>

			<el-dropdown-menu slot="dropdown">
				<el-dropdown-item>
					<router-link to="profile" class="bl-link profile-link">{{ $t("profile.index") }}</router-link>
				</el-dropdown-item>
				<el-dropdown-item>
					<router-link to="settings" class="bl-link profile-link">{{ $t("profile.settings") }}</router-link>
				</el-dropdown-item>
				<el-dropdown-item divided>
					<a class="bl-link profile-link" @click="logout">{{ $t("profile.logout") }}</a>
				</el-dropdown-item>
			</el-dropdown-menu>
		</el-dropdown>
	</div>
</template>

<script>
    import ElDropdown from '../components/ElDropdown.vue'
    import ElDropdownMenu from '../components/ElDropdownMenu.vue'
    import ElDropdownItem from '../components/ElDropdownItem.vue'

    export default {
        name: "ProfileMenu",
				components:{
            ElDropdown,
            ElDropdownMenu,
            ElDropdownItem
				},
        data() {
            return {
                isActive: false,
            };
        },
				computed:{
            getRole(){
                return this.$store.getters.role;
						}

				},
				mounted(){
            this.$on('toggle-open', this.toggleisActive);
				},
				methods:{
            toggleisActive(){
                this.isActive = !this.isActive;
						},
            logout(){
                this.$store.dispatch('LOGOUT').then(() => {
                    console.log('logout');
                    this.$router.push('/login');
                })

            }
				},
				watch:{
            isActive() {

						}
				}
    }
</script>

<style lang="scss" scoped>
	.user-menu-container{
		position: relative;
		height: 50px;
		margin-left: 20px;
		margin-right: 50px;
		align-self: center;
	}
	.user-role{
		padding: 0 5px;
		font-size: 12px;
		font-weight: bold;
	}
	.user-avatar{
		cursor: pointer;
		width: 40px;
		height: 40px;
		border-radius: 10px;
	}
	.profile-link{
		padding: 0 10px;
		color: #000;
		transition: all .2s ease;
		&:hover{
			color: #fff;
			background-color: #1f2d3d;
		}
	}
</style>