// script.js - Compact Modern Version (corrected) v8

// CZK naar EUR wisselkoers (September 2025)
const CZK_TO_EUR = 0.0412;

// Route links per dag (multi-stop Google Maps routes)
const routeLinks = {
  'donderdag-2-oktober': 'https://www.google.com/maps/dir/Luchthaven+van+Praag+V%C3%A1clav+Havel+(PRG),+Aviatick%C3%A1,+Praag+6,+Tsjechi%C3%AB/ibis+Praha+Old+Town,+Na+Po%C5%99%C3%AD%C4%8D%C3%AD+5,+110+00+Petrsk%C3%A1+%C4%8Dtvr%C5%A5,+Tsjechi%C3%AB/Karl%C3%ADn,+Praag+8,+Tsjechi%C3%AB/@50.101672,14.3158572,11227m/data=!3m1!1e3!4m19!4m18!1m5!1m1!1s0x470bbfa7db790dcb:0x2fad80d1aca4f6ac!2m2!1d14.2631811!2d50.101791!1m5!1m1!1s0x470b94eab3b25893:0x7e2b090ba1b24310!2m2!1d14.4308817!2d50.0893534!1m5!1m1!1s0x470b94a336e7f09d:0x2600af105c20fbf1!2m2!1d14.451077!2d50.0947876?entry=ttu&g_ep=EgoyMDI1MDkxNy4wIKXMDSoASAFQAw%3D%3D',
  'vrijdag-3-oktober': 'https://www.google.com/maps/dir/ibis+Praha+Old+Town,+Na+Po%C5%99%C3%AD%C4%8D%C3%AD+5,+110+00+Petrsk%C3%A1+%C4%8Dtvr%C5%A5,+Tsjechi%C3%AB/Michalsk%C3%A1+509%2F10,+110+00+Praag+1-Oude+Stad,+Tsjechi%C3%AB/Pivovar+U+Medv%C3%ADdk%C5%AF,+Na+Per%C5%A1t%C3%BDn%C4%9B+345+%2F7,+110+00+Star%C3%A9+M%C4%9Bsto,+Tsjechi%C3%AB/Trojsk%C3%BD+z%C3%A1mek,+U+Trojsk%C3%A9ho+z%C3%A1mku+4%2F1,+171+00+Praha+7,+Tsjechi%C3%AB/Jazz+Dock,+Jan%C3%A1%C4%8Dkovo+n%C3%A1b%C5%99.+3249%2F2,+150+00+Praha+5-Sm%C3%ADchov,+Tsjechi%C3%AB/@50.0969921,14.3989005,5614m/data=!3m2!1e3!4b1!4m32!4m31!1m5!1m1!1s0x470b94eab3b25893:0x7e2b090ba1b24310!2m2!1d14.4308817!2d50.0893534!1m5!1m1!1s0x470b94ee9590a597:0x2a4318201bc7abeb!2m2!1d14.4201481!2d50.0849364!1m5!1m1!1s0x470b95aeb384b3f1:0x74f06162adc63a3d!2m2!1d14.4188172!2d50.0828866!1m5!1m1!1s0x470bead5a9a67e83:0x5ca54c1b5db2b7e0!2m2!1d14.4128739!2d50.1164556!1m5!1m1!1s0x470b94f9f5560257:0x4784f570148075bb!2m2!1d14.4083527!2d50.0773884!3e2?entry=ttu&g_ep=EgoyMDI1MDkxNy4wIKXMDSoASAFQAw%3D%3D',
  'zaterdag-4-oktober': 'https://www.google.com/maps/dir/Ibis+Praha+Old+Town,+Prague/Prague+Castle/Strahov+Monastery,+Prague/Petrin+Tower,+Prague/Pilsner+Urquell+Experience,+Prague/U+Pavouka,+Prague',
  'zondag-5-oktober': 'https://www.google.com/maps/dir/Ibis+Praha+Old+Town,+Prague/Jewish+Quarter,+Prague/Old+Town+Square,+Prague/V%C3%A1clav+Havel+Airport+Prague'
};

