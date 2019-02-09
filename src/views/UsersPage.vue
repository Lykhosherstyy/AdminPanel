<template>
	<div>
		<users-table></users-table>
	</div>
</template>

<script>
    import UsersTable from '../components/Users/UsersTable.vue';
    export default {
        name: "UsersPage",
				components:{
            UsersTable
				},
        mounted(){

        },
				methods:{
            submit(){
                console.log('ok submit');
						},
            cancel(){
                console.log('ok cancel');
            }
				}
    }
</script>

<style scoped>

</style>