<template>
	<div class="nav-item-wrapper">
		<li class="nav-item nav-dropdown" v-if="item.children">
			<div class="nav-link nav-dropdown-toggle" @click="toggle()">{{ item.name }}</div>
			<ul class="nav nav-dropdown-items" >
				<transition-group name="list">
					<li class="nav-item" v-for="(child) in (opened ? item.children : [])" :key="child.name">
						<router-link :to="child.path" class="nav-link pl-4">{{ child.name }}</router-link>
					</li>
				</transition-group>
			</ul>
		</li>
		<li class="nav-item" v-else>
			<router-link :to="item.path" class="nav-link">{{ item.name }}</router-link>
		</li>
	</div>
</template>

<script>
    export default {
        name: "MenuItem",
        props: {
            // route object
            item: {
                type: Object,
                required: true
            },
            index: {
                type: Number,
                required: true
            },
        },
				data(){
            return {
                opened: false
						}
				},
        methods: {
            toggle() {
							this.opened = !this.opened
            }
        }
    }
</script>

<style lang="scss" scoped>
	.nav-dropdown-items {
		max-height: 100%;
		opacity: 1;
		overflow: hidden;
		background-color: #1f2d3d;
		& > span{
			display: block;
			width: 100%;
		}
	}

	.list-enter {
		opacity: 0;
	}
	.list-enter-active {
		animation: slide-in .5s ease-out forwards;
	}
	.list-leave-to, .list-leave-active {
		opacity: 0;
		animation: slide-out .5s ease-out forwards;
	}
	@keyframes slide-in {
		from { height: 0; } to { height: 40px; }
	}
	@keyframes slide-out {
		from { height: 40px; } to { height: 0; }
	}

	.nav-item{
		font-size: 14px;
		color: #fff;
		a{
			color: #fff;
		}
	}
	.nav-link{
		display: flex;
		align-items: center;
		padding: .7rem 1rem;
		cursor: pointer;
		&.router-link-active {
			color: red;
		}
	}


</style>