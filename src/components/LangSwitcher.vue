<template>
	<div class="lang-switcher-container">
		<el-dropdown @command="handleSetLanguage">
			<div class="lang-switcher-current text-center">
				<div class="rounded d-flex flex-align flex-center text-upper">{{ language }}</div>
				<span class="dropdown-caret" :class="{up: isActive}"></span>
			</div>
			<el-dropdown-menu slot="dropdown">
				<el-dropdown-item :disabled="language==='ru'" command="ru">Русский</el-dropdown-item>
				<el-dropdown-item :disabled="language==='en'" command="en">English</el-dropdown-item>
				<el-dropdown-item :disabled="language==='ua'" command="ua">Українська</el-dropdown-item>
			</el-dropdown-menu>
		</el-dropdown>
	</div>
</template>

<script>
    import ElDropdown from '../components/ElDropdown.vue'
    import ElDropdownMenu from '../components/ElDropdownMenu.vue'
    import ElDropdownItem from '../components/ElDropdownItem.vue'
    export default {
        name: "LangSwitcher",
        components:{
            ElDropdown,
            ElDropdownMenu,
            ElDropdownItem
        },
        data() {
            return {
                isActive: false,
            };
        },
				computed:{
            language() {
                return this.$store.getters.language
            }
				},
				methods:{
            handleSetLanguage(language){
                this.$i18n.locale = language
                this.$store.dispatch('SET_LANGUAGE', language)
						},
            toggleisActive(){
                this.isActive = !this.isActive;
            }
				},
        mounted(){
            this.$on('toggle-open', this.toggleisActive);
        },
        watch:{
            isActive() {

            }
        }
    }
</script>

<style scoped>
	.rounded{
		width: 40px;
		height: 40px;
		border-radius: 10px;
		border:1px solid #000;
	}
</style>