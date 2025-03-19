import MainApp from './MainApp';
import { BrowserRouter as Router } from 'react-router-dom';
import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

function App() {
    return (
        <Router>
            <DndProvider backend={HTML5Backend}>
                <MainApp />
            </DndProvider>
        </Router>
    );
}

export default App;
