<template>
	<transition name="slide-fade">
		<div class="dropdown-menu" :class="{'right-side': rightSide}" v-if="show">
			<ul class="dropdown-menu-list">
				<slot></slot>
			</ul>
			<div class="dropdown-menu-arrow"></div>
		</div>
	</transition>
</template>

<script>
    export default {
        name: "ElDropdownMenu",
				props:{
            rightSide: Boolean
				},
				data(){
            return {
                show: false
						}
				},
        created() {
            this.$on('visible', val => {
                this.show = val;
            });
        },
        watch: {
            show() {

						}
        },
    }
</script>

<style lang="scss" scoped>
	.dropdown-menu{
		position: absolute;
		top: 100%;
		left: 0;
		min-width: 100%;
		margin-top: 10px;
		background-color: #fff;
		box-shadow: 0px 0px 1px 0px rgba(0,0,0,0.3);
		border-radius: 4px;
		z-index: 20;
		&.right-side{
			left: auto;
			right:0;
			.dropdown-menu-arrow{
				left: 80%;
			}
		}
		.dropdown-menu-arrow{
			position: absolute;
			top: -6px;
			left: 20%;
			display: block;
			width: 0;
			height: 0;
			border-left: 6px solid transparent;
			border-right: 6px solid transparent;
			border-bottom: 6px solid #0000001f;
			&:before{
				content: " ";
				position: absolute;
				display: block;
				width: 0;
				height: 0;
				top: 1px;
				left: -6px;
				border-left: 6px solid transparent;
				border-right:6px solid transparent;
				border-bottom:6px solid #fff
			}
		}
	}
	.dropdown-menu-list{
		margin: 10px 0;
	}

	.slide-fade-enter-active {
		transition: all .3s ease;
	}
	.slide-fade-leave-active {
		transition: all .2s ease;
	}
	.slide-fade-enter {
		transform: translateY(-5px);
		opacity: 0;
	}
	.slide-fade-leave-to {
		transform: translateY(-5px);
		opacity: 0;
	}
</style>