import React, { useEffect, useState } from 'react';

const ScrollBackgroundImage = () => {
  const [bgImage, setBgImage] = useState('https://www.dalailama.com/assets/pictures/2015/2015-India/2015-11-09-Chennai/_picturesLarge/2015-11-10-Chennai-G03-_D4D3365.jpg'); // Initial background image

  useEffect(() => {
    const handleScroll = () => {
      // Calculate the scroll position
      const scrollPosition = window.scrollY;

      // Change the background image based on the scroll position
      if (scrollPosition > 200) {
        setBgImage('https://www.dalailama.com/assets/pictures/2015/2015-India/2015-11-09-Chennai/_picturesLarge/2015-11-10-Chennai-G06-_OHH9779.jpg'); // Update with the desired image for a certain scroll position
      } else {
        setBgImage('https://www.dalailama.com/assets/pictures/2015/2015-India/2015-11-09-Chennai/_picturesLarge/2015-11-10-Chennai-G03-_D4D3365.jpg'); // Update with the initial image for other scroll positions
      }
    };

    // Attach the scroll event listener when the component mounts
    window.addEventListener('scroll', handleScroll);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div
      className="scroll-background"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      {/* Content of the component */}
    </div>
  );
};

export default ScrollBackgroundImage;
