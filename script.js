// script.js - Uitgebreide versie met CZK converter en attractie details

// CZK naar EUR wisselkoers (September 2025)
const CZK_TO_EUR = 0.0412;

// Attractie details database
const attractionDetails = {
  'praagse-burcht': {
    title: 'Praagse Burcht & Sint-Vituskathedraal',
    subtitle: 'Grootste oude kasteel complex ter wereld',
    image: 'https://images.unsplash.com/photo-1541849546-216549ae216d?q=80&w=800&auto=format&fit=crop',
    history: `De Praagse Burcht werd rond 880 gesticht door Prins Bořivoj en is sindsdien het politieke centrum van Bohemen geweest. Het complex strekt zich uit over 70.000 vierkante meter en staat in het Guinness Book of Records als het grootste oude kasteel complex ter wereld.

De Sint-Vituskathedraal, het spirituele hart van Tsjechië, werd begonnen in 1344 door Keizer Karel IV op de plek van een 10e-eeuwse rotonde. De bouw duurde bijna 600 jaar - van 1344 tot 1929 - onder leiding van verschillende architecten waaronder Matthias van Arras en Peter Parler.`,
    
    visitTips: `Koop tickets online via hrad.cz om lange wachtrijen te vermijden. De beste tijd om te bezoeken is vroeg in de ochtend (8:00-9:00) of laat in de middag (16:00-17:00). Let op dat de laatste toegang 1 uur voor sluitingstijd is.

Voor de kathedraal specifiek: de Sint-Wenceslauskapel is gratis toegankelijk, maar voor het koor en de koninklijke graven heb je een speciaal ticket nodig. De Kroonkamer waar de Boheemse kroonjuwelen worden bewaard is alleen op speciale gelegenheden open.`,
    
    funFact: `De beroemde glas-in-lood ramen van Alfons Mucha in de kathedraal werden pas in 1931 voltooid - meer dan 20 jaar na Art Nouveau's hoogtijdperk. Mucha werkte er 6 jaar aan en weigerde betaling, omdat hij het als zijn "geschenk aan de natie" beschouwde.`
  },

  'troja-kasteel': {
    title: 'Troja Kasteel',
    subtitle: 'Barok juweel met spectaculaire tuintrap',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?q=80&w=800&auto=format&fit=crop',
    history: `Kasteel Troja werd gebouwd tussen 1679-1691 voor Graaf Wenzel Adalbert van Sternberg, geïnspireerd door Romeinse villa's die hij tijdens zijn Italiëreis had bezichtigd. Het ontwerp is van Jean Baptiste Mathey, een Franse architect die ook het Paleis Buquoy (nu Franse ambassade) ontwierp.

Het kasteel is gebouwd in vroeg-barokke stijl met invloeden uit de Franse en Italiaanse architectuur. De centrale hal met aangrenzende salons weerspiegelt de typische indeling van een Romeinse villa suburbana.`,
    
    visitTips: `Bereikbaar via tram 17 tot halte Trojská, daarna 10 minuten lopen. Het kasteel is eigendom van de stad Praag en herbergt 19e-eeuwse Tsjechische kunstcollecties. Bezoek de tuinen gratis, maar voor het interieur betaal je toegang.

Beste fototijd is in de late namiddag wanneer de zon de rode bakstenen gevel prachtig belicht. In de zomer zijn er regelmatig klassieke concerten in de tuinen.`,
    
    funFact: `De monumentale buitentrap is versierd met 28 sculpturen van Georg en Paul Heermann uit Dresden, die de strijd tussen goden en titanen uitbeelden. De centrale as van de tuin wijst precies naar de torens van de Sint-Vituskathedraal in de Praagse Burcht - een bewuste symbolische verbinding tussen kerk en staat.`
  },

  'joodse-wijk': {
    title: 'Joodse Wijk (Josefov)',
    subtitle: 'Europa\'s best bewaarde historische Joodse wijk',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?q=80&w=800&auto=format&fit=crop',
    history: `De Joodse wijk Josefov werd in 1850 genoemd naar Keizer Jozef II, die in 1781 de Tolerantie-edicten uitvaardigde die de situatie van Joden verbeterden. De wijk huisvest de Oude-Nieuwe Synagoge (1270), Europa's oudst actieve synagoge, en zes andere historische synagogen.

De Oude Joodse Begraafplaats (15e-18e eeuw) is een van de oudst overlevende Joodse begraafplaatsen ter wereld. Door ruimtegebrek liggen er twaalf lagen begraven met meer dan 12.000 zichtbare grafstenen op slechts 0,1 hectare.`,
    
    visitTips: `Koop combitickets via jewishmuseum.cz - dit geeft toegang tot alle synagogen en de begraafplaats. Let op: tickets sluiten 30 minuten voor sluitingstijd. Vrijdagmiddag en zaterdag gesloten vanwege sabbat.

Pinkas Synagoge bevat het indringende Holocaust Memorial met 80.000 namen van Tsjechische Joodse slachtoffers. Respecteer de ernst van deze plek en vermijd luidruchtig gedrag.`,
    
    funFact: `Franz Kafka werd geboren op slechts 300 meter van de Oude Joodse Begraafplaats en woonde zijn hele leven binnen een straal van enkele blokken van Josefov. Het graf van Rabbi Löw, de legendarische schepper van de Golem, is het meest bezochte graf - bezoekers leggen traditioneel steentjes neer voor geluk.`
  }
};

