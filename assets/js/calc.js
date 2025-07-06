const form = document.getElementById('calcForm');
const resultEl = document.getElementById('calcResult');

form.addEventListener('submit', function(event) {
  event.preventDefault();
  const type = document.getElementById('objType').value;
  const area = parseFloat(document.getElementById('area').value);
  if (!area || area < 10) {
    resultEl.textContent = 'Zadejte platnou plochu.';
    return;
  }
  const rate = type === 'house' ? 30000 : 25000;
  const price = area * rate;
  resultEl.textContent = `Orientační cena: ${price.toLocaleString('cs-CZ')} Kč`;
});

