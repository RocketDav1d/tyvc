import { logger } from '@/utils/logger';

export type GeoLocatorResult = {
  center: {
    latitude: number;
    longitude: number;
  };
};

export class GeoLocator {
  private static MAPBOX_ACCESS_TOKEN = process.env
    .MAPBOX_ACCESS_TOKEN as string;

  // DEPRECATED
  // static async geoPointbyAddress(address: string) {
  //   const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?limit=1&access_token=${this.MAPBOX_ACCESS_TOKEN}`;

  //   const response = await fetch(url);
  //   const data = await response.json();

  //   if (data.features.length === 0) {
  //     throw new Error('No results found');
  //   }

  //   const centerPointCoords = data.features[0].center;
  //   logger.debug(
  //     `GeoLocator.geoPointByAddress: ${centerPointCoords[1]}, ${centerPointCoords[0]}`
  //   );

  //   const res = {
  //     center: {
  //       latitude: centerPointCoords[1],
  //       longitude: centerPointCoords[0],
  //     },
  //   };

  //   return res;
  // }

  static async geoPointbyAddress(address: string) {
    const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY as string;
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      address
    )}&key=${GOOGLE_API_KEY}`;
    logger.debug(url);

    const response = await fetch(url);
    const data = await response.json();

    if (data.status !== 'OK') {
      throw new Error('No results found');
    }

    try {
      const geometry = data.results[0].geometry;
      const location = geometry.location;
      logger.debug(
        `GeoLocator.geoPointByAddress: ${location.lat}, ${location.lng}`
      );

      // TODO: Also store bounds

      return {
        center: {
          latitude: location.lat,
          longitude: location.lng,
        },
      };
    } catch (e) {
      return {
        center: {
          latitude: null,
          longitude: null,
        },
      };
    }
  }

  static async addressByGeopoint(latitude: number, longitude: number) {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${this.MAPBOX_ACCESS_TOKEN}`;
    logger.debug(`GeoLocator.addressByGeopoint: url: ${url}`);

    const response = await fetch(url);
    const data = await response.json();

    if (data.features.length === 0) {
      throw new Error('No results found');
    }

    const address = data.features[0].place_name;
    logger.debug(`GeoLocator.addressByGeopoint: address: ${address}`);

    return address;
  }

  static async autocompleteAddress(
    query: string,
    language: string = 'en',
    limit: number = 5
  ) {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?access_token=${this.MAPBOX_ACCESS_TOKEN}&autocomplete=true&country=DE&fuzzyMatch=true&limit=${limit}&language=${language}`;
    logger.debug(`GeoLocator.autocompleteAddress: url: ${url}`);

    const response = await fetch(url);
    const data = await response.json();

    if (data.features.length === 0) {
      return [];
    }

    const results: any[] = [];
    data.features.map((feature: any) => {
      let shortCode = null;

      // Try to extract the state id from the context
      try {
        shortCode = feature.context
          .find((context: any) => {
            return context.short_code !== undefined;
          })
          ?.short_code.split('-')[1];
      } catch (e) {}

      if (feature.id && shortCode && feature.place_name && feature.center) {
        results.push({
          id: feature.id,
          place_name: feature.place_name,
          center: feature.center,
          stateId: shortCode,
        });
      }
    });

    return results;
  }
}
