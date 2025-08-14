import { create } from 'zustand';

import axios from 'axios';

/**
 * Cria um store com Zustand para gerenciar o estado global da aplicação de tarefas.
 * O store centraliza a lógica de estado, incluindo tarefas, filtros, paginação e interações com a API.
 * @param {Function} set - Função para atualizar o estado do store.
 * @param {Function} get - Função para acessar o estado atual do store dentro de uma ação.
 */
const useTaskStore = create((set, get) => ({
    /** @type {Array<Object>} tasks - Array original com todas as tarefas buscadas da API. */
    tasks: [],
    
    /** @type {Array<Object>} filteredTasks - Array de tarefas após a aplicação de filtros e paginação. */
    filteredTasks: [],
    
    /** @type {number} filteredTasksCount - O número total de tarefas após a aplicação dos filtros, antes da paginação. */
    filteredTasksCount: 0,
    
    /** @type {string} statusFilter - O valor do filtro de status atualmente selecionado. */
    statusFilter: 'Todos',
   
    /** @type {string} searchTerm - O termo de busca atualmente digitado pelo usuário. */
    searchTerm: '',
    
    /** @type {number} page - O número da página atual na paginação. */
    page: 1,
    
    /** @type {number} pageSize - A quantidade de itens a serem exibidos por página. */
    pageSize: 25,
    
    /** @type {number} totalPages - O número total de páginas calculado com base em `filteredTasksCount` e `pageSize`. */
    totalPages: 1,
    
    /** @type {boolean} isLoading - Sinalizador para o estado de carregamento da lista principal de tarefas. */
    isLoading: false,
    
    /** @type {Object|null} currentTask - Armazena os dados da tarefa única que está sendo visualizada na página de detalhes. */
    currentTask: null,
    
    /** @type {boolean} isCurrentTaskLoading - Sinalizador para o estado de carregamento da tarefa única. */
    isCurrentTaskLoading: false,
    
    /** @type {Array<object>} notifications - Array de notificações ativas. */
    notifications: [],
    
    /** @type {string|null} error - Armazena a última mensagem de erro da API. */
    error: null,

    /** Adiciona uma nova notificação ao estado. */
    addNotification: (notification) => {
        const id = Date.now();
        set((state) => ({ notifications: [...state.notifications, { ...notification, id }] }));
        setTimeout(() => get().removeNotification(id), 5000);
    },

    /** Remove uma notificação do estado. */
    removeNotification: (id) => {
        set((state) => ({ notifications: state.notifications.filter((n) => n.id !== id) }));
    },

    /**
   * Ação centralizada para tratar erros da API.
   * Define o estado de erro e dispara uma notificação para o usuário.
   * @param {Error} error - O objeto de erro capturado.
   * @param {string} contextMessage - Mensagem de contexto (ex: "ao buscar tarefas").
   */
    handleApiError: (error, contextMessage) => {
        const errorMessage = `Erro ${contextMessage}: ${error.message}`;
        console.error(errorMessage, error);
        set({ error: errorMessage, isLoading: false, isCurrentTaskLoading: false });
        get().addNotification({
            type: 'danger',
            message: `Falha na operação. Por favor, tente novamente.`,
        });
    },

    /**
     * Busca a lista completa de tarefas da API.
     * Atualiza o estado `tasks` e dispara a filtragem inicial.
     */
    fetchTasks: async () => {
        set({ isLoading: true });
        try {
            const response = await axios.get('http://localhost:3001/tasks');
            set({ tasks: response.data, isLoading: false });
            get().filterAndPaginateTasks();
        } catch (error) {
            get().handleApiError(error, "ao buscar tarefas");
        }
    },

    /**
     * Adiciona uma nova tarefa via API e atualiza o estado local.
     * @param {Object} task - O objeto da nova tarefa a ser adicionada.
     */
    addTask: async (task) => {
        try {
            const response = await axios.post('http://localhost:3001/tasks', task);
            set((state) => ({ tasks: [...state.tasks, response.data] }));
            get().filterAndPaginateTasks();
            get().addNotification({ type: 'success', message: 'Tarefa criada com sucesso!' });
        } catch (error) {
            get().handleApiError(error, "ao adicionar tarefa");
        }
    },

    /**
     * Atualiza uma tarefa existente via API e no estado local.
     * @param {number} id - O ID da tarefa a ser atualizada.
     * @param {Object} updatedTask - O objeto da tarefa com os dados atualizados.
     */
    updateTask: async (id, updatedTask) => {
        try {
            const response = await axios.put(`http://localhost:3001/tasks/${id}`, updatedTask);
            set((state) => ({
                tasks: state.tasks.map((task) => (task.id === id ? response.data : task)),
            }));
            get().filterAndPaginateTasks();
            get().addNotification({ type: 'success', message: 'Tarefa atualizada com sucesso!' });
        } catch (error) {
            get().handleApiError(error, "ao atualizar tarefa");
        }
    },

    /**
     * Deleta uma tarefa via API e a remove do estado local.
     * @param {number} id - O ID da tarefa a ser deletada.
     */
    deleteTask: async (id) => {
        try {
            await axios.delete(`http://localhost:3001/tasks/${id}`);
            set((state) => ({
                tasks: state.tasks.filter((task) => task.id !== id),
            }));
            get().filterAndPaginateTasks();
            get().addNotification({ type: 'success', message: 'Tarefa excluída com sucesso!' });
        } catch (error) {
            get().handleApiError(error, "ao deletar tarefa");
        }
    },

    /**
     * Busca uma única tarefa por seu ID, para a página de detalhes.
     * @param {number} id - O ID da tarefa a ser buscada.
     */
    fetchTaskById: async (id) => {
        set({ isCurrentTaskLoading: true, currentTask: null });
        try {
            const response = await axios.get(`http://localhost:3001/tasks/${id}`);
            set({ currentTask: response.data, isCurrentTaskLoading: false });
        } catch (error) {
            get().handleApiError(error, `ao buscar a tarefa ${id}`);
        }
    },

    /**
     * Define o filtro de status e reseta a paginação para a primeira página.
     * @param {string} status - O novo status para filtrar.
     */
    setStatusFilter: (status) => {
        set({ statusFilter: status, page: 1 });
        get().filterAndPaginateTasks();
    },

    /**
     * Define o termo de busca e reseta a paginação para a primeira página.
     * @param {string} term - O novo termo de busca.
     */
    setSearchTerm: (term) => {
        set({ searchTerm: term, page: 1 });
        get().filterAndPaginateTasks();
    },

    /**
     * Define o número de itens por página e reseta a paginação.
     * @param {number} size - O novo tamanho da página.
     */
    setPageSize: (size) => {
        set({ pageSize: size, page: 1 });
        get().filterAndPaginateTasks();
    },

    /**
     * Define a página atual, garantindo que ela esteja dentro dos limites válidos.
     * @param {number} page - O número da página para navegar.
     */
    setPage: (page) => {
        const { totalPages } = get();
        if (page > 0 && page <= totalPages) {
            set({ page });
            get().filterAndPaginateTasks();
        }
    },

    /**
     * Ação central que aplica a lógica de filtro e paginação.
     * É chamada sempre que um filtro ou a paginação muda.
     */
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