import React from 'react';
import LoadingScreen from './loading/LoadingScreen';
import useLoading from './loading/useLoading'; // Import the custom useLoading hook

const Work = () => {
  // Use the loading hook with a duration of your choice (e.g., 2000ms)
  const isLoading = useLoading(1000); 

  return (
    <div>
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <div className="media-wrapper">
          <img src="Work.png" alt="background" className="responsive-bg" />

          <div className="styled-text-common-Work">
            <a
              href="https://www.canva.com/design/DAGQ9woqYvQ/8OSRT68Qlwc0_tDBGGjeJg/view?utm_content=DAGQ9woqYvQ&utm_campaign=designshare&utm_medium=link&utm_source=editor"
              target="_blank"
              rel="noopener noreferrer"
            >
              Canva Link
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default Work;
