import React from 'react';
import LoadingScreen from './loading/LoadingScreen';
import useLoading from './loading/useLoading'; // Import the custom useLoading hook

const Contact = () => {
  const isLoading = useLoading(1500); 

  return (
    <div>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <div className="media-wrapper">
          <img src="Contact.png" alt="background" className="responsive-bg" />
        </div>
      )}
    </div>
  );
};

export default Contact;
