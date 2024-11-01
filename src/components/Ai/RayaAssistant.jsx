// components/RayaAssistant.js
import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { Typewriter } from 'react-simple-typewriter';

Modal.setAppElement('#__next'); // Required for accessibility

const RayaAssistant = () => {
  const [modalIsOpen, setModalIsOpen] = useState(true);
  const [message, setMessage] = useState('');
  const [options, setOptions] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
    // Fetch welcome message and options from API
    const fetchData = async () => {
      try {
        const response = await fetch('/api/rayaMessage');
        const data = await response.json();
        setMessage(data.message);
        setOptions(data.options);

        // Use Web Speech API to speak the message
        const utterance = new SpeechSynthesisUtterance(data.message);
        window.speechSynthesis.speak(utterance);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleChoice = async (choice) => {
    setSelectedOption(choice);
    try {
      const response = await fetch(`/api/filterProducts?category=${choice.id}`);
      const data = await response.json();
      setFilteredProducts(data.products);
    } catch (error) {
      console.error('Error fetching filtered products:', error);
    }
  };

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      contentLabel="Raya Assistant"
    >
      <div>
        <h2>Welcome to DIVINE!</h2>
        <p>{message}</p>
        <Typewriter
          words={[message]}
          loop={1}
          cursor
          typeSpeed={50}
          deleteSpeed={50}
        />
        <div>
          {options.map(option => (
            <button key={option.id} onClick={() => handleChoice(option)}>
              {option.label}
            </button>
          ))}
        </div>
        <div>
          {selectedOption && (
            <div>
              <h3>Products related to {selectedOption.label}:</h3>
              {filteredProducts.length > 0 ? (
                filteredProducts.map(product => (
                  <div key={product._id}>
                    <h4>{product.productName}</h4>
                    <img src={product.productImage1} alt={product.productName} />
                    <p>{product.description}</p>
                    <p>Price: ${product.price}</p>
                  </div>
                ))
              ) : (
                <p>No products found.</p>
              )}
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default RayaAssistant;
