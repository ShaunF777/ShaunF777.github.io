// main.js - loads data/timeline.json and renders timeline items

async function loadTimeline(){
  try{
    const res = await fetch('data/timeline.json');
    if(!res.ok) throw new Error('Failed to load timeline.json');
    const data = await res.json();
    renderTimeline(data);
  }catch(err){
    const container = document.getElementById('timeline');
    container.innerHTML = `<p class="muted">Could not load timeline data.</p>`;
    console.error(err);
  }
}

function renderTimeline(data){
  const container = document.getElementById('timeline');
  container.innerHTML = '';

  // sort years descending (newest first)
  const years = Object.keys(data).sort((a,b) => Number(b) - Number(a));

  years.forEach(year => {
    const item = data[year];
    const el = document.createElement('div');
    el.className = 'timeline-item';
    el.tabIndex = 0;
    el.setAttribute('role','link');
    el.setAttribute('aria-label', `${year} - ${item.company}: ${item.achievement}`);
    el.innerHTML = `
      <div class="year" aria-hidden="true">${year}</div>
      <img loading="lazy" src="images/${item.photo}" alt="${year} image">
      <p>${item.achievement}</p>
    `;

    // click and keyboard activation
    el.addEventListener('click', () => goToYear(year));
    el.addEventListener('keydown', (e) => { if(e.key === 'Enter' || e.key === ' ') goToYear(year); });

    container.appendChild(el);
  });
}

function goToYear(year){
  window.location.href = `year.html?year=${encodeURIComponent(year)}`;
}

loadTimeline();

