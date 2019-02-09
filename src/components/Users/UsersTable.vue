<template>
	<div>
		<div class="top-container">
			<button class="btn btn-primary text-upper"
							@click="onAdd()"
							v-click-show-modal.myModal>
				{{ $t("buttons.add") }}
			</button>
		</div>


		<vuetable ref="vuetable"
							:api-mode="false"
							:fields="fields"
							:per-page="perPage"
							:data-manager="dataManager"
							pagination-path="pagination"
							@vuetable:pagination-data="onPaginationData"
		>
			<div slot="actions" slot-scope="props">
				<button
								class="btn btn-primary"
								@click="onUpdate(props.rowData)"
								v-click-show-modal.myModal
				>
					<i class="edit icon"></i>
					{{ $t("buttons.update") }}
				</button>
				<button
								class="btn btn-danger"
								@click="onDelete(props.rowData._id)"
				>
					<i class="delete icon"></i>
					{{ $t("buttons.delete") }}
				</button>
			</div>
		</vuetable>
		<div style="padding-top:10px">
			<vuetable-pagination ref="pagination"
													 @vuetable-pagination:change-page="onChangePage"
			></vuetable-pagination>
		</div>
		<users-modal :rowData="rowData"  :isEditting="isEditting" />
	</div>
</template>

<script>
    import UsersModal from '../UsersModal.vue';
    import API from '../../services/api';
    import _ from "lodash";
    import { mapGetters } from 'vuex'
    export default {
        name: "UserTable",
        components:{
            UsersModal
        },
        data () {
            return {
                fields: [
                    {
                        name: '_id',
                        title: 'ID',
                        sortField: '_id',
                    },
                    {
                        name: 'username',
                        title: 'USERNAME',
                        sortField: 'username',
                        titleClass: 'center aligned',
                        dataClass: 'text-center'
                    },
                    {
                        name: 'role',
                        title: 'ROLE',
                        titleClass: 'center aligned',
                        dataClass: 'text-center'
                    },
										{
										    name:'created_date',
												title:'CREATED DATE',
                        dataClass: 'text-center'
										},
                    '__slot:actions'
                ],
                perPage: 5,
                isEditting:false,
                rowData: {
                    username : '',
                    password : '',
                    role: '',
                }
            }
        },
				computed:{
						...mapGetters(['users'])
				},
        watch: {
            users(newVal, oldVal) {
                this.$refs.vuetable.refresh();
            },
            rowData(newVal, oldVal){
            }
        },
        mounted() {
            this.$store.dispatch('GET_USERS')
        },
        methods:{
            onAdd: function(){
                this.rowData = {
                    username : '',
                    password : '',
                    role: '',
										created_date: new Date()
                };
                this.isEditting = false;
            },
            onUpdate: function(data){
                this.rowData = data;
                this.isEditting = true;
            },
            onDelete: function(rowId){


                this.$swal({
                    title:'Delete?',
                    type:'warning',
                    position:'top',
                    showCancelButton: !0,
                    confirmButtonText: 'Yes',
                    cancelButtonText: 'No',
                    confirmButtonColor: '#41b882',
                    cancelButtonColor: '#ff7674',
                    // background:'red',
                    showLoaderOnConfirm: !0,
                    focusConfirm:false,
                    preConfirm: () => {
                        this.$store.dispatch('DELETE_USER', rowId).catch(function (error) {
                            console.log(error);
                        });
                    },
                }).then((result) => {
                    if(result.value) {
                        this.$swal({
                            toast:true,
                            position: 'top-end',
                            showConfirmButton: false,
                            timer: 3000,
                            type: 'success',
                            title: 'Deleted'
                        });
                    }
                });

            },
            onPaginationData(paginationData) {
                this.$refs.pagination.setPaginationData(paginationData);
            },
            onChangePage(page) {
                this.$refs.vuetable.changePage(page);
            },
            dataManager(sortOrder, pagination) {

                if (this.users.length < 1) return;

                let local = this.users;

                sortOrder.push({
                    direction:"desc",
                    field:"username",
                    sortField:"username"
                });

                // sortOrder can be empty, so we have to check for that as well
                if (sortOrder.length > 0) {
                    local = _.orderBy(
                        local,
                        sortOrder[0].sortField,
                        sortOrder[0].direction
                    );
                }

                pagination = this.$refs.vuetable.makePagination(
                    local.length,
                    this.perPage
                );
                let from = pagination.from - 1;
                let to = from + this.perPage;

                return {
                    pagination: pagination,
                    data: _.slice(local, from, to)
                };
            }
        }
    }
</script>

<style >

</style>