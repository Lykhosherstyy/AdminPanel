<template>
	<div class="dropdown d-flex flex-align" v-click-outside="hide">
		<slot></slot>
		<slot name="dropdown"></slot>
	</div>
</template>

<script>
    import Emitter from '../mixins/emitter';
    export default {
        name: "ElDropdown",
				props:{
            hideOnClick:{
                default:true
						}
				},
				mounted(){
            this.$on('menu-item-click', this.handleMenuItemClick);
            this.initEvent()
				},
        mixins: [Emitter],
        data() {
            return {
                visible: false,
                triggerElm: null,
            };
        },
        watch:{
            visible(val) {
                this.broadcast('ElDropdownMenu', 'visible', val);
                // this.$emit('visible', val);
            },
				},
        methods: {
            show() {
								this.visible = true;
                this.$parent.$emit('toggle-open');
            },
            hide() {
								this.visible = false;
                this.$parent.$emit('toggle-open');
            },
            handleMenuItemClick(command){
                if (this.hideOnClick) {
                    this.visible = false;
                }
                this.$emit('command', command);
						},
            handleClick() {
                if (this.visible) {
                    this.hide();
                } else {
                    this.show();
                }
            },
            initEvent() {

                let { handleClick } = this;

                this.triggerElm = this.$slots.default[0].elm;
                this.triggerElm.addEventListener('click', handleClick);
						},
        },
    }
</script>

<style lang="scss" scoped>
	.dropdown{
		position: relative;
		& > div:first-child{
			position: relative;
			cursor: pointer;
			padding: 0 10px;
		}
	}
</style>