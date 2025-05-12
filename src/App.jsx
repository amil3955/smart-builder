
import { Suspense } from 'react';
import DefaultLayout from './layout/DefaultLayout';
import Navbar from './components/UI/Navbar';
import TabNavigation from './components/UI/TabNavigation';

function App() {
  return (
    <DefaultLayout>
      <Navbar />
      <TabNavigation />
    </DefaultLayout>
  );
}

export default App;