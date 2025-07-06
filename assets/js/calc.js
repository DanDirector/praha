document.getElementById('calcForm').addEventListener('submit', e => {
  e.preventDefault();
  const type = document.getElementById('objType').value;
  const area = +document.getElementById('area').value || 0;

  // базовые цены, Kč за м²
  const prices = { flat: 14000, house: 15500 };
  const estimate = area * (prices[type] || 0);

  const text = estimate
    ? `Orientační cena: <strong>${estimate.toLocaleString('cs-CZ')} Kč</strong>`
    : 'Zadejte prosím plochu.';
  document.getElementById('calcResult').innerHTML = text;
});
