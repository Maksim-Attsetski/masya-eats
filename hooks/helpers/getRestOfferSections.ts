import { IRestaurantOffer } from '@/widgets/restaurant-offer';

export const getRestOfferSections = (restOffers: IRestaurantOffer[]) => {
  const offersAsObject: {
    [key: string]: IRestaurantOffer[];
  } = {};
  const result: { title: string; data: IRestaurantOffer[] }[] = [];

  restOffers.forEach((offer) => {
    const title = offer.genre;
    if (offersAsObject[title]) {
      offersAsObject[title] = [...offersAsObject[title], offer];
    } else {
      offersAsObject[title] = [offer];
    }
  });

  for (const key in offersAsObject) {
    if (Object.prototype.hasOwnProperty.call(offersAsObject, key)) {
      const element = offersAsObject[key];
      result.push({ title: key, data: element });
    }
  }

  return result;
};
