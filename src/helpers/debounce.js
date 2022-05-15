export default function debounce(func, wait, immediate) {
  let timeout;

  return function executedFunction(...args) {
    // eslint-disable-next-line no-invalid-this
    const context = this;

    const later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };

    const callNow = immediate && !timeout;

    clearTimeout(timeout);

    timeout = setTimeout(later, wait);

    if (callNow) func.apply(context, args);
  };
};
