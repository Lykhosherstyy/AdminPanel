<template>
	<div class="login-container">
		<h1 class="title">Login</h1>
		<form  class="login-form" @submit.prevent="handleSubmit" >
			<div class="form-item">
				<input type="text" v-model="username" name="username" placeholder="Username" class="form-control"/>
			</div>
			<div class="form-item">
				<input type="password" v-model="password" name="password" placeholder="Password" class="form-control"/>
			</div>
			<div class="form-item">
				<button type="submit" class="btn btn-submit btn-block">Login</button>
			</div>
		</form>
	</div>
</template>

<script>
    export default {
        name: "Login",
        data () {
            return {
                username: '',
                password: '',
                submitted: false
            }
        },
        methods: {
            handleSubmit (e) {
                this.submitted = true;
                const { username, password } = this;
                this.$store.dispatch('AUTH_REQUEST', { username, password }).then(() => {
                    this.$router.push('/');
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
	.login-container{
		min-height: 100%;
		width: 100%;
		background-color: #fff;
		overflow: hidden;
	}
	.login-form{
		position: relative;
		width: 520px;
		max-width: 100%;
		padding: 160px 35px 0;
		margin: 0 auto;
		overflow: hidden;
	}
	.title{
		font-size: 30px;
	}
</style>