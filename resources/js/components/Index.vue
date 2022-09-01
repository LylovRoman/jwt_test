<template>
    <div>
        <router-link v-if="accessToken" :to="{name: 'fruit.index'}">Фрукты</router-link>
        <router-link v-if="!accessToken" :to="{name: 'user.login'}">Вход</router-link>
        <router-link v-if="!accessToken" :to="{name: 'user.registration'}">Регистрация</router-link>
        <router-link v-if="accessToken" :to="{name: 'user.personal'}">Личный кабинет</router-link>
        <a @click.prevent="logout" href="" v-if="accessToken">Выйти</a>
        <router-view></router-view>
    </div>
</template>

<script>
import api from "../api";
export default {
    name: "Index",
    data(){
        return{
            accessToken: null
        }
    },
    mounted() {
        this.getAccessToken()
    },
    updated(){
        this.getAccessToken()
    },
    methods: {
        getAccessToken(){
            this.accessToken = localStorage.getItem('access_token')
        },
        logout(){
            api.post('/api/auth/logout')
                .then(res => {
                    localStorage.removeItem('access_token');
                    this.$router.push({ name: 'user.login' })
                });
        }
    }
}
</script>

<style scoped>

</style>
