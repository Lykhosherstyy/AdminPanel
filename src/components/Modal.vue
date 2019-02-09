<template>
	<div class="modal-wrap">
		<div class="modal fade" :class="modalClasses" >
			<div class="modal-dialog modal-md modal-dialog-centered" role="dialog">
				<div class="modal-content">
					<slot name="header">
						<header class="modal-header">
							<div class="modal-title">{{ this.title }}</div>
							<button type="button" aria-label="Close" class="close" @click="handleCancel">×</button>
						</header>
					</slot>
					<div class="modal-body">
						<slot></slot>
					</div>
					<footer class="modal-footer">
						<slot name="footer"></slot>
						<button type="button" class="btn btn-cancel" @click="handleCancel">Cancel</button>
						<button type="button" class="btn btn-submit" @click="handleOk">OK</button>
					</footer>
				</div>
			</div>
			<div class="modal-backdrop fade" :class="backdropClasses" v-if="isVisibble" @click="hideHandler">
			</div>
		</div>
	</div>

</template>

<script>
		import listenOnRootMixin from '../mixins/listenOnRoot'
    export default {
        name: "Modal",
				props:{
          title:{
              type: String,
              default: ''
					},
					// header:{
           //    type:Boolean,
					// 		default: false
					// }
				},
				mixins:[listenOnRootMixin],
				mounted(){
            this.listenOnRoot('show-modal', this.showHandler)
				},
				data(){
            return {
                isVisibble: false
						}
				},
				watch:{
            isVisible(){

						}
				},
				computed:{
            modalClasses() {
                return [
                    {
                        show: this.isVisibble,
												'd-block': this.isVisibble
                    }
                ]
            },
            backdropClasses() {
                return [
                    {
                        show: this.isVisibble,
                    }
                ]
            },
				},
				methods:{
            showHandler(){
                this.isVisibble = true
						},
            hideHandler(){
                console.log('yep close');
                this.isVisibble = false
						},
						handleOk(e){
                this.$emit('ok');
            },
            handleCancel(){
                this.$emit('cancel');
                this.hideHandler();
            }
				}
    }
</script>

<style lang="scss" scoped>

</style>