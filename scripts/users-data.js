document.addEventListener('DOMContentLoaded', function() {
  getIPAddressAndSendToServer();
});

function getIPAddressAndSendToServer() {
  // Získanie IP adresy pomocou JavaScriptu
  fetch('https://api.ipify.org?format=json')
  .then(response => response.json())
  .then(data => {
      // Získanie IP adresy zo získaných dát
      const ipAddress = data.ip;
      // Vytvorenie a odoslanie POST požiadavky na server
      fetch('process.php', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({ ip_address: ipAddress })
      })
      .then(response => {
          if (!response.ok) {
              throw new Error('Network response was not ok');
          }
          return response.text(); // Alebo response.json() ak očakávate JSON odpoveď
      })
      .then(responseText => {
          // Tu môžete spracovať odpoveď zo servera
          console.log('Odpoveď zo servera:', responseText);
      })
      .catch(error => {
          console.error('Error:', error);
      });
  })
  .catch(error => {
      console.error('Error:', error);
  });
}
