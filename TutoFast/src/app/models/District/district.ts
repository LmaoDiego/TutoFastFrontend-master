import {EconomicLevel} from '../EconomicLevel/economic-level';

export class District {
  id: number;
  name: string;
  economicLevel: (EconomicLevel | number)[];
}

export class DistrictResponse {
  content: District[];
  totalElements: number;
}
