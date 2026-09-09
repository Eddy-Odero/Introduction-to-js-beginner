import { parseString, formatMeasurement, formatStat } from '../utils/parsers.js';

/**
 * Render the full hero detail view into the given container.
 * Used by hero.html as a dedicated, linkable/bookmarkable page
 * (as opposed to the previous overlay-modal approach).
 */
export function renderHeroDetail(containerElement, hero) {
  if (!containerElement || !hero) return;

  const heightStr = formatMeasurement(hero.appearance?.height);
  const weightStr = formatMeasurement(hero.appearance?.weight);
  const aliasesStr = Array.isArray(hero.biography?.aliases) && hero.biography.aliases.length > 0
    ? hero.biography.aliases.join(', ')
    : 'None';

  containerElement.innerHTML = `
    <div class="hero-detail-card">
      <div class="detail-header">
        <img src="${hero.images?.lg || hero.images?.md || hero.images?.sm || ''}" alt="${hero.name}" class="detail-hero-img" />
        <div>
          <h2>${parseString(hero.name)}</h2>
          <p class="real-name"><em>${parseString(hero.biography?.fullName)}</em></p>
          <span class="badge ${hero.biography?.alignment}">${parseString(hero.biography?.alignment)}</span>
        </div>
      </div>

      <div class="detail-body">
        <section class="detail-section">
          <h3>Power Stats</h3>
          <ul class="stats-grid">
            <li><strong>Intelligence:</strong> ${formatStat(hero.powerstats?.intelligence)}</li>
            <li><strong>Strength:</strong> ${formatStat(hero.powerstats?.strength)}</li>
            <li><strong>Speed:</strong> ${formatStat(hero.powerstats?.speed)}</li>
            <li><strong>Durability:</strong> ${formatStat(hero.powerstats?.durability)}</li>
            <li><strong>Power:</strong> ${formatStat(hero.powerstats?.power)}</li>
            <li><strong>Combat:</strong> ${formatStat(hero.powerstats?.combat)}</li>
          </ul>
        </section>

        <section class="detail-section">
          <h3>Appearance & Bio</h3>
          <p><strong>Gender:</strong> ${parseString(hero.appearance?.gender)}</p>
          <p><strong>Race:</strong> ${parseString(hero.appearance?.race)}</p>
          <p><strong>Height:</strong> ${heightStr}</p>
          <p><strong>Weight:</strong> ${weightStr}</p>
          <p><strong>Publisher:</strong> ${parseString(hero.biography?.publisher)}</p>
          <p><strong>First Appearance:</strong> ${parseString(hero.biography?.firstAppearance)}</p>
          <p><strong>Aliases:</strong> ${aliasesStr}</p>
        </section>

        <section class="detail-section">
          <h3>Work & Connections</h3>
          <p><strong>Occupation:</strong> ${parseString(hero.work?.occupation)}</p>
          <p><strong>Base:</strong> ${parseString(hero.work?.base)}</p>
          <p><strong>Group Affiliations:</strong> ${parseString(hero.connections?.groupAffiliation)}</p>
        </section>
      </div>
    </div>
  `;
}
