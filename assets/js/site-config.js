const SITE_CONFIG = {
  COMPANY_NAME: 'StavPraha',
  PHONE: '+420 123 456 789',
  PHONE_HREF: '+420123456789',
  EMAIL: 'info@example.com',
  WHATSAPP: '420123456789',
  ADDRESS: 'Praha a okolí',
  ICO: 'doplňte',
  PRIMARY_CITY: 'Praha',
  WARRANTY_TEXT: 'Záruka dle typu prací a smlouvy'
};

window.SITE_CONFIG = SITE_CONFIG;

document.querySelectorAll('[data-company-name]').forEach(element => {
  element.textContent = SITE_CONFIG.COMPANY_NAME;
});

document.querySelectorAll('[data-phone]').forEach(element => {
  element.textContent = SITE_CONFIG.PHONE;
});

document.querySelectorAll('[data-email]').forEach(element => {
  element.textContent = SITE_CONFIG.EMAIL;
});

document.querySelectorAll('[data-address]').forEach(element => {
  element.textContent = SITE_CONFIG.ADDRESS;
});

document.querySelectorAll('[data-ico]').forEach(element => {
  element.textContent = SITE_CONFIG.ICO;
});

document.querySelectorAll('[data-primary-city]').forEach(element => {
  element.textContent = SITE_CONFIG.PRIMARY_CITY;
});

document.querySelectorAll('[data-warranty-text]').forEach(element => {
  element.textContent = SITE_CONFIG.WARRANTY_TEXT;
});

document.querySelectorAll('[data-phone-link]').forEach(element => {
  element.href = `tel:${SITE_CONFIG.PHONE_HREF}`;
});

document.querySelectorAll('[data-email-link]').forEach(element => {
  element.href = `mailto:${SITE_CONFIG.EMAIL}`;
});

document.querySelectorAll('[data-whatsapp-link]').forEach(element => {
  element.href = `https://wa.me/${SITE_CONFIG.WHATSAPP}`;
});
