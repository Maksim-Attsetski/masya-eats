import { TPaymentType } from '@/widgets/order';

export const getPaymentType = (
  type: TPaymentType = 'cash',
  withBigLetter: boolean = false
) => {
  let word = '';

  switch (type) {
    case 'card':
      word = 'картой';
      break;
    case 'card_courier':
      word = 'картой курьеру';
      break;
    case 'cash':
      word = 'наличными';
      break;
    default:
      word = 'наличными';
      break;
  }

  if (withBigLetter) {
    return word[0].toUpperCase() + word.slice(1, word.length);
  }

  return word;
};
