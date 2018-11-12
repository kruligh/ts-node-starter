export type IsoDate = string;

export const MILISECODS_HOUR = 3600;
export const MILISECONDS_DAY = 24 * MILISECODS_HOUR;

export const nowIso = (): IsoDate => {
  return new Date().toISOString();

};
export const nowPlusHours = (hours: number): IsoDate => {
  return new Date(Date.now() + hours * MILISECODS_HOUR).toISOString();

};

export const nowMili = () => Date.now();
