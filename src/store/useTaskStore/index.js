import { create } from 'zustand';

import axios from 'axios';

const useTaskStore = create((set) => ({
    tasks: [],
    filteredTasks: [],
    statusFilter: 'Todos',
    searchTerm: '',
    page: 1,
    pageSize: 50,
    isLoading: false,

    fetchTasks: async () => {
        set({ isLoading: true });
        try {
            const response = await axios.get('http://localhost:3001/tasks');
            set({ tasks: response.data, isLoading: false });
            useTaskStore.getState().filterAndPaginateTasks();
        } catch (error) {
            console.error("Erro ao buscar tarefas:", error);
            set({ isLoading: false });
        }
    },

    addTask: async (task) => {
        try {
            const response = await axios.post('http://localhost:3001/tasks', task);
            set((state) => ({ tasks: [...state.tasks, response.data] }));
            useTaskStore.getState().filterAndPaginateTasks();
        } catch (error) {
            console.error("Erro ao adicionar tarefa:", error);
        }
    },

    updateTask: async (id, updatedTask) => {
        try {
            const response = await axios.put(`http://localhost:3001/tasks/${id}`, updatedTask);
            set((state) => ({
                tasks: state.tasks.map((task) => (task.id === id ? response.data : task)),
            }));
            useTaskStore.getState().filterAndPaginateTasks();
        } catch (error) {
            console.error("Erro ao atualizar tarefa:", error);
        }
    },

    deleteTask: async (id) => {
        try {
            await axios.delete(`http://localhost:3001/tasks/${id}`);
            set((state) => ({
                tasks: state.tasks.filter((task) => task.id !== id),
            }));
            useTaskStore.getState().filterAndPaginateTasks();
        } catch (error) {
            console.error("Erro ao deletar tarefa:", error);
        }
    },

    setStatusFilter: (status) => {
        set({ statusFilter: status, page: 1 });
        useTaskStore.getState().filterAndPaginateTasks();
    },

    setSearchTerm: (term) => {
        set({ searchTerm: term, page: 1 });
        useTaskStore.getState().filterAndPaginateTasks();
    },

    setPage: (page) => {
        set({ page });
        useTaskStore.getState().filterAndPaginateTasks();
    },

    filterAndPaginateTasks: () => {
        set((state) => {
            let tasks = state.tasks;

            if (state.statusFilter !== 'Todos') {
                tasks = tasks.filter((task) => task.status === state.statusFilter);
            }

            if (state.searchTerm) {
                tasks = tasks.filter((task) =>
                    task.title.toLowerCase().includes(state.searchTerm.toLowerCase())
                );
            }

            const startIndex = (state.page - 1) * state.pageSize;
            const paginatedTasks = tasks.slice(startIndex, startIndex + state.pageSize);

            return { filteredTasks: paginatedTasks };
        });
    },
}));

export default useTaskStore;