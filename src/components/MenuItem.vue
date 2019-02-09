<template>
	<div class="nav-item-wrapper">
		<li class="sidebar-nav-item nav-dropdown" v-if="item.children">
			<div class="sidebar-nav-link nav-dropdown-toggle" @click="toggle()">
				<div class="icon-circle-wrap">
					<font-awesome-icon :icon="addIcon"/>
				</div>
				<span>
					{{ generateTitle('menu.' + item.name.toLowerCase()) }}
				</span>
			</div>
			<ul class="nav nav-dropdown-items" >
				<transition-group name="list">
					<li class="sidebar-nav-item" v-for="(child) in (opened ? item.children : [])" :key="child.name">
						<router-link :to="child.path" class="sidebar-nav-link flex-center">{{ generateTitle('menu.' + child.name.toLowerCase()) }}</router-link>
					</li>
				</transition-group>
			</ul>
		</li>
		<li class="sidebar-nav-item" v-else>
			<router-link :to="item.path" class="sidebar-nav-link">
				<div class="icon-circle-wrap">
					<font-awesome-icon :icon="addIcon"/>
				</div>
				<span>{{ generateTitle('menu.' + item.name.toLowerCase()) }}</span>
			</router-link>
		</li>
	</div>
</template>

<script>
	import { generateTitle } from "../utils/helpers";

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
				computed:{
					addIcon() {
						return this.item.icon
					}
				},
        methods: {
            toggle() {
							this.opened = !this.opened
            },
            generateTitle
        },
				mounted(){

				}

    }
</script>

<style lang="scss" scoped>





</style>