export const formatDivisibility = (amount, divisibility) => {
  // console.log('formatDivisibility:amount', amount);
  // let temp = amount.toString();
  // console.log('temp', temp);
  // const pos = temp.length - divisibility;
  // console.log('pos', pos);
  // if (pos > 0) {
  //   let temp2 = temp.slice(0, pos);
  //   console.log('temp2', temp2);
  //   let temp3 = temp.slice(pos);
  //   console.log('temp3', temp3);
  //   temp = temp2 + '.' + temp3;
  //   // temp = temp.slice(pos, 0, '.');
  // } else {
  //   temp = '0.' + pos !== 0 ? '0'.repeat(-pos - 1) : '' + temp;
  // }
  // console.log('temp', temp);
  // return temp;
  // console.log('temp.length', temp.length);
  //   const decimals = getDecimals()
  // let tokenVolume = getBalance() * 10**-decimals
  for (let i = 0; i < divisibility; i++) {
    amount = amount / 10;
  }
  // console.log('amount', amount);
  return amount.toFixed(divisibility);
};

export const parseDivisibility = (raw, divisibility, newCharacter) => {
  let amountString = raw.replace('.', '');
  let pos = amountString.length - divisibility;
  let amountInt = parseInt(amountString);

  if (newCharacter) {
    if ((newCharacter === '.' || newCharacter === ',') && pos > 0) {
      amountInt = amountInt * 10 ** divisibility;
    } else {
      // console.log('newCharacter', newCharacter);
      newCharacter = parseInt(newCharacter);
      // console.log('newCharacter', newCharacter);
      if (!isNaN(newCharacter)) {
        amountInt = amountInt * 10 + newCharacter;
      }
    }
  } else {
    // console.log('no newChar');
  }

  return isNaN(amountInt) ? 0 : amountInt;
};

export const standardizeString = (string, capitalise = true) => {
  if (string) {
    if (capitalise) {
      return (string.charAt(0).toUpperCase() + string.slice(1)).replace(
        '_',
        ' '
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

export function removeDuplicates(myArr, prop) {
  return myArr.filter((obj, pos, arr) => {
    return arr.map(mapObj => mapObj[prop]).indexOf(obj[prop]) === pos;
  });
}
