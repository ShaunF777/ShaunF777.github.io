async function loadYearData() {
  const params = new URLSearchParams(window.location.search);
  const year = params.get("year");
  const response = await fetch(`data/${year}.json`);
  const data = await response.json();

  renderList("responsibilities", data.responsibilities);
  renderList("structural", data.structural_design);
  renderList("hydraulics", data.hydraulics_drive);
  renderList("automation", data.automation_integration);
  renderPhotos("photos", data.photos);
}

function renderList(id, items) {
  const section = document.getElementById(id);
  section.innerHTML = items.length
    ? `<ul>${items.map(i => `<li>${i}</li>`).join("")}</ul>`
    : "<p>No records for this year.</p>";
}

function renderPhotos(id, photos) {
  const section = document.getElementById(id);
  section.innerHTML = photos.map(p => `<img src="images/${p}" alt="">`).join("");
}

loadYearData();