// Attractie details database (zonder ticket-informatie)
const attractionDetails = {
  'praagse-burcht': {
    title: 'Praagse Burcht & Sint-Vituskathedraal',
    subtitle: 'Grootste oude kasteel complex ter wereld',
    image: 'https://images.unsplash.com/photo-1541849546-216549ae216d?q=80&w=800&auto=format&fit=crop',
    history: `De Praagse Burcht werd rond 880 gesticht door Prins Bořivoj en is sindsdien het politieke centrum van Bohemen geweest. Het complex strekt zich uit over 70.000 vierkante meter en staat in het Guinness Book of Records als het grootste oude kasteel complex ter wereld.

De Sint-Vituskathedraal, het spirituele hart van Tsjechië, werd begonnen in 1344 door Keizer Karel IV op de plek van een 10e-eeuwse rotonde. De bouw duurde bijna 600 jaar - van 1344 tot 1929 - onder leiding van verschillende architecten waaronder Matthias van Arras en Peter Parler.`,
    visitTips: `De beste tijd om te bezoeken is vroeg in de ochtend (8:00-9:00) of laat in de middag (16:00-17:00) voor minder drukte. De Sint-Wenceslauskapel is het spirituele hart van de kathedraal en bevat de graven van Boheemse heiligen en koningen.

Het kasteel heeft verschillende circuits - van de Old Royal Palace tot de Golden Lane waar Franz Kafka ooit woonde. De tuinen bieden prachtige uitzichten over de stad.`,
    funFact: `De beroemde glas-in-lood ramen van Alfons Mucha in de kathedraal werden pas in 1931 voltooid - meer dan 20 jaar na Art Nouveau's hoogtijdperk. Mucha werkte er 6 jaar aan en weigerde betaling, omdat hij het als zijn "geschenk aan de natie" beschouwde.`
  },

  'troja-kasteel': {
    title: 'Troja Kasteel',
    subtitle: 'Barok juweel met spectaculaire tuintrap',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?q=80&w=800&auto=format&fit=crop',
    history: `Kasteel Troja werd gebouwd tussen 1679-1691 voor Graaf Wenzel Adalbert van Sternberg, geïnspireerd door Romeinse villa's die hij tijdens zijn Italiëreis had bezichtigd. Het ontwerp is van Jean Baptiste Mathey, een Franse architect die ook het Paleis Buquoy (nu Franse ambassade) ontwierp.

Het kasteel is gebouwd in vroeg-barokke stijl met invloeden uit de Franse en Italiaanse architectuur. De centrale hal met aangrenzende salons weerspiegelt de typische indeling van een Romeinse villa suburbana.`,
    visitTips: `Bereikbaar via tram 17 tot halte Trojská, daarna 10 minuten lopen. Het kasteel herbergt 19e-eeuwse Tsjechische kunstcollecties van Prague City Gallery. De tuinen zijn gratis toegankelijk en perfect voor wandelingen.

Beste fototijd is in de late namiddag wanneer de zon de rode bakstenen gevel prachtig belicht. In de zomer zijn er regelmatig klassieke concerten in de tuinen.`,
    funFact: `De monumentale buitentrap is versierd met 28 sculpturen van Georg en Paul Heermann uit Dresden, die de strijd tussen goden en titanen uitbeelden. De centrale as van de tuin wijst precies naar de torens van de Sint-Vituskathedraal in de Praagse Burcht - een bewuste symbolische verbinding tussen kerk en staat.`
  },

  'joodse-wijk': {
    title: 'Joodse Wijk (Josefov)',
    subtitle: 'Europa\'s best bewaarde historische Joodse wijk',
    image: 'https://images.unsplash.com/photo-1580500550469-3ec118113ee6?q=80&w=800&auto=format&fit=crop',
    history: `De Joodse wijk Josefov werd in 1850 genoemd naar Keizer Jozef II, die in 1781 de Tolerantie-edicten uitvaardigde die de situatie van Joden verbeterden. De wijk huisvest de Oude-Nieuwe Synagoge (1270), Europa's oudst actieve synagoge, en zes andere historische synagogen.

De Oude Joodse Begraafplaats (15e-18e eeuw) is een van de oudst overlevende Joodse begraafplaatsen ter wereld. Door ruimtegebrek liggen er twaalf lagen begraven met meer dan 12.000 zichtbare grafstenen op slechts 0,1 hectare.`,
    visitTips: `De wijk bevat zes synagogen, elk met hun eigen verhaal - van de gotische Oude-Nieuwe tot de prachtige Spaanse Synagoge in Moorse stijl. De Pinkas Synagoge bevat het indringende Holocaust Memorial met 80.000 namen van Tsjechische Joodse slachtoffers.

Franz Kafka's geboortehuis staat op slechts 300 meter van de Oude Joodse Begraafplaats. Respecteer de ernst van deze historische plek en vermijd luidruchtig gedrag.`,
    funFact: `Het graf van Rabbi Löw, de legendarische schepper van de Golem, is het meest bezochte graf op de begraafplaats. Bezoekers leggen traditioneel steentjes neer voor geluk. De legende zegt dat de Golem nog steeds verborgen ligt op de zolder van de Oude-Nieuwe Synagoge.`
  },

  'strahov-klooster': {
    title: 'Strahovský Klášter',
    subtitle: 'Premonstratenzerklooster met wereldberoemde bibliotheek',
    image: 'https://images.unsplash.com/photo-1544198365-f5d60b6d8190?q=80&w=800&auto=format&fit=crop',
    history: `Het Strahov Klooster werd gesticht in 1143 door Jindřich Zdík, de bisschop van Olomouc, en koning Vladislav II. Het is een van de oudste Premonstratenzerklooster ter wereld. De naam "Strahov" komt van het Tsjechische woord "strahovat" (wacht houden), omdat hier ooit wachters stonden die de weg naar de Praagse Burcht bewaakten.

Het klooster heeft een turbulente geschiedenis doorgemaakt - verwoest door brand in 1258, geplunderd door Hussieten in 1420, en later door Zweedse troepen tijdens de Dertigjarige Oorlog. In de 17e en 18e eeuw werd het herbouwd in barokke stijl.`,
    visitTips: `Het klooster is beroemd om zijn twee prachtige bibliotheekzalen: de barokke Theologische Zaal (1679) en de classicistische Filosofische Zaal (1797). De bibliotheek bevat meer dan 200.000 boeken, waaronder manuscripten uit de 9e eeuw.

De basiliek bevat het orgel waar Mozart speelde tijdens zijn bezoek in 1787. Vergeet niet het "Cabinet of Curiosities" te bezoeken met natuurhistorische verzamelingen, inclusief de resten van een uitgestorven dodo.`,
    funFact: `In de Theologische Zaal staat een uniek "boekenwiel" uit 1679 - een draaibaar rek waarmee monniken meerdere boeken tegelijk konden raadplegen zonder ze vast te houden. Het wiel draait zodanig dat de boeken altijd in dezelfde hoek blijven staan. De zaal bevat ook een hele muur met verschillende edities van de Bijbel in vele talen.`
  }
};

