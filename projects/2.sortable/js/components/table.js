import { store } from '../state.js';
import { parseString, formatMeasurement, formatStat } from '../utils/parsers.js';

/**
 * Column definition schema for the superhero table
 */
const COLUMNS = [
  { key: 'images.xs', label: 'Icon', sortable: false },
  { key: 'name', label: 'Name', sortable: true },
  { key: 'biography.fullName', label: 'Full Name', sortable: true },
  { key: 'powerstats.intelligence', label: 'Intelligence', sortable: true },
  { key: 'powerstats.strength', label: 'Strength', sortable: true },
  { key: 'powerstats.speed', label: 'Speed', sortable: true },
  { key: 'appearance.gender', label: 'Gender', sortable: true },
  { key: 'appearance.race', label: 'Race', sortable: true },
  { key: 'appearance.height', label: 'Height', sortable: true },
  { key: 'appearance.weight', label: 'Weight', sortable: true },
  { key: 'biography.placeOfBirth', label: 'Place of Birth', sortable: true },
  { key: 'biography.alignment', label: 'Alignment', sortable: true }
];

/**
 * Safely resolves nested object values by key path string
 */
function getNestedValue(obj, path) {
  if (!obj || !path) return null;
  return path.split('.').reduce((acc, key) => (acc && acc[key] !== undefined ? acc[key] : null), obj);
}

/**
 * Render the table container based on current store state
 */
export function renderTable(containerElement) {
  if (!containerElement) return;

  const { displayData, sortColumn, sortOrder } = store.state;

  if (!displayData || displayData.length === 0) {
    containerElement.innerHTML = `<div class="no-results">No heroes matched your search query.</div>`;
    return;
  }

  // 1. Build Header HTML with Sort Indicators
  const headerHTML = COLUMNS.map((col) => {
    if (!col.sortable) {
      return `<th>${col.label}</th>`;
    }

    const isActive = sortColumn === col.key;
    const arrow = isActive ? (sortOrder === 'asc' ? ' ▲' : ' ▼') : '';
    const activeClass = isActive ? 'active-sort' : '';

    return `
      <th class="sortable ${activeClass}" data-key="${col.key}">
        ${col.label}${arrow}
      </th>
    `;
  }).join('');

  // 2. Build Row HTML for Display Data Slice
  const rowsHTML = displayData.map((hero) => {
    const iconUrl = hero.images?.xs || hero.images?.sm || '';
    const heightStr = formatMeasurement(hero.appearance?.height);
    const weightStr = formatMeasurement(hero.appearance?.weight);

    return `
      <tr data-hero-id="${hero.id}">
        <td><img src="${iconUrl}" alt="${hero.name}" class="hero-icon" loading="lazy" /></td>
        <td><strong>${parseString(hero.name)}</strong></td>
        <td>${parseString(hero.biography?.fullName)}</td>
        <td>${formatStat(hero.powerstats?.intelligence)}</td>
        <td>${formatStat(hero.powerstats?.strength)}</td>
        <td>${formatStat(hero.powerstats?.speed)}</td>
        <td>${parseString(hero.appearance?.gender)}</td>
        <td>${parseString(hero.appearance?.race)}</td>
        <td>${heightStr}</td>
        <td>${weightStr}</td>
        <td>${parseString(hero.biography?.placeOfBirth)}</td>
        <td><span class="badge ${hero.biography?.alignment}">${parseString(hero.biography?.alignment)}</span></td>
      </tr>
    `;
  }).join('');

  containerElement.innerHTML = `
    <table>
      <thead>
        <tr>${headerHTML}</tr>
      </thead>
      <tbody>
        ${rowsHTML}
      </tbody>
    </table>
  `;

  // 3. Attach Sorting Click Listeners to Table Headers
  const thElements = containerElement.querySelectorAll('th.sortable');
  thElements.forEach((th) => {
    th.addEventListener('click', () => {
      const key = th.dataset.key;
      const newOrder = sortColumn === key && sortOrder === 'asc' ? 'desc' : 'asc';
      store.setState({ sortColumn: key, sortOrder: newOrder });
    });
  });

  // 4. Attach Row Click Event Listener for Navigating to the Hero Detail Page
  const trElements = containerElement.querySelectorAll('tbody tr');
  trElements.forEach((tr) => {
    tr.addEventListener('click', () => {
      const heroId = Number(tr.dataset.heroId);
      window.location.href = `hero.html?id=${heroId}`;
    });
  });
}