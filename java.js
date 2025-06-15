const form = document.getElementById('employeeForm');
const tableBody = document.getElementById('employeeTableBody');
const rankHeader = document.getElementById('rankHeader');

const rankOrder = [
  "[01] Unit Commander",
  "[02] Unit Commander",
  "[03] Unit Commander",
  "Deputy Commander",
  "Gang Unit Captain",
  "Strike Team Leader",
  "Gang Intelligence Officer",
  "Tactical Specialist",
  "Undercover Operative",
  "Crime Suppression Officer",
  "Enforcer",
  "Recruit"
];

let rankSortAsc = true;

form.addEventListener('submit', function(e) {
  e.preventDefault();

  const stopien = document.getElementById('stopien').value.trim();
  const ranga = document.getElementById('ranga').value;

  if(stopien && ranga) {
    const row = document.createElement('tr');
    row.innerHTML = 
      <td>${stopien}</td>
      <td>${ranga}</td>
      <td class="action-buttons">
        <button class="edit-btn">Edytuj</button>
        <button class="delete-btn">Usuń</button>
      </td>
    ;

    // Usuń wiersz po kliknięciu Usuń
    row.querySelector('.delete-btn').addEventListener('click', () => {
      row.remove();
    });

    // Prosta funkcja edycji (do rozbudowy)
    row.querySelector('.edit-btn').addEventListener('click', () => {
      alert('Funkcja edycji do wdrożenia.');
    });

    tableBody.appendChild(row);
    form.reset();
  }
});

rankHeader.addEventListener('click', () => {
  const rowsArray = Array.from(tableBody.querySelectorAll('tr'));

  rowsArray.sort((a, b) => {
    const rankA = a.cells[1].textContent;
    const rankB = b.cells[1].textContent;

    const indexA = rankOrder.indexOf(rankA);
    const indexB = rankOrder.indexOf(rankB);

    const posA = indexA === -1 ? rankOrder.length : indexA;
    const posB = indexB === -1 ? rankOrder.length : indexB;

    if (posA < posB) return rankSortAsc ? -1 : 1;
    if (posA > posB) return rankSortAsc ? 1 : -1;
    return 0;
  });

  rowsArray.forEach(row => tableBody.appendChild(row));

  rankSortAsc = !rankSortAsc;
  rankHeader.textContent = Ranga ${rankSortAsc ? '▼' : '▲'};
});
form.addEventListener('submit', function(e) {
  e.preventDefault();

  const imie = document.getElementById('firstName').value.trim();
  const nazwisko = document.getElementById('lastName').value.trim();
  const uid = document.getElementById('idNumber').value.trim();
  const stopien = document.getElementById('stopien').value.trim();
  const ranga = document.getElementById('ranga').value;

  if (imie && nazwisko && uid && stopien && ranga) {
    const data = {
      imie,
      nazwisko,
      uid,
      stopien,
      ranga
    };

    fetch('https://script.google.com/macros/s/AKfycby4vDQbevbeCQzQuyTFKC0lyU1vzwevCfF3PpXHQKv7h_uH8_GVOhTTTcQ9JiOjPIJtMQ/exec', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(res => res.json())
    .then(response => {
      console.log('Zapisano:', response);
      form.reset();
      alert("Dodano pracownika!");
    })
    .catch(error => {
      console.error('Błąd:', error);
      alert("Wystąpił błąd przy zapisie.");
    });
  }
});
