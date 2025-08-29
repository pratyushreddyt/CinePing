import React from 'react';

const AlertCard = ({ movie, theatre, status, bookingUrl, lastChecked }) => (
  <div className="bg-white rounded shadow p-4 mb-4 flex flex-col gap-2">
    <div className="font-bold text-lg">{movie} @ {theatre}</div>
    <div className="flex items-center gap-2">
      <span className={`px-2 py-1 rounded text-xs ${status === 'available' ? 'bg-green-200 text-green-800' : 'bg-gray-200 text-gray-800'}`}>{status === 'available' ? 'Available' : 'Not Available'}</span>
      {bookingUrl && <a href={bookingUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">Book Now</a>}
    </div>
    <div className="text-xs text-gray-500">Last checked: {lastChecked}</div>
  </div>
);

export default AlertCard;