// Route informatie per dag
const routeData = {
  'donderdag-2-oktober': {
    totalDistance: '12 km',
    walkingTime: '2,5 uur',
    transportTime: '1 uur',
    highlights: ['Luchthaven → Hotel (25 min transfer)', 'Hotel → Karlín wijk (15 min lopen)', 'Avondwandeling oude stad (45 min)']
  },
  'vrijdag-3-oktober': {
    totalDistance: '15 km',
    walkingTime: '3 uur',
    transportTime: '45 min',
    highlights: ['Fietstour Oude Stad (3 uur, 12 km)', 'Tram naar Troja (20 min)', 'Wandeling Troja tuinen (30 min)']
  },
  'zaterdag-4-oktober': {
    totalDistance: '18 km',
    walkingTime: '4,5 uur',
    transportTime: '1 uur',
    highlights: ['Praagse Burcht wandeling (2 uur)', 'Strahov Klooster → Petřín (45 min)', 'Oude Stad verkenning (1,5 uur)']
  },
  'zondag-5-oktober': {
    totalDistance: '8 km',
    walkingTime: '2 uur',
    transportTime: '45 min',
    highlights: ['Joodse wijk tour (1,5 uur)', 'Oude Stadsplein lunch (30 min)', 'Vrije tijd wandeling (1 uur)']
  }
};

// Initialize currency converter
function initCurrencyConverter() {
    const czkInput = document.getElementById('czk-input');
    const eurInput = document.getElementById('eur-input');
    
    czkInput.addEventListener('input', function() {
        const czk = parseFloat(this.value) || 0;
        const eur = (czk * CZK_TO_EUR).toFixed(2);
        eurInput.value = eur > 0 ? eur : '';
    });
    
    eurInput.addEventListener('input', function() {
        const eur = parseFloat(this.value) || 0;
        const czk = Math.round(eur / CZK_TO_EUR);
        czkInput.value = czk > 0 ? czk : '';
    });
}

