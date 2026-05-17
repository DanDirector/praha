const calcForm = document.getElementById('calcForm');

if (calcForm) {
  calcForm.addEventListener('submit', e => {
    e.preventDefault();

    const type = document.getElementById('objType').value;
    const area = parseFloat(document.getElementById('area').value);

    // Jednoducha validace vstupu.
    if (!area || area < 10) {
      document.getElementById('calcResult').textContent =
        'Zadejte platnou plochu (min. 10 m²).';
      return;
    }

    // Zakladni orientacni sazby v Kc za m2.
    const prices = { flat: 14000, house: 15500 };
    const estimate = area * (prices[type] || 0);

    document.getElementById('calcResult').innerHTML =
      `Orientační cena: <strong>${estimate.toLocaleString('cs-CZ')} Kč</strong>`;
  });
}
