async function loadTimeline() {
  const response = await fetch("data/timeline.json");
  const timeline = await response.json();
  const container = document.getElementById("timeline");

  Object.keys(timeline).forEach(year => {
    const item = timeline[year];
    container.innerHTML += `
      <div class="timeline-item" onclick="goToYear(${year})">
        <span class="year">${year}</span>
        <img src="images/${item.photo}" alt="${year}">
        <p>${item.achievement}</p>
      </div>
    `;
  });
}

function goToYear(year) {
  window.location.href = `year.html?year=${year}`;
}

loadTimeline();
