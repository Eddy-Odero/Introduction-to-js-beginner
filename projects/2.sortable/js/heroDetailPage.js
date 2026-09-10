import { fetchSuperheroes } from './api.js';
import { renderHeroDetail } from './components/heroDetail.js';

/**
 * Bootstraps the dedicated hero detail page (hero.html).
 * Reads the hero id from the URL query string (?id=123) so the page
 * is directly linkable/bookmarkable/shareable.
 */
async function initHeroDetailPage() {
  const container = document.querySelector('#hero-detail-container');
  if (!container) return;

  const params = new URLSearchParams(window.location.search);
  const heroId = Number(params.get('id'));

  if (!heroId) {
    container.innerHTML = `<div class="no-results">No hero selected. <a href="index.html">Return to directory</a>.</div>`;
    return;
  }

  container.innerHTML = `<div class="loading">Loading hero details...</div>`;

  const heroes = await fetchSuperheroes();
  const hero = heroes.find((h) => h.id === heroId);

  if (!hero) {
    container.innerHTML = `<div class="no-results">Hero not found. <a href="index.html">Return to directory</a>.</div>`;
    return;
  }

  document.title = `${hero.name} — Hero Data Vault`;
  renderHeroDetail(container, hero);
}

document.addEventListener('DOMContentLoaded', initHeroDetailPage);
