const API_URL = 'http://localhost:3000/grants'; // change if hosted remotely

async function fetchGrants() {
    const res = await fetch(API_URL);
    const data = await res.json();
    return data;
}

function createGrantCard(grant) {
    const card = document.createElement('div');
    card.className = 'card';

    card.innerHTML = `
    <h2>${grant.title}</h2>
    <p>${grant.description || 'No description provided.'}</p>
    <a href="${grant.source_url}" target="_blank">View More</a>
  `;

    return card;
}

function displayGrants(grants) {
    const list = document.getElementById('grantList');
    list.innerHTML = '';

    grants.forEach(grant => {
        list.appendChild(createGrantCard(grant));
    });
}

async function init() {
    const allGrants = await fetchGrants();

    displayGrants(allGrants);

    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', (e) => {
        const filtered = allGrants.filter(g =>
            g.title.toLowerCase().includes(e.target.value.toLowerCase())
        );
        displayGrants(filtered);
    });
}

init();
