import React, { useEffect, useState } from 'react';

import useTaskStore from '../../store/useTaskStore';

import TaskList from '../../components/TaskList';
import TaskForm from '../../components/TaskForm';
import CustomSelect from '../../components/CustomSelect';

import { FaPlus, FaSearch } from 'react-icons/fa';

import { AnimatePresence } from 'framer-motion';

import {
    Container,
    Header,
    Title,
    Filters,
    SearchWrapper,
    SearchInput,
    NewTaskButton,
} from './styles';

const Home = () => {
    const { fetchTasks, setStatusFilter, statusFilter, setSearchTerm, searchTerm } = useTaskStore();
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        fetchTasks();
    }, [fetchTasks]);

    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);

    const statusOptions = [
        { value: 'Todos', label: 'Todos' },
        { value: 'Em andamento', label: 'Em andamento' },
        { value: 'Concluída', label: 'Concluída' },
        { value: 'Atrasada', label: 'Atrasada' },
    ];

    return (
        <Container>
            <Header>
                <Title>Gerenciador de Tarefas</Title>
                <NewTaskButton onClick={handleOpenModal}>
                    <FaPlus />
                    <span>Nova Tarefa</span>
                </NewTaskButton>
            </Header>
            <Filters>
                <SearchWrapper>
                    <FaSearch />
                    <SearchInput
                        type="text"
                        placeholder="Buscar por título..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </SearchWrapper>

                <CustomSelect
                    options={statusOptions}
                    value={statusFilter}
                    onChange={(value) => setStatusFilter(value)}
                    placeholder="Filtrar por status"
                />
            </Filters>

            <TaskList />

            <AnimatePresence>
                {isModalOpen && <TaskForm onClose={handleCloseModal} />}
            </AnimatePresence>
        </Container>
    );
};

export default Home;