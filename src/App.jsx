// src/App.jsx
import { Suspense } from 'react';
import DefaultLayout from './layout/DefaultLayout';
import Navbar from './components/UI/Navbar';
import TabNavigation from './components/UI/TabNavigation';
import { PanelProvider } from './contexts/PanelContext';

function App() {
  return (
    <PanelProvider>
      <DefaultLayout>
        <Navbar />
        <TabNavigation />
      </DefaultLayout>
    </PanelProvider>
  );
}

export default App;