import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import TaskDetail from './pages/TaskDetail';
import NotFound from './pages/NotFound';

const Routers = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/task/:taskId" element={<TaskDetail />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
};

export default Routers;