import React, { useEffect } from 'react';

const ZoomRedirect = () => {
  useEffect(() => {
    // Redirect to Zoom meeting immediately
    window.location.href = 'https://us05web.zoom.us/j/3169182161?pwd=dDQ4N2luajBORWdjK04zYTRvK2N0UT09';
  }, []);

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 text-white flex items-center justify-center">
      <div className="text-center">
        <div className="text-6xl mb-4">🔗</div>
        <h1 className="text-2xl font-bold text-blue-300">
          Redirigiendo a Zoom...
        </h1>
      </div>
    </main>
  );
};

export default ZoomRedirect; 