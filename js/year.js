// year.js - fetches data/{YEAR}.json and populates year.html

function qs(id){ return document.getElementById(id) }

async function loadYear(){
  const params = new URLSearchParams(location.search);
  const year = params.get('year');
  const pageTitle = qs('page-title');
  const meta = qs('meta');
  const noData = qs('no-data');

  if(!year){
    pageTitle.textContent = 'Year not specified';
    noData.textContent = 'No year specified. Return to the timeline.';
    return;
  }

  pageTitle.textContent = `Year ${year}`;

  try{
    const res = await fetch(`data/${year}.json`);
    if(!res.ok) throw new Error('Year file not found');
    const data = await res.json();

    // meta
    meta.innerHTML = `<p class="muted">${data.company || ''}</p>`;

    renderList('responsibilities', data.responsibilities);
    renderList('structural', data.structural_design);
    renderList('hydraulics', data.hydraulics_drive);
    renderList('automation', data.automation_integration);
    renderPhotos(data.photos || []);

    noData.textContent = '';
  }catch(err){
    qs('responsibilities').innerHTML = '';
    qs('structural').innerHTML = '';
    qs('hydraulics').innerHTML = '';
    qs('automation').innerHTML = '';
    qs('gallery').innerHTML = '';
    noData.textContent = 'No records for this year.';
    console.warn(err);
  }
}

function renderList(id, items){
  const el = qs(id);
  if(!items || items.length === 0){
    el.innerHTML = '<p class="muted">No records for this year.</p>';
    return;
  }
  el.innerHTML = `<ul>${items.map(i => `<li>${i}</li>`).join('')}</ul>`;
}

function renderPhotos(photos){
  const gallery = qs('gallery');
  if(!photos || photos.length === 0){
    gallery.innerHTML = '<p class="muted">No images for this year.</p>';
    return;
  }
  gallery.innerHTML = photos.map(p => `<img loading="lazy" src="images/${p}" alt="">`).join('');
}

// print button
document.addEventListener('click', (e) => {
  if(e.target && e.target.id === 'printBtn') window.print();
});

loadYear();

