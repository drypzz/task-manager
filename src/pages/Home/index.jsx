import React, { useEffect, useState } from 'react';

import { FaPlus, FaSearch, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

import { AnimatePresence } from 'framer-motion';

import useTaskStore from '../../store/useTaskStore';

import TaskList from '../../components/TaskList';
import TaskForm from '../../components/TaskForm';
import CustomSelect from '../../components/CustomSelect';

import { Container, Header, Title, Filters, SearchWrapper, SearchInput, NewTaskButton, PaginationControls, PageInfo, StatusLegend, LegendItem, LegendColorCircle, NavButton } from './styles';

const Home = () => {
    const { fetchTasks, setStatusFilter, statusFilter, setSearchTerm, searchTerm, pageSize, setPageSize, page, setPage, totalPages, filteredTasks, filteredTasksCount, } = useTaskStore();
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        fetchTasks();
    }, [fetchTasks]);

    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);

    const statusOptions = [
        { value: 'Todos', label: 'Todos os Status' },
        { value: 'Em andamento', label: 'Em andamento' },
        { value: 'Concluída', label: 'Concluída' },
        { value: 'Atrasada', label: 'Atrasada' },
        { value: 'Pendente', label: 'Pendente' },
    ];

    const pageSizeOptions = [
        { value: 25, label: 'Exibir 25' },
        { value: 50, label: 'Exibir 50' },
        { value: 100, label: 'Exibir 100' },
    ];

    const legendItems = [
        { status: 'Concluída', label: 'Concluída' },
        { status: 'Em andamento', label: 'Em Andamento' },
        { status: 'Atrasada', label: 'Atrasada' },
        { status: 'Pendente', label: 'Pendente' },
    ];

    const startIndex = (page - 1) * pageSize + 1;
    const endIndex = startIndex + filteredTasks.length - 1;

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
                <CustomSelect
                    options={pageSizeOptions}
                    value={pageSize}
                    onChange={(value) => setPageSize(Number(value))}
                />
            </Filters>

            <PaginationControls>
                {filteredTasksCount > 0 && (
                    <PageInfo>
                        Exibindo {startIndex} - {endIndex} de {filteredTasksCount}
                    </PageInfo>
                )}
                <div>
                    <NavButton onClick={() => setPage(page - 1)} disabled={page <= 1}>
                        <FaChevronLeft />
                        Anterior
                    </NavButton>
                    <NavButton onClick={() => setPage(page + 1)} disabled={page >= totalPages}>
                        Próxima
                        <FaChevronRight />
                    </NavButton>
                </div>
            </PaginationControls>

            <StatusLegend>
                {legendItems.map(item => (
                    <LegendItem key={item.status}>
                        <LegendColorCircle $status={item.status} />
                        <span>{item.label}</span>
                    </LegendItem>
                ))}
            </StatusLegend>

            <TaskList />

            <AnimatePresence>
                {isModalOpen && <TaskForm onClose={handleCloseModal} />}
            </AnimatePresence>
        </Container>
    );
};

export default Home;