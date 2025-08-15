import React from 'react';

import { FaPlus, FaSearch, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

import { AnimatePresence } from 'framer-motion';

import { useHomeRules } from './index.rules';

import TaskList from '../../components/TaskList';
import TaskForm from '../../components/TaskForm';
import CustomSelect from '../../components/CustomSelect';

import { Container, Header, Title, Filters, SearchWrapper, SearchInput, NewTaskButton, PaginationControls, PageInfo, StatusLegend, LegendItem, LegendColorCircle, NavButton } from './styles';

/**
 * Componente de UI que representa a página principal da aplicação.
 * É um componente "burro" (dumb component), pois sua única responsabilidade é renderizar a interface
 * com base nos dados e funções recebidos do hook `useHomeRules`.
 */
const Home = () => {
    const {
        statusFilter,
        searchTerm,
        pageSize,
        page,
        totalPages,
        filteredTasksCount,
        isModalOpen,
        setStatusFilter,
        setSearchTerm,
        setPageSize,
        setPage,
        handleOpenModal,
        handleCloseModal,
        statusOptions,
        pageSizeOptions,
        legendItems,
        pageInfo,
    } = useHomeRules();

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
                        Exibindo {pageInfo.startIndex} - {pageInfo.endIndex} de {filteredTasksCount}
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
                    <LegendItem key={item.label}>
                        <LegendColorCircle $status={item.$status} />
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