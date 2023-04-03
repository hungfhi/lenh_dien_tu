function formatNumber(value) {
    if (value) {
        return value && value?.toString()?.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
      }
      return value;
}

export default formatNumber;