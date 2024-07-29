export default function formatNumberWithCommas(number) {
  // Convert number to string
  let numStr = number?.toString();

  // Check if the number has a decimal point
  if (numStr.includes('.')) {
    // Split the number into integer and decimal parts
    let [integerPart, decimalPart] = numStr.split('.');

    // Format integer part with commas
    let formattedIntegerPart = integerPart.replace(
      /\B(?=(\d{3})+(?!\d))/g,
      ',',
    );

    // Combine formatted integer part and decimal part and fix to 2 decimal places

    return `${formattedIntegerPart}.${decimalPart.slice(0, 2)}`;
  } else {
    // Format integer part with commas
    return numStr.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
}
