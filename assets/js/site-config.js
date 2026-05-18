const SITE_CONFIG = {
  companyName: 'StavPraha',
  tagline: 'Stavební a rekonstrukční práce pro byty, domy a komerční prostory.',
  location: 'Praha a okolí',
  primaryCity: 'Praha',
  phone: 'REAL_PHONE_HERE',
  email: 'REAL_EMAIL_HERE',
  whatsappNumber: 'REAL_PHONE_HERE',
  ico: 'REAL_ICO_HERE',
  address: 'REAL_ADDRESS_OR_PRAHA_A_OKOLI_HERE',
  baseUrl: 'https://stavpraha.com',
  warrantyText: 'Záruka dle typu prací a smlouvy'
};

SITE_CONFIG.COMPANY_NAME = SITE_CONFIG.companyName;
SITE_CONFIG.PHONE = SITE_CONFIG.phone;
SITE_CONFIG.PHONE_HREF = SITE_CONFIG.phone;
SITE_CONFIG.EMAIL = SITE_CONFIG.email;
SITE_CONFIG.WHATSAPP = SITE_CONFIG.whatsappNumber;
SITE_CONFIG.ADDRESS = SITE_CONFIG.address;
SITE_CONFIG.ICO = SITE_CONFIG.ico;
SITE_CONFIG.PRIMARY_CITY = SITE_CONFIG.primaryCity;
SITE_CONFIG.WARRANTY_TEXT = SITE_CONFIG.warrantyText;

window.SITE_CONFIG = SITE_CONFIG;

function isPlaceholderValue(value) {
  return !value || value.includes('REAL_') || value.includes('_HERE');
}

function hasUsablePhone(value) {
  return !isPlaceholderValue(value) && /\d{6,}/.test(value.replace(/\s/g, ''));
}

function hasUsableEmail(value) {
  return !isPlaceholderValue(value) && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function cleanPhone(value) {
  return value.replace(/[^\d+]/g, '');
}

document.querySelectorAll('[data-company-name]').forEach(element => {
  element.textContent = SITE_CONFIG.companyName;
});

document.querySelectorAll('[data-company-tagline]').forEach(element => {
  element.textContent = SITE_CONFIG.tagline;
});

document.querySelectorAll('[data-phone]').forEach(element => {
  element.textContent = hasUsablePhone(SITE_CONFIG.phone) ? SITE_CONFIG.phone : 'Telefon bude doplněn';
});

document.querySelectorAll('[data-email]').forEach(element => {
  element.textContent = hasUsableEmail(SITE_CONFIG.email) ? SITE_CONFIG.email : 'E-mail bude doplněn';
});

document.querySelectorAll('[data-address]').forEach(element => {
  element.textContent = isPlaceholderValue(SITE_CONFIG.address) ? 'Praha a okolí' : SITE_CONFIG.address;
});

document.querySelectorAll('[data-ico]').forEach(element => {
  element.textContent = isPlaceholderValue(SITE_CONFIG.ico) ? 'bude doplněno' : SITE_CONFIG.ico;
});

document.querySelectorAll('[data-primary-city]').forEach(element => {
  element.textContent = SITE_CONFIG.primaryCity;
});

document.querySelectorAll('[data-location]').forEach(element => {
  element.textContent = SITE_CONFIG.location;
});

document.querySelectorAll('[data-warranty-text]').forEach(element => {
  element.textContent = SITE_CONFIG.warrantyText;
});

document.querySelectorAll('[data-phone-link]').forEach(element => {
  if (hasUsablePhone(SITE_CONFIG.phone)) {
    element.href = `tel:${cleanPhone(SITE_CONFIG.phone)}`;
  } else {
    element.href = '/kontakty/';
  }
});

document.querySelectorAll('[data-email-link]').forEach(element => {
  if (hasUsableEmail(SITE_CONFIG.email)) {
    element.href = `mailto:${SITE_CONFIG.email}`;
  } else {
    element.href = '/kontakty/';
  }
});

document.querySelectorAll('[data-whatsapp-link]').forEach(element => {
  if (hasUsablePhone(SITE_CONFIG.whatsappNumber)) {
    element.href = `https://wa.me/${cleanPhone(SITE_CONFIG.whatsappNumber).replace(/^\+/, '')}`;
  } else {
    element.href = '/kontakty/';
    element.removeAttribute('target');
  }
});

const SERVICE_SCHEMA_BY_PATH = {
  '/rekonstrukce-bytu-praha/': 'Rekonstrukce bytů v Praze',
  '/rekonstrukce-koupelny-praha/': 'Rekonstrukce koupelen v Praze',
  '/obkladacske-prace-praha/': 'Obkladačské práce v Praze',
  '/elektroinstalace-praha/': 'Elektroinstalace v Praze',
  '/hodinovy-manzel-praha/': 'Hodinový manžel v Praze',
  '/kosmeticky-remont-praha/': 'Kosmetické opravy v Praze',
  '/zatepleni-fasady-praha/': 'Zateplení fasád v Praze',
  '/stukovani-omitky-praha/': 'Štukování a omítky v Praze',
  '/rekonstrukce-domu-praha/': 'Rekonstrukce rodinných domů v Praze',
  '/rekonstrukce-kancelari-praha/': 'Rekonstrukce kanceláří a komerčních prostor v Praze'
};

function addJsonLd(data) {
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.textContent = JSON.stringify(data);
  document.head.appendChild(script);
}

const currentPath = window.location.pathname.endsWith('/')
  ? window.location.pathname
  : `${window.location.pathname}/`;

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'HomeAndConstructionBusiness',
  name: SITE_CONFIG.companyName,
  url: SITE_CONFIG.baseUrl,
  description: SITE_CONFIG.tagline,
  areaServed: SITE_CONFIG.location,
  image: `${SITE_CONFIG.baseUrl}/assets/img/home-img.jpg`
};

if (hasUsablePhone(SITE_CONFIG.phone)) {
  localBusinessSchema.telephone = SITE_CONFIG.phone;
}

if (hasUsableEmail(SITE_CONFIG.email)) {
  localBusinessSchema.email = SITE_CONFIG.email;
}

if (!isPlaceholderValue(SITE_CONFIG.address)) {
  localBusinessSchema.address = SITE_CONFIG.address;
}

addJsonLd(localBusinessSchema);

if (SERVICE_SCHEMA_BY_PATH[currentPath]) {
  addJsonLd({
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: SERVICE_SCHEMA_BY_PATH[currentPath],
    provider: {
      '@type': 'HomeAndConstructionBusiness',
      name: SITE_CONFIG.companyName,
      url: SITE_CONFIG.baseUrl
    },
    areaServed: SITE_CONFIG.location,
    serviceType: SERVICE_SCHEMA_BY_PATH[currentPath],
    url: `${SITE_CONFIG.baseUrl}${currentPath}`
  });
}
