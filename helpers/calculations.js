const calculations = {
  account_number() {
    return Math.floor(1000000000 + Math.random() * 9000000000);
  },
  tx_ref() {
    return Math.floor(Math.random() * 1000000000000);
  },
};

module.exports = calculations;
