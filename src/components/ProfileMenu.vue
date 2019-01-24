<template>
	<div id="con" class="profile-menu-container">
		<a href="#" v-on:click.prevent="showDropDown=!showDropDown">
			<div>Catness</div>
			<img src="" alt="avatar">
			<i :class="{ 'fa-caret-up': showDropDown, 'fa-caret-down': !showDropDown }" class="fa" aria-hidden="true"></i>
		</a>
		<transition name="slide-fade">
			<div class="w4 mt1" v-if="showDropDown" v-click-outside="closeEvent">
				<ul class="menu list pl0 pa0 ma0">
					<li v-for="link in links" class="list">
						<a href="#" class="dd-link pointer hover-bg-moon-gray">{{link.name}}</a>
					</li>
				</ul>
			</div>
		</transition>
	</div>
</template>

<script>

    export default {
        name: "ProfileMenu",
        data() {
            return {
                showDropDown: false,
                links: [
                    {
                        name: "Account"
                    },
                    {
                        name: "Profile"
                    },
                    {
                        name: "Logout"
                    }
                ]
            };
        },
        methods: {
            closeEvent: function () {
                this.showDropDown = false
            }
        }
    }
</script>

<style lang="scss" scoped>
	.profile-menu-container{
		margin-left: auto;
		margin-right: 50px;
	}
	.slide-fade-enter-active {
		transition: all .3s ease;
	}
	.slide-fade-leave-active {
		transition: all .2s ease;
	}
	.slide-fade-enter {
		transform: translateY(-50px);
		opacity: 0;
	}
	.slide-fade-leave-to {
		transform: translateY(-50px);
		opacity: 0;
	}
</style>