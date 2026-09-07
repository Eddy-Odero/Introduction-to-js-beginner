function flattenAndMap(obj, mapper) {
  const flattened = {};
  let originalKeysCount = 0;
  let transformedKeysCount = 0;

  function flatten(current, path = "") {
    for (const key in current) {
      const value = current[key];
      const newPath = path ? `${path}.${key}` : key;

      if (
        value !== null &&
        typeof value === "object" &&
        !Array.isArray(value)
      ) {
        flatten(value, newPath);
      } else {
        originalKeysCount++;

        let mappedValue;

        if (Array.isArray(value)) {
          mappedValue = value.map((item) => mapper(item));
        } else {
          mappedValue = mapper(value);
        }

        flattened[newPath] = mappedValue;
        transformedKeysCount++;
      }
    }
  }

  flatten(obj);

  return {
    flattened,
    originalKeysCount,
    transformedKeysCount,
  };
}
