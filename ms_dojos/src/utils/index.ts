import { ForbiddenException, HttpException, HttpStatus } from '@nestjs/common';
import axios, { AxiosError } from 'axios';
import { first } from 'lodash';
import { MapQuestResponse } from '@commons/types/MapQuestResponse';
import { DojoAddress, DojoCoordinates } from '@commons/types/Dojo';
import { UserClaims } from '@commons/types/UserClaims';
import { RESOURCE_NOT_ALLOWED_MESSAGE } from '@commons/consts';

export const normalilzeString = (text: string): string => {
  const str = text.toLowerCase();

  const com_acento =
    'ÀÁÂÃÄÅÆÇÈÉÊËÌÍÎÏÐÑÒÓÔÕÖØÙÚÛÜÝŔÞßàáâãäåæçèéêëìíîïðñòóôõöøùúûüýþÿŕ';

  const sem_acento =
    'AAAAAAACEEEEIIIIDNOOOOOOUUUUYRsBaaaaaaaceeeeiiiionoooooouuuuybyr';

  let novastr = '';

  for (let i = 0; i < str.length; i++) {
    let troca = false;
    for (let a = 0; a < com_acento.length; a++) {
      if (str.substr(i, 1) == com_acento.substr(a, 1)) {
        novastr += sem_acento.substr(a, 1);
        troca = true;
        break;
      }
    }
    if (troca == false) {
      novastr += str.substr(i, 1);
    }
  }
  return novastr;
};

export const transformAddressToString = (address: DojoAddress): string => {
  return `${address.street}+${address.number}+${address.neighborhood}+${address.city}+${address.state}`;
};

export const getGeoFromAddress = async (
  address: string,
): Promise<DojoCoordinates> => {
  try {
    const addressToSearch = `http://www.mapquestapi.com/geocoding/v1/address?key=${
      process.env.MAP_QUEST_API_KEY
    }&location=${normalilzeString(address.split(' ').join('+'))}`;

    const { data: response } = await axios.get<MapQuestResponse>(
      addressToSearch,
    );

    if (!first(response.results)) {
      throw new HttpException('Invalid Address', HttpStatus.BAD_REQUEST);
    }

    return first(first(response.results).locations).latLng;
  } catch (error) {
    throw new Error('Error to request GEO');
  }
};

export const checkDojoIdPermission = (
  user: UserClaims,
  dojoId: string,
): Promise<void> => {
  if (user.dojoId === 'all') return;

  if (user.dojoId != dojoId) {
    throw new ForbiddenException(RESOURCE_NOT_ALLOWED_MESSAGE);
  }
};
