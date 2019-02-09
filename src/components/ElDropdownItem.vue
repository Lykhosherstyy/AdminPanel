<template>
	<li class="dropdown-item"
			:class="{
				'is-disabled': disabled,
				'dropdown-item__divided': divided
			}"
			@click="handleClick">
		<slot></slot>
	</li>
</template>

<script>
    import Emitter from '../mixins/emitter';
    export default {
        name: 'ElDropdownItem',
        props: {
            command: {},
            disabled: Boolean,
            divided: Boolean
        },
        mixins: [Emitter],
        methods: {
            handleClick(e) {
                this.dispatch('el-dropdown', 'menu-item-click', [this.command, this]);
            }
        }
    }
</script>

<style scoped>

</style>