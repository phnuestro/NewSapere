<script setup>
    import { onMounted } from 'vue';
    import { useTaskStore } from '../stores/task';

    const taskStore = useTaskStore();

    onMounted( async () => {
        await taskStore.getTasks();
    });
</script>

<template>
    <div class="flex flex-wrap w-full items-start">
        <div class="w-1/2">
            <div class="max-w-xl mx-auto py-8">
                <form @submit.prevent="!taskStore.mode ? taskStore.storeTask() : taskStore.updateTask()">
                    <div class="space-y-12">
                        <div class="border-b border-gray-900/10 pb-4">
                            <h2 class="text-base font-semibold leading-7 text-gray-900">Task Form</h2>
                            <div class="mt-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                <div class="sm:col-span-4">
                                    <label for="title" class="block text-sm font-medium leading-6 text-gray-900">Title</label>
                                    <div class="mt-2">
                                        <div class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                            <input type="text" v-model="taskStore.form.title" name="title" id="title" class="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6" placeholder="Enter Title">
                                        </div>
                                    </div>
                                </div>

                                <div class="col-span-full">
                                    <label for="description" class="block text-sm font-medium leading-6 text-gray-900">Description</label>
                                    <div class="mt-2">
                                        <textarea v-model="taskStore.form.description" id="description" name="description" rows="3" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"></textarea>
                                    </div>
                                </div>

                                <div class="sm:col-span-4">
                                    <label for="due_at" class="block text-sm font-medium leading-6 text-gray-900">Due Date</label>
                                    <div class="mt-2">
                                        <div class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                                            <input type="date" v-model="taskStore.form.due_at" name="due_at" id="due_at" class="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6">
                                        </div>
                                    </div>
                                </div>
                                <div class="sm:col-span-3">
                                    <label for="status" class="block text-sm font-medium leading-6 text-gray-900">Status</label>
                                    <div class="mt-2">
                                        <select id="status" v-model="taskStore.form.status" name="status" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6">
                                            <option>Pending</option>
                                            <option>On-going</option>
                                            <option>Accomplished</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="mt-6 flex items-center justify-end gap-x-6">
                        <button type="button" class="text-sm font-semibold leading-6 text-gray-900" @click="taskStore.resetForm()">Cancel</button>
                        <button type="submit" class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">{{ !taskStore.mode ? 'Save' : 'Update' }}</button>
                    </div>
                </form>
            </div>
        </div>
        <div class="w-1/2">
            <div class="flex justify-center py-8">
                <div class="overflow-x-auto">
                    <table class="min-w-full bg-white shadow-md rounded-xl">
                        <thead>
                            <tr class="bg-blue-gray-100 text-gray-700">
                                <th class="py-3 px-4 text-left">Title</th>
                                <th class="py-3 px-4 text-left">Description</th>
                                <th class="py-3 px-4 text-left">Due Date</th>
                                <th class="py-3 px-4 text-left">Status</th>
                                <th class="py-3 px-4 text-left">Action</th>
                            </tr>
                        </thead>
                        <tbody class="text-blue-gray-900">
                            <tr class="border-b border-blue-gray-200" v-for="task in taskStore.tasks" :key="task.id">
                                <td class="py-3 px-4">{{ task.title }}</td>
                                <td class="py-3 px-4">{{ task.description }}</td>
                                <td class="py-3 px-4">{{ task.due_at }}</td>
                                <td class="py-3 px-4">{{ task.status }}</td>
                                <td class="py-3 px-4 space-x-2">
                                    <a href="javascript:void(0)" class="font-medium text-blue-600 hover:text-blue-800" @click="taskStore.editTask(task)">Edit</a>
                                    <a href="javascript:void(0)" class="font-medium text-red-600 hover:text-red-800" @click="taskStore.deleteTask(task)">Delete</a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>