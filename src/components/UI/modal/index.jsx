import DraggableModal from './DraggableModal';

const WalkDoorConfigurator = () => {
  const [isModalOpen, setIsModalOpen] = useState(true);
  
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  
  return (
    <div className="p-4">
      <button 
        className="px-4 py-2 bg-blue-500 text-white rounded"
        onClick={toggleModal}
      >
        {isModalOpen ? 'Close Modal' : 'Open WalkDoor Configurator'}
      </button>
      
      <DraggableModal 
        isOpen={isModalOpen}
        onClose={toggleModal}
      />
    </div>
  );
};

export default WalkDoorConfigurator;