// Normaliseer dagnaam naar een stabiele key (voorkomt spatie/diacritics issues)
function toKey(name) {
  return name
    .normalize('NFKD')
    .replace(/\p{Diacritic}/gu, '')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

// Currency converter
function initCurrencyConverter() {
  const czkInput = document.getElementById('czk-input');
  const eurInput = document.getElementById('eur-input');
  if (!czkInput || !eurInput) return;

  czkInput.addEventListener('input', function () {
    const czk = parseFloat(this.value) || 0;
    const eur = (czk * CZK_TO_EUR).toFixed(2);
    eurInput.value = eur > 0 ? eur : '';
  });

  eurInput.addEventListener('input', function () {
    const eur = parseFloat(this.value) || 0;
    const czk = Math.round(eur / CZK_TO_EUR);
    czkInput.value = czk > 0 ? czk : '';
  });
}

// Modal met attractiedetails
function showAttractionDetails(attractionKey) {
  const modal = document.getElementById('attraction-modal');
  const modalBody = document.getElementById('modal-body');
  const attraction = attractionDetails[attractionKey];

  if (!attraction || !modal || !modalBody) {
    console.warn('Modal elementen of attractie data niet gevonden');
    return;
  }

  modalBody.innerHTML = `
    <div class="attraction-detail">
      <img src="${attraction.image}" alt="${attraction.title}" class="attraction-hero">
      <h1 class="attraction-title">${attraction.title}</h1>
      <p class="attraction-subtitle">${attraction.subtitle}</p>

      <div class="detail-section">
        <h3>Geschiedenis</h3>
        <p>${attraction.history}</p>
      </div>

      <div class="detail-section">
        <h3>Bezoektips</h3>
        <p>${attraction.visitTips}</p>
      </div>

      <div class="fun-fact">
        <strong>💡 Leuk feitje:</strong> ${attraction.funFact}
      </div>
    </div>
  `;

  modal.style.display = 'block';
}

// Itinerary laden
async function loadItinerary() {
  try {
    const res = await fetch('./itinerary.json', { cache: 'no-store' });
    if (!res.ok) throw new Error('Kon itinerary.json niet laden (' + res.status + ')');
    const data = await res.json();
    return data.days || [];
  } catch (err) {
    console.error('Fout bij laden itinerary.json:', err);
    const container = document.getElementById('content');
    if (container) {
      container.innerHTML = `
        <div style="text-align:center; color: var(--muted); padding: 2rem;">
          <h2 style="color: var(--accent);">⚠️ Kon programma niet laden</h2>
          <p>Controleer of itinerary.json beschikbaar is.</p>
          <p style="color: var(--muted); font-size: 0.9rem;">Error: ${err.message}</p>
        </div>`;
    }
    return [];
  }
}

// Route sectie (gebruikt routeLinks + debug log)
function createRouteSection(dayKey) {
  const link = routeLinks[dayKey] || 'https://www.google.com/maps';
  console.log('Route debug', { dayKey, link });
  return `
    <div class="route-section">
      <h3>🗺️ Dagelijkse Route</h3>
      <a href="${link}" target="_blank" class="route-map-link">
        📍 Bekijk route op kaart
      </a>
    </div>
  `;
}

// Event rendering (notes + facts samengevoegd)
function renderEvent(event) {
  const links = [];

  if (event.attractionKey) {
    links.push(`
      <div class="attraction-link" onclick="showAttractionDetails('${event.attractionKey}')">
        <span>🏛️</span><span>Meer info</span>
      </div>
    `);
  }

  if (event.mapsUrl) {
    links.push(`
      <a href="${event.mapsUrl}" target="_blank" class="maps-link">
        <span>📍</span><span>Locatie</span>
      </a>
    `);
  }

  if (event.siteUrl) {
    links.push(`
      <a href="${event.siteUrl}" target="_blank" class="website-link">
        <span>🔗</span><span>Website</span>
      </a>
    `);
  }

  let infoContent = '';
  if (event.notes) infoContent += event.notes.replace(/\n/g, '<br>');
  if (event.facts && event.facts.length) {
    if (infoContent) infoContent += '<br><br>';
    infoContent += '<strong>Interessant:</strong><br>• ' + event.facts.join('<br>• ');
  }

  return `
    <div class="event">
      <div class="event-header">
        <div class="event-time">${event.time}</div>
        <h3 class="event-title">${event.title}</h3>
      </div>
      <div class="event-content">
        ${event.desc ? `<div class="event-description">${event.desc}</div>` : ''}
        ${infoContent ? `<div class="event-info">${infoContent}</div>` : ''}
        ${links.length ? `<div class="event-links">${links.join('')}</div>` : ''}
      </div>
    </div>
  `;
}

// Dag rendering
function renderDay(day, isActive) {
  const dayKey = toKey(day.name);
  return `
    <div class="day-card" style="display: ${isActive ? 'block' : 'none'};" data-day="${dayKey}">
      <div class="day-header">
        <h2 class="day-title">${day.name}</h2>
        ${day.photos ? `
          <div class="day-photos">
            ${day.photos.map(photo => `<img src="${photo}" alt="${day.name}" class="day-photo">`).join('')}
          </div>` : ''
        }
      </div>

      ${createRouteSection(dayKey)}

      <div class="activities-section">
        <h3>📅 Dagprogramma</h3>
        <div class="events-timeline">
          ${day.events.map(event => renderEvent(event)).join('')}
        </div>
      </div>
    </div>
  `;
}

// Init
document.addEventListener('DOMContentLoaded', async function () {
  initCurrencyConverter();

  const days = await loadItinerary();
  if (!days.length) return;

  const dayNav = document.getElementById('day-nav');
  if (dayNav) {
    dayNav.innerHTML = days.map((day, index) =>
      `<button class="day-btn ${index === 0 ? 'active' : ''}" data-day="${index}">
        ${day.name.split(' ')[0]} ${day.name.split(' ')[1]}
      </button>`
    ).join('');
  }

  const content = document.getElementById('content');
  if (content) {
    content.innerHTML = days.map((day, index) => renderDay(day, index === 0)).join('');
  }

  document.querySelectorAll('.day-btn').forEach(btn => {
    btn.addEventListener('click', function () {
      const dayIndex = parseInt(this.dataset.day, 10);
      document.querySelectorAll('.day-btn').forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      document.querySelectorAll('.day-card').forEach((card, i) => {
        card.style.display = i === dayIndex ? 'block' : 'none';
      });
    });
  });

  const modal = document.getElementById('attraction-modal');
  const closeBtn = document.querySelector('.close');
  if (modal && closeBtn) {
    closeBtn.onclick = () => modal.style.display = 'none';
    window.onclick = (e) => { if (e.target === modal) modal.style.display = 'none'; };
  }
});



