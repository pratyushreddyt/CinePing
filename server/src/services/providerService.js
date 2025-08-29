// Mock provider service
module.exports.checkAvailability = async (alert) => {
  // Simulate external API call with random true/false
  return Math.random() < 0.5;
};
