function filterShortStateName(arr) {
  return arr.filter(state => state.length < 7);
}

function filterStartVowel(arr) {
  return arr.filter(state => /^[aeiou]/i.test(state));
}
function filter5Vowels(arr) {
  return arr.filter(state => {
    const matches = state.match(/[aeiou]/gi);
    return matches !== null && matches.length >= 5;
  });
}
function filter1DistinctVowel(arr) {
  return arr.filter(state => {
    const matches = state.toLowerCase().match(/[aeiou]/g);
    if (!matches) return false;
    const uniqueVowels = new Set(matches);
    return uniqueVowels.size === 1;
  });
}
function multiFilter(arr) {
  return arr.filter(item => {
    const hasLongCapital = item.capital.length >= 8;
    const nameStartsConsonant = !/^[aeiou]/i.test(item.name);
    const tagHasVowel = /[aeiou]/i.test(item.tag);
    const isNotSouth = item.region !== 'South';

    return hasLongCapital && nameStartsConsonant && tagHasVowel && isNotSouth;
  });
}

