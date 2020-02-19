let inDebounce;
function debounce(func, delay) {
  return function() {
    const context = this;
    const args = arguments;
    clearTimeout(inDebounce); // 定时器用来执行函数
    inDebounce = setTimeout(() => func.apply(context, args), delay);
  };
}
let inThrottle;
function throttle(func, limit) {
  // 开关
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => {
        // 定时器用来进行保证在一定时间内开关的状态
        inThrottle = false;
      }, limit);
    }
  };
}
export { debounce, throttle };
