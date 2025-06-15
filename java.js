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
    row.innerHTML = `
      <td>${stopien}</td>
      <td>${ranga}</td>
      <td class="action-buttons">
        <button class="edit-btn">Edytuj</button>
        <button class="delete-btn">Usuń</button>
      </td>
    `;

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
  rankHeader.textContent = `Ranga ${rankSortAsc ? '▼' : '▲'}`;
});
