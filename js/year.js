// year.js - fetches data/{YEAR}.json and populates year.html

function qs(id){ return document.getElementById(id) }

function humanizeKey(key) {
  // Convert snake_case to Title Case with '&' for 'and'
  return key.replace(/_/g, ' ')
            .replace(/\b\w/g, c => c.toUpperCase())
            .replace(/ And /g, ' & ');
}

async function loadYear(){
  const params = new URLSearchParams(location.search);
  const year = params.get('year');
  const pageTitle = qs('page-title');
  const meta = qs('meta');
  const noData = qs('no-data');
  const categoriesContainer = qs('categories-container');

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

    // meta with role (if present) and company
    let metaHtml = '';
    if (data.role) metaHtml += `<h2>${data.role}</h2>`;
    if (data.company) metaHtml += `<p class="muted">${data.company}</p>`;
    meta.innerHTML = metaHtml;

    // Dynamic categories
    let hasCategories = false;
    Object.keys(data).forEach(key => {
      if (Array.isArray(data[key]) && key !== 'photos' && key !== 'structural_design' && key !== 'hydraulics_drive' && key !== 'automation_integration') { // Exclude photos & legacy keys if needed
        hasCategories = true;
        const section = document.createElement('article');
        section.id = key;
        section.setAttribute('aria-labelledby', `${key}-title`);
        const h2 = document.createElement('h2');
        h2.id = `${key}-title`;
        h2.textContent = humanizeKey(key);
        section.appendChild(h2);
        renderList(section, data[key]);
        categoriesContainer.appendChild(section);
      }
    });

    // Legacy support for old categories (remove once all JSONs updated)
    if (data.responsibilities) {
      hasCategories = true;
      const section = createCategorySection('responsibilities', 'Responsibilities', data.responsibilities);
      categoriesContainer.appendChild(section);
    }
    if (data.structural_design) {
      hasCategories = true;
      const section = createCategorySection('structural', 'Structural Design', data.structural_design);
      categoriesContainer.appendChild(section);
    }
    if (data.hydraulics_drive) {
      hasCategories = true;
      const section = createCategorySection('hydraulics', 'Hydraulics & Drive Systems', data.hydraulics_drive);
      categoriesContainer.appendChild(section);
    }
    if (data.automation_integration) {
      hasCategories = true;
      const section = createCategorySection('automation', 'Automation Systems Integration', data.automation_integration);
      categoriesContainer.appendChild(section);
    }

    renderPhotos(data.photos || []);

    if (!hasCategories) {
      noData.textContent = 'No detailed achievements recorded for this year.';
    } else {
      noData.textContent = '';
    }

  }catch(err){
    meta.innerHTML = '';
    categoriesContainer.innerHTML = '';
    qs('gallery').innerHTML = '';
    noData.textContent = 'No records for this year.';
    console.warn(err);
  }
}

function createCategorySection(id, title, items) {
  const section = document.createElement('article');
  section.id = id;
  section.setAttribute('aria-labelledby', `${id}-title`);
  const h2 = document.createElement('h2');
  h2.id = `${id}-title`;
  h2.textContent = title;
  section.appendChild(h2);
  renderList(section, items);
  return section;
}

function renderList(el, items){
  if(!items || items.length === 0){
    el.innerHTML += '<p class="muted">No records in this category.</p>';
    return;
  }
  const ul = document.createElement('ul');
  ul.innerHTML = items.map(i => `<li>${i}</li>`).join('');
  el.appendChild(ul);
}

function renderPhotos(photos){
  const gallery = qs('gallery');
  if(!photos || photos.length === 0){
    gallery.innerHTML = '<p class="muted">No images for this year.</p>';
    return;
  }
  // show first 6 with a "show more" if many
  const limit = 6;
  const initial = photos.slice(0, limit);
  gallery.innerHTML = initial.map(p => {
    const file = typeof p === 'string' ? p : p.file;
    const alt = (typeof p === 'object' && p.alt) ? p.alt : '';
    return `<img loading="lazy" src="images/${file}" alt="${alt}" onerror="this.src='images/placeholder.jpg'">`;
  }).join('');

  if(photos.length > limit){
    const moreBtn = document.createElement('button');
    moreBtn.textContent = `Show ${photos.length - limit} more`;
    moreBtn.addEventListener('click', () => {
      gallery.innerHTML = photos.map(p => {
        const file = typeof p === 'string' ? p : p.file;
        const alt = (typeof p === 'object' && p.alt) ? p.alt : '';
        return `<img loading="lazy" src="images/${file}" alt="${alt}" onerror="this.src='images/placeholder.jpg'">`;
      }).join('');
      moreBtn.remove();
    });
    gallery.parentNode.appendChild(moreBtn);
  }
}

// print button
document.addEventListener('click', (e) => {
  if(e.target && e.target.id === 'printBtn') window.print();
});

loadYear();