// Show attraction details modal
function showAttractionDetails(attractionKey) {
    const modal = document.getElementById('attraction-modal');
    const modalBody = document.getElementById('modal-body');
    const attraction = attractionDetails[attractionKey];
    
    if (!attraction) return;
    
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
                <div class="highlight-box">
                    <h4>Belangrijk om te weten:</h4>
                    <p>${attraction.visitTips}</p>
                </div>
            </div>
            
            <div class="fun-fact">
                <strong>💡 Leuk feitje:</strong> ${attraction.funFact}
            </div>
        </div>
    `;
    
    modal.style.display = 'block';
}

// Main app initialization
async function loadItinerary() {
    try {
        const res = await fetch('./itinerary.json', { cache: 'no-store' });
        if (!res.ok) throw new Error('Kon itinerary.json niet laden (' + res.status + ')');
        
        const data = await res.json();
        return data.days || [];
    } catch (err) {
        console.error('Fout bij laden itinerary.json:', err);
        document.getElementById('content').innerHTML = `
            <div style="text-align:center; color: var(--muted); padding: 2rem;">
                <h2>⚠️ Kon programma niet laden</h2>
                <p>Controleer of itinerary.json beschikbaar is.</p>
            </div>`;
        return [];
    }
}

function createRouteMap(dayKey) {
    const route = routeData[dayKey];
    if (!route) return '';
    
    return `
        <div class="route-map">
            <h3>📍 Route overzicht</h3>
            <div class="route-info">
                <div class="route-stat">
                    <strong>${route.totalDistance}</strong>
                    <span>Totale afstand</span>
                </div>
                <div class="route-stat">
                    <strong>${route.walkingTime}</strong>
                    <span>Looptijd</span>
                </div>
                <div class="route-stat">
                    <strong>${route.transportTime}</strong>
                    <span>Reistijd</span>
                </div>
            </div>
            <div class="mini-map">
                <div style="text-align: center;">
                    <strong style="color: var(--accent);">Hoogtepunten:</strong><br>
                    ${route.highlights.map(highlight => `• ${highlight}`).join('<br>')}
                </div>
            </div>
        </div>
    `;
}

function renderDay(day, isActive) {
    const dayKey = day.name.toLowerCase().replace(/\s+/g, '-');
    
    return `
        <div class="day-card" style="display: ${isActive ? 'block' : 'none'};" data-day="${dayKey}">
            <div class="day-header">
                <h2 class="day-title">${day.name}</h2>
                ${day.photos ? `
                    <div class="day-photos">
                        ${day.photos.map(photo => `<img src="${photo}" alt="${day.name}" class="day-photo">`).join('')}
                    </div>
                ` : ''}
            </div>
            
            ${createRouteMap(dayKey)}
            
            <div class="events-timeline">
                ${day.events.map(event => `
                    <div class="event">
                        <div class="event-time">${event.time}</div>
                        <div class="event-title">${event.title}</div>
                        ${event.desc ? `<div class="event-description">${event.desc}</div>` : ''}
                        ${event.notes ? `<div class="event-notes">${event.notes.replace(/\n/g, '<br>')}</div>` : ''}
                        ${event.facts ? `
                            <div class="event-facts">
                                ${event.facts.map(fact => `<div class="fact">${fact}</div>`).join('')}
                            </div>
                        ` : ''}
                        ${event.attractionKey ? `
                            <div class="attraction-link" onclick="showAttractionDetails('${event.attractionKey}')">
                                📍 Meer info over deze attractie
                            </div>
                        ` : ''}
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

// Initialize everything
document.addEventListener('DOMContentLoaded', async function() {
    initCurrencyConverter();
    
    const days = await loadItinerary();
    if (days.length === 0) return;
    
    // Create navigation
    const dayNav = document.getElementById('day-nav');
    dayNav.innerHTML = days.map((day, index) => 
        `<button class="day-btn ${index === 0 ? 'active' : ''}" data-day="${index}">
            ${day.name.split(' ')[0]} ${day.name.split(' ')[1]}
        </button>`
    ).join('');
    
    // Create content
    const content = document.getElementById('content');
    content.innerHTML = days.map((day, index) => renderDay(day, index === 0)).join('');
    
    // Add navigation listeners
    document.querySelectorAll('.day-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const dayIndex = parseInt(this.dataset.day);
            
            // Update active button
            document.querySelectorAll('.day-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Show/hide day cards
            document.querySelectorAll('.day-card').forEach((card, index) => {
                card.style.display = index === dayIndex ? 'block' : 'none';
            });
        });
    });
    
    // Modal close functionality
    const modal = document.getElementById('attraction-modal');
    const closeBtn = document.querySelector('.close');
    
    closeBtn.onclick = () => modal.style.display = 'none';
    window.onclick = (event) => {
        if (event.target == modal) modal.style.display = 'none';
    };
});
