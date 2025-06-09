import React, { useEffect, useState } from 'react';

const ZoomRedirect = () => {
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          // Redirect to the new Zoom meeting
          window.location.href = 'https://us05web.zoom.us/j/85358038391?pwd=dYJNtef6QOR3l8T5Vr6bVdbOCN2fcT.1';
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleJoinNow = () => {
    window.location.href = 'https://us05web.zoom.us/j/85358038391?pwd=dYJNtef6QOR3l8T5Vr6bVdbOCN2fcT.1';
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 text-white flex items-center justify-center p-6">
      <div className="max-w-2xl mx-auto">
        {/* Meeting Invitation Card */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 shadow-2xl text-center">
          
          {/* Zoom Logo Area */}
          <div className="mb-6">
            <div className="text-6xl mb-4">📹</div>
            <div className="text-blue-300 text-sm font-medium">ZOOM MEETING INVITATION</div>
          </div>

          {/* Meeting Host */}
          <div className="mb-6">
            <p className="text-gray-300 text-lg">
              <strong className="text-white">B&BGlobal</strong> is inviting you to a scheduled Zoom meeting.
            </p>
          </div>

          {/* Meeting Details */}
          <div className="bg-blue-900/30 rounded-xl p-6 mb-6 text-left">
            <h2 className="text-2xl font-bold text-blue-300 mb-4 text-center">
              AI for Business - Webinar - BBGlobalsolutions
            </h2>
            
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <span className="text-blue-400 text-xl">📅</span>
                <div>
                  <div className="font-semibold text-white">Time:</div>
                  <div className="text-gray-300">Jun 9, 2025 03:00 PM Eastern Time (US and Canada)</div>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <span className="text-green-400 text-xl">🆔</span>
                <div>
                  <div className="font-semibold text-white">Meeting ID:</div>
                  <div className="text-gray-300 font-mono">853 5803 8391</div>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <span className="text-yellow-400 text-xl">🔑</span>
                <div>
                  <div className="font-semibold text-white">Passcode:</div>
                  <div className="text-gray-300 font-mono">Z29g65</div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-4">
            <button
              onClick={handleJoinNow}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-lg text-lg transform transition-all duration-200 hover:scale-105 shadow-lg"
            >
              Join Zoom Meeting Now
            </button>
            
            {/* Countdown */}
            <div className="text-gray-400">
              {countdown > 0 ? (
                <p>Auto-redirecting in <span className="text-blue-400 font-bold">{countdown}</span> seconds...</p>
              ) : (
                <p>Redirecting to Zoom...</p>
              )}
            </div>
          </div>

          {/* Meeting URL */}
          <div className="mt-6 pt-6 border-t border-white/20">
            <p className="text-sm text-gray-400 mb-2">Direct Meeting URL:</p>
            <a 
              href="https://us05web.zoom.us/j/85358038391?pwd=dYJNtef6QOR3l8T5Vr6bVdbOCN2fcT.1"
              className="text-blue-400 hover:text-blue-300 text-sm break-all underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              https://us05web.zoom.us/j/85358038391?pwd=dYJNtef6QOR3l8T5Vr6bVdbOCN2fcT.1
            </a>
          </div>

          {/* Additional Info */}
          <div className="mt-6 text-xs text-gray-500">
            <p>Make sure you have the Zoom app installed for the best experience.</p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ZoomRedirect; 