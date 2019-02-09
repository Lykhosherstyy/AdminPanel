<template>
	<modal ref="userModal" id="myModal" @ok="submit" @cancel="cancel" :title=generateModalTitle>
			<form  novalidate>
				<div class="form-item">
					<label for="name">Username</label>
					<input type="text" class="form-control" id="name" v-model.lazy.trim="formData.username" @blur="onFieldBlur('username')" v-bind:class="getFieldClasses('username')">
					<div v-if="isErrorField('username')" class="invalid-feedback">Обязательно</div>
				</div>
				<div class="form-item">
					<label for="role">Role</label>
					<input type="text" class="form-control" id="role" v-model.lazy.trim="formData.role" @blur="onFieldBlur('role')" v-bind:class="getFieldClasses('role')">
					<div v-if="isErrorField('role')" class="invalid-feedback">Обязательно</div>
				</div>
				<div class="form-item" v-if="!isEditting">
					<label for="password">Password</label>
					<input type="text" class="form-control" id="password" v-model.lazy.trim="formData.password" @blur="onFieldBlur('password')" v-bind:class="getFieldClasses('password')">
					<div v-if="isErrorField('password')" class="invalid-feedback">Обязательно</div>
				</div>
			</form>
	</modal>
</template>

<script>
    import Modal from '../components/Modal.vue'
    import API from '../services/api';
    import { required, email, maxLength } from 'vuelidate/lib/validators';
    export default {
        name: "userModal",
				components:{
            Modal
				},
        props:{
            rowData:Object,
            fetchUsers:Function,
            isEditting: Boolean
        },
        data() {
            return {
                isSubmitted: false,
                isError: false,
                errorHeader: 'error.invalidFields',
                errors: [],
                types: this.getTypes(),
                submitting: false,
                formData: this.rowData,
            }
        },
				computed:{
            generateModalTitle(){
                const translate = !this.isEditting ? this.$t('users.modal.addTitle') : this.$t('users.modal.updateTitle');

                return translate;
						}
				},
        methods:{
            submit() {
                this.$v.$touch();
                if (!this.$v.$error) {
                    this.sendFormData();
                } else {
                    this.validationError();
                }
            },
            enableSubmitLoader() {
                this.submitting = true;
            },
            disableSubmitLoader() {
                this.submitting = false;
            },
            sendFormData() {
                let sendMethod;

                this.enableSubmitLoader();

                if(this.isEditting){
                    sendMethod = this.$store.dispatch('UPDATE_USER', this.formData)
                }else{
                    // const token = JSON.parse(localStorage.getItem('user-token'));
                    // console.log(token);
                    // if (token) {
                    //     var config = {
                    //         headers: {'Authorization': "Bearer " + token}
                    //     };
                    // }

                    sendMethod = this.$store.dispatch('ADD_USER', this.formData)
                }

                sendMethod.then(response => {
                    this.submitSuccess(response);
                    this.disableSubmitLoader();

                }).catch(function (error) {
                    this.submitError(error);
                    this.disableSubmitLoader();
                });
            },
            submitSuccess(response) {
                if (response.data.success) {
                    this.isSubmitted = true;
                    this.isError = false;
                    this.$refs.userModal.hideHandler();
                    this.$swal({
                        toast:true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 3000,
                        type: 'success',
                        title: this.isEditting ? 'Updated' : 'Added'
                    });
                } else {
                    this.errorHeader = 'error.invalidFields';
                    this.errors = response.data.errors;
                    this.isError = true;
                }
            },
            submitError(error) {
                this.errorHeader = 'error.general';
                this.errors = [{'field': null, 'message': 'error.generalMessage'}];
                this.isError = true;
            },
            validationError() {
                this.errorHeader = 'error.invalidFields';
                this.errors = this.getErrors();
                this.isError = true;

            },
            isErrorField(field) {
                try {
                    if (this.getValidationField(field).$error) {
                        return true;
                    }
                } catch (error) {}



                return this.errors.some(el => el.field === field);
            },
            getErrors() {
                let errors = [];
                for (const field of Object.keys(this.formData)) {
                    try {
                        if (this.getValidationField(field).$error) {
                            errors.push({'field': field, 'message': null});
                        }
                    } catch (error) {}
                }

                return errors;
            },
            getFieldClasses(field) {
                return { 'is-invalid': this.isErrorField(field) }
            },
            getCharactersLeft(field) {
                try {
                    return this.getValidationField(field).$params.maxLength.max - this.formData[field].length;
                } catch (error) {
                    return 0;
                }
            },
            getTypes() {
                return [{
                    value: 'free',
                    label: 'form.types.free'
                }, {
                    value: 'starter',
                    label: 'form.types.starter'
                }, {
                    value: 'enterprise',
                    label: 'form.types.enterprise'
                }];
            },
            getValidationField(field) {
                if (this.$v.formData[field]) {
                    return this.$v.formData[field];
                }
                throw Error('No validation for field ' + field);
            },
            onFieldBlur(field) {
                try {
                    this.getValidationField(field).$touch();
                    if (this.getValidationField(field).$error) {
                        if (!this.errors.some(el => el.field === field)) {
                            this.errors.push({'field': field, 'message': null});
                        }
                    } else {
                        this.errors = this.errors.filter(el => el.field !== field);

                    }
                } catch (error) {}
            },
            cancel() {
                this.isSubmitted = false;
                this.errors = [];
                this.isError = false;
                // this works even better - using Vue.nextTick method
                this.$nextTick(() => { this.$v.$reset() });

                this.formData = this.rowData;

            }
        },
        mounted:function(){
            // console.log(this.rowData);
        },
        validations: {
            formData: {
                username: { required },
                role: { required },
            }
        },
        watch: {
            errors() {
                this.isError = this.errors.length > 0 ? true : false;
            },
            rowData: function(newVal, oldVal) {
                this.formData = {
                    username : newVal.username,
                    password : newVal.password,
										role: newVal.role,
										created_date: newVal.created_date,
                    _id: newVal._id
                };
            },
        }
    }
</script>

<style scoped>

</style>