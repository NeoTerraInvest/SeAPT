const formatNumber = (num: string | number, fixed = 4) => {
  const number = Number(num);
  if (number < 0.0001) {
    const originalNum = num.toString().split('.');
    const firstNonZero = originalNum[1].search(/[1-9]/);
    const power = firstNonZero;
    const cleanNumber = originalNum[1].slice(firstNonZero);
    // console.log(power, num, originalNum);
    return `0.(0x${power})${cleanNumber}`;
  }
  return number.toFixed(fixed);
};

export default formatNumber;
