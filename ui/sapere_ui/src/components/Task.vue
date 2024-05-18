<script setup>
    import { onMounted } from 'vue';
    import TaskTable from './TaskTable.vue';
    /* import { useRouter } from 'vue-router';
    import { useAuthStore } from '../stores/auth';

    const router = useRouter();

    const authStore = useAuthStore();

    onMounted(async () => {
        await router.isReady()
        
        if((router.currentRoute.value.path != '/login' && router.currentRoute.value.path != '/register')) {
            authStore.getUser();
        }
    }); */
</script>
<template>
    <!-- component -->
    <TaskTable />
</template>