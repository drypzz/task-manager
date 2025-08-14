import { create } from 'zustand';

import axios from 'axios';

const useTaskStore = create((set, get) => ({
    tasks: [],
    filteredTasks: [],
    filteredTasksCount: 0,
    statusFilter: 'Todos',
    searchTerm: '',
    page: 1,
    pageSize: 25,
    totalPages: 1,
    isLoading: false,
    currentTask: null,
    isCurrentTaskLoading: false,

    fetchTasks: async () => {
        set({ isLoading: true });
        try {
            const response = await axios.get('http://localhost:3001/tasks');
            set({ tasks: response.data, isLoading: false });
            get().filterAndPaginateTasks();
        } catch (error) {
            console.error("Erro ao buscar tarefas:", error);
            set({ isLoading: false });
        }
    },

    addTask: async (task) => {
        try {
            const response = await axios.post('http://localhost:3001/tasks', task);
            set((state) => ({ tasks: [...state.tasks, response.data] }));
            get().filterAndPaginateTasks();
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
            get().filterAndPaginateTasks();
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
            get().filterAndPaginateTasks();
        } catch (error) {
            console.error("Erro ao deletar tarefa:", error);
        }
    },

    fetchTaskById: async (id) => {
        set({ isCurrentTaskLoading: true, currentTask: null });
        try {
            const response = await axios.get(`http://localhost:3001/tasks/${id}`);
            set({ currentTask: response.data, isCurrentTaskLoading: false });
        } catch (error) {
            console.error(`Erro ao buscar a tarefa ${id}:`, error);
            set({ isCurrentTaskLoading: false });
        }
    },

    setStatusFilter: (status) => {
        set({ statusFilter: status, page: 1 });
        get().filterAndPaginateTasks();
    },

    setSearchTerm: (term) => {
        set({ searchTerm: term, page: 1 });
        get().filterAndPaginateTasks();
    },

    setPageSize: (size) => {
        set({ pageSize: size, page: 1 });
        get().filterAndPaginateTasks();
    },

    setPage: (page) => {
        const { totalPages } = get();
        if (page > 0 && page <= totalPages) {
            set({ page });
            get().filterAndPaginateTasks();
        }
    },

    filterAndPaginateTasks: () => {
        set((state) => {
            let tasksToFilter = state.tasks;

            if (state.statusFilter !== 'Todos') {
                tasksToFilter = tasksToFilter.filter((task) => task.status === state.statusFilter);
            }

            if (state.searchTerm) {
                tasksToFilter = tasksToFilter.filter((task) =>
                    task.title.toLowerCase().includes(state.searchTerm.toLowerCase())
                );
            }

            const totalFilteredCount = tasksToFilter.length;
            const totalPages = Math.ceil(totalFilteredCount / state.pageSize);
            const currentPage = Math.min(state.page, totalPages) || 1;
            const startIndex = (currentPage - 1) * state.pageSize;
            const paginatedTasks = tasksToFilter.slice(startIndex, startIndex + state.pageSize);

            return {
                filteredTasks: paginatedTasks,
                filteredTasksCount: totalFilteredCount,
                totalPages: totalPages,
                page: currentPage,
            };
        });
    },
}));

export default useTaskStore;