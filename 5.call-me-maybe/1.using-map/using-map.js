function citiesOnly(arr) {
  return arr.map(item => item.city);
}
function upperCasingStates(arr) {
  return arr.map(state => 
    state
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  );
}

function fahrenheitToCelsius(arr) {
  return arr.map(tempStr => {
    const fahrenheit = parseInt(tempStr, 10);
    const celsius = Math.floor((fahrenheit - 32) * 5 / 9);
    return `${celsius}°C`;
  });
}

function trimTemp(arr) {
  return arr.map(item => ({
    ...item,
    temperature: item.temperature.replace(/\s+/g, '')
  }));
}
function tempForecasts(arr) {
  return arr.map(item => {
    const cleanTemp = item.temperature.replace(/\s+/g, '');
    const fahrenheit = parseInt(cleanTemp, 10);
    const celsius = Math.floor((fahrenheit - 32) * 5 / 9);
    
    const capitalizedState = item.state
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

    return `${celsius}°Celsius in ${item.city}, ${capitalizedState}`;
  });
}

console.log(citiesOnly([
    { city: "Los Angeles", temperature: "  101 °F   " },
    { city: "San Francisco", temperature: " 84 ° F   " }
]))
console.log(upperCasingStates(["alabama", "new jersey"]))
console.log(fahrenheitToCelsius(["68°F", "59°F", "25°F"]))
console.log(trimTemp([
    { city: "Los Angeles", temperature: "  101 °F   " },
    { city: "San Francisco", temperature: " 84 ° F   " }
]))

console.log(tempForecasts([{
    city: "Pasadena",
    temperature: " 101 °F",
    state: "california",
    region: "West"
}]))