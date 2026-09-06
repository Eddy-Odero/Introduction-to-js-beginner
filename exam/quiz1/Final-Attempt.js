function FinalAttempt(callback, count) {
  return async function (...args) {
    for (let attempt = 0; attempt < count; attempt++) {
      try {
        return await callback(...args);
      } catch (error) {
        // Retry until the maximum number of attempts is reached
      }
    }

    return "Final Attempt Fail";
  };
}

const unreliableAsyncFunction = async (param) => {
  if (Math.random() > 0.7) {
    return `Success with ${param}`;
  }
  throw new Error("Failure");
};

const finalAttempt = FinalAttempt(unreliableAsyncFunction, 3);

finalAttempt("test")
  .then((result) => console.log(result))
  .catch((err) => console.error(err));