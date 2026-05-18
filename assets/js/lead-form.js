const LEAD_FORM_SERVICES = [
  'Rekonstrukce bytu',
  'Rekonstrukce koupelny',
  'Obkladačské práce',
  'Elektroinstalace',
  'Hodinový manžel',
  'Kosmetické opravy',
  'Štukování / omítky',
  'Zateplení fasády',
  'Rekonstrukce domu',
  'Rekonstrukce kanceláře / komerčního prostoru',
  'Jiné'
];

function createServiceOptions(selectedService) {
  return LEAD_FORM_SERVICES.map(service => {
    const selected = service === selectedService ? ' selected' : '';
    return `<option value="${service}"${selected}>${service}</option>`;
  }).join('');
}

function renderLeadForm(container, index) {
  const service = container.dataset.service || '';
  const title = container.dataset.title || 'Získat nezávaznou kalkulaci';
  const intro = container.dataset.intro || 'Čím více informací pošlete, tím lépe dokážeme odhadnout další postup.';
  const endpoint = container.dataset.endpoint || '';
  const prefix = `lead-form-${index}`;

  container.innerHTML = `
    <h2 class="text-center mb-3">${title}</h2>
    <p class="lead text-center mb-4">${intro}</p>
    <form class="lead-form" novalidate data-endpoint="${endpoint}">
      <div class="row g-3">
        <div class="col-md-6">
          <label class="form-label" for="${prefix}-name">Jméno</label>
          <input type="text" class="form-control" id="${prefix}-name" name="name" autocomplete="name" required>
        </div>
        <div class="col-md-6">
          <label class="form-label" for="${prefix}-contact">Telefon nebo e-mail</label>
          <input type="text" class="form-control" id="${prefix}-contact" name="contact" autocomplete="email" required>
        </div>
        <div class="col-md-6">
          <label class="form-label" for="${prefix}-service">Typ služby</label>
          <select class="form-select" id="${prefix}-service" name="service" required>
            ${createServiceOptions(service)}
          </select>
        </div>
        <div class="col-md-6">
          <label class="form-label" for="${prefix}-location">Lokalita / část Prahy</label>
          <input type="text" class="form-control" id="${prefix}-location" name="location" placeholder="Např. Praha 4, Vinohrady, okolí Prahy">
        </div>
        <div class="col-md-6">
          <label class="form-label" for="${prefix}-area">Přibližná plocha</label>
          <input type="text" class="form-control" id="${prefix}-area" name="area" placeholder="Např. 45 m², koupelna 4 m²">
        </div>
        <div class="col-md-6">
          <label class="form-label" for="${prefix}-timing">Kdy chcete práce řešit</label>
          <input type="text" class="form-control" id="${prefix}-timing" name="timing" placeholder="Např. co nejdříve, za měsíc, jaro">
        </div>
        <div class="col-12">
          <label class="form-label" for="${prefix}-description">Popis zakázky</label>
          <textarea class="form-control" id="${prefix}-description" name="description" rows="5" placeholder="Popište stručně prostor, aktuální stav, požadovaný rozsah a důležité detaily." required></textarea>
          <div class="form-text">Čím více informací pošlete, tím lépe dokážeme odhadnout další postup.</div>
        </div>
        <div class="col-12">
          <label class="form-label" for="${prefix}-photos">Fotografie prostoru</label>
          <input type="file" class="form-control" id="${prefix}-photos" name="photos" accept="image/*" multiple>
          <div class="form-text">Volitelné. Fotky pomohou s orientačním posouzením, pokud bude formulář napojený na backend.</div>
        </div>
        <div class="col-12">
          <div class="form-check">
            <input class="form-check-input" type="checkbox" value="yes" id="${prefix}-privacy" name="privacy" required>
            <label class="form-check-label" for="${prefix}-privacy">Souhlasím se zpracováním údajů za účelem odpovědi na poptávku.</label>
          </div>
        </div>
        <div class="col-12">
          <div class="lead-form-message alert d-none" role="status" aria-live="polite"></div>
        </div>
        <div class="col-12 d-flex flex-wrap justify-content-center gap-2">
          <button type="submit" class="btn btn-primary">Získat nezávaznou kalkulaci</button>
          <a href="https://wa.me/" data-whatsapp-link class="btn btn-success">Napsat na WhatsApp</a>
        </div>
      </div>
    </form>
  `;
}

function showLeadFormMessage(form, type, text) {
  const message = form.querySelector('.lead-form-message');
  if (!message) return;

  message.className = `lead-form-message alert alert-${type} mt-2`;
  message.textContent = text;
}

function handleLeadFormSubmit(event) {
  const form = event.currentTarget;
  const endpoint = form.dataset.endpoint || form.getAttribute('action') || '';

  if (!form.checkValidity()) {
    event.preventDefault();
    form.classList.add('was-validated');
    showLeadFormMessage(form, 'danger', 'Zkontrolujte prosím povinná pole a souhlas se zpracováním údajů.');
    return;
  }

  // TODO: Add a real endpoint, for example Formspree, Netlify Forms, CRM webhook or a custom backend.
  if (!endpoint) {
    event.preventDefault();
    showLeadFormMessage(form, 'danger', 'Formulář se nepodařilo odeslat. Zkuste to prosím znovu nebo nám napište na WhatsApp.');
    return;
  }

  event.preventDefault();

  fetch(endpoint, {
    method: form.getAttribute('method') || 'POST',
    body: new FormData(form)
  }).then(response => {
    if (!response.ok) {
      throw new Error('Lead form request failed');
    }

    form.reset();
    form.classList.remove('was-validated');
    showLeadFormMessage(form, 'success', 'Děkujeme, poptávku jsme přijali. Ozveme se vám s dalším postupem.');
  }).catch(() => {
    showLeadFormMessage(form, 'danger', 'Formulář se nepodařilo odeslat. Zkuste to prosím znovu nebo nám napište na WhatsApp.');
  });
}

document.querySelectorAll('[data-lead-form]').forEach((container, index) => {
  renderLeadForm(container, index + 1);
});

document.querySelectorAll('.lead-form').forEach(form => {
  form.addEventListener('submit', handleLeadFormSubmit);
});
