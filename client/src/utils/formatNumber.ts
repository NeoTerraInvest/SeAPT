const formatNumber = (num: string | number, fixed = 4) => {
  const number = Number(num);
  if (number < 0.0001) {
    const originalNum = num.toString().replace('.', '');
    const firstNonZero = originalNum.search(/[1-9]/);
    const power = firstNonZero;
    const cleanNumber = originalNum.slice(firstNonZero);
    return `0.(0x${power})${cleanNumber}`;
  }
  return number.toFixed(fixed);
};

export default formatNumber;
