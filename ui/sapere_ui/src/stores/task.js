import { defineStore } from "pinia";
import axios from 'axios';

export const useTaskStore = defineStore("task", {
     state: () => ({
         taskData: [],
         taskForm: {
            id: '', 
            title: '',
            description: '',
            due_at: '',
            status: 'Pending'
         }, 
         editMode: false
     }),
     getters: {
        tasks: (state) => state.taskData,
        form: (state) => state.taskForm,
        mode: (state) => state.editMode
     },
     actions: {
        async getTasks() {
            await axios.get("http://localhost:8000/api/tasks", {
                withCredentials: true,
                withXSRFToken: true
            }).then(response => {
                this.taskData = response.data;
            });
        },
        async storeTask() {
            await axios.post('http://localhost:8000/api/tasks', this.taskForm,{
                withCredentials: true,
                withXSRFToken: true
            }).then(() => {
                this.getTasks();
                this.resetForm();
            });
        },
        editTask(data) {
            this.taskForm = {
                id: data.id,
                title: data.title,
                description: data.description,
                due_at: data.due_at,
                status: data.status
            };
    
            this.editMode = true;
        },
        resetForm() {
            this.taskForm = {
                id: '',
                title: '',
                description: '',
                due_at: '',
                status: 'Pending'
            };
    
            this.editMode = false;
        },
        async updateTask() {
            await axios.put(`http://localhost:8000/api/tasks/${this.taskForm.id}`, this.taskForm,{
                withCredentials: true,
                withXSRFToken: true
            }).then(() => {
                this.resetForm();
                this.getTasks();
            });
        },
        async deleteTask(data) {
            await axios.delete(`http://localhost:8000/api/tasks/${data.id}`,{
                withCredentials: true,
                withXSRFToken: true
            }).then(response => {
               this.getTasks();
            });
        }
     }
})