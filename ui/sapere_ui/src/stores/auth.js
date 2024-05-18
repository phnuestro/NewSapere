import { defineStore } from "pinia";
import axios from 'axios';

export const useAuthStore = defineStore("auth", {
     state: () => ({
         authUser: JSON.parse(localStorage.getItem("user")) || null,
     }),
     getters: {
        user: (state) => state.authUser,
     },
     actions: {
        persistToLocalStorage() {
            localStorage.setItem("user", JSON.stringify(this.authUser));
        },
        async getToken() {
            await axios.get('http://localhost:8000/sanctum/csrf-cookie',{
                withCredentials: true
            });
        },
        async getUser() {
            await axios.get("http://localhost:8000/api/user", {
                withCredentials: true,
                withXSRFToken: true
            }).then(response => {
                this.authUser = response.data;
                this.persistToLocalStorage();
            }).catch(() => {
                this.authUser = null;
                this.persistToLocalStorage();
            });

            
        },
        async handleLogin(data) {
            await this.getToken();

            await axios.post('http://localhost:8000/login', data,{
                withCredentials: true,
                withXSRFToken: true
            });

            await this.getUser();

            this.router.push({name: 'task'});
        },
        async handleRegister(data) {
            await this.getToken();

            await axios.post('http://localhost:8000/register', data,{
                withCredentials: true,
                withXSRFToken: true
            });

            await this.getUser();

            this.router.push({name: 'task'});
        },
        async handleLogout() {
            await axios.post('http://localhost:8000/logout', {},{
                withCredentials: true,
                withXSRFToken: true
            });

            this.authUser = null;
            this.persistToLocalStorage()

            this.router.push({name: 'login'});
        }
     }
})