export type IsoDate = string;

export const SEC_PER_H = 3600;

export const nowIso = (): IsoDate => {
    return new Date().toISOString();
};

export const nowPlusHours = (hours: number): IsoDate => {
    return new Date(Date.now() + hours * SEC_PER_H).toISOString();
};
