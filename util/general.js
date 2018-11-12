export const performDivisibility = (balance, divisibility) => {
  for (let i = 0; i < divisibility; i++) {
    balance = balance / 10;
  }
  return balance;
};

export const standardizeString = (string, capitalise = true) => {
  if (string) {
    if (capitalise) {
      return (string.charAt(0).toUpperCase() + string.slice(1)).replace(
        '_',
        ' ',
      );
    } else {
      return string.replace('_', ' ');
    }
  }
  return '';
};

export const snakeString = string => {
  // console.log(string);
  if (string) {
    return string.toLowerCase().replace(' ', '_');
  }
  return '';
};

export const decodeQR = string => {
  if (string) {
    let type,
      recipient,
      amount,
      account,
      currency,
      memo,
      note = '';
    if (string.includes(':')) {
      let temp = string.split(':');
      type = temp[0];

      temp = temp[1].split('?');
      recipient = temp[0];
      if (temp[1]) {
        temp = temp[1].split('&');
        for (i = 0; i < temp.length; i++) {
          let detail = temp[i].split('=');
          switch (detail[0]) {
            case 'amount':
              amount = detail[1];
              break;
            case 'note':
              note = detail[1];
              break;
            case 'memo':
              memo = detail[1];
              break;
            case 'account':
              account = detail[1];
              break;
            case 'currency':
              currency = detail[1];
              break;
          }
        }
      }
    } else {
      recipient = string;
    }
    return { type, recipient, amount, note, currency, account, memo };
  }
  return '';
};

export const concatAddress = address => {
  let value = '';
  if (address.line_1) {
    value = value + address.line_1;
  }
  if (address.line_2) {
    value = value + (value ? ', ' : '') + address.line_2;
  }
  if (address.city) {
    value = value + (value ? ', ' : '') + address.city;
  }
  if (address.state_province) {
    value = value + (value ? ', ' : '') + address.state_province;
  }
  if (address.country) {
    value = value + (value ? ', ' : '') + address.country;
  }
  if (address.postal_code) {
    value = value + (value ? ', ' : '') + address.postal_code;
  }
  return value;
};

export const concatBankAccount = account => {
  let value = '';
  if (account.name) {
    value = value + account.name;
  }
  if (account.bank_name) {
    value = value + (value ? ': ' : '') + account.bank_name;
  }
  if (account.number) {
    value = value + (value ? ', ' : '') + account.number;
  }
  if (account.type) {
    value = value + (value ? ', ' : '') + account.type;
  }
  return value;
};

export const safe = (item, field, value = '') =>
  item && item[field] ? item[field] : value;

export const bounds = (value, min, max) => Math.min(max, Math.max(min, value));
