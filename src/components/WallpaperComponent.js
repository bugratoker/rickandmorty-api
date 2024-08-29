import React from 'react';
import wallpaper from '../assets/image.png'; // Adjust the path if necessary

function WallpaperComponent() {
  return (
    <div >
      <img 
        src={wallpaper} 
        alt="Wallpaper" 
        style={{ 
          height: '100%', 
          width: '100%', 
          objectFit: 'cover' 
        }} 
      />
    </div>
  );
}

export default WallpaperComponent;
