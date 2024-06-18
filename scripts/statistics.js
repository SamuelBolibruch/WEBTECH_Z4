const connectionsBlock = document.getElementById('num_of_connections');
const td1 = document.getElementById('time_range_1');
const td2 = document.getElementById('time_range_2');
const td3 = document.getElementById('time_range_3');
const td4 = document.getElementById('time_range_4');
const tbody = document.getElementById('table_destination_body');

document.addEventListener('DOMContentLoaded', function() {
    fetch(`get_all_data.php`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json(); // Očakáva sa JSON odpoveď
        })
        .then(response => {
            const num_of_connections = response.connections.num_of_connections;

            const time_range_1 = response.time_connections.time_range_1;
            const time_range_2 = response.time_connections.time_range_2;
            const time_range_3 = response.time_connections.time_range_3;
            const time_range_4 = response.time_connections.time_range_4;
            
            const destination_data = response.searched_destinations;

            connectionsBlock.innerHTML = num_of_connections;
            connectionsBlock.style.color = 'green';

            td1.innerHTML = time_range_1;
            td2.innerHTML = time_range_2;
            td3.innerHTML = time_range_3;
            td4.innerHTML = time_range_4;

            destination_data.forEach(destination => {
                // Vytvorte nový riadok pre každú destináciu
                const row = document.createElement('tr');

                // Naplňte bunky riadku súčasnými údajmi o destinácii
                row.innerHTML = `
                    <td>${destination.town}</td>
                    <td>${destination.country}</td>
                    <td>${destination.num_of_searches}</td>
                `;

                // Pridajte tento riadok do tbody tabuľky
                tbody.appendChild(row);
            });
            $('#destination-table').DataTable({
                paging: false, // Zrušenie stránkovania
                searching: false, // Povolenie vyhľadávania
                info: false
            });
        })
  });