
export enum Vocation {
  EK = 'ELITE KNIGHT',
  ED = 'ELDER DRUID',
  MS = 'MASTER SORCERER',
  EX_MONK = 'EXALTED MONK',
  RP = 'ROYAL PALADIN'
}

export enum PaymentMethod {
  COINS = 'Pagamento em coins',
  PERCENTAGE = '50% (% do Item)',
  CLOSED_PT = 'PT Fechada (5 chars para fazer a quest)'
}

export enum ServiceLocation {
  KALIBRA = 'Kalibra',
  OTHER = 'Outro Servidor'
}

export enum Quest {
  ROTTEN_BLOOD = 'Rotten Blood Quest',
  PRIMAL_ORDEAL = 'Primal Ordeal Quest',
  SOUL_WAR = 'Soul War Quest',
  GRAVEBORN = 'The Roost of the Graveborn Quest'
}

export interface FormData {
  quest: string;
  charName: string;
  charLevel: string;
  vocation: string;
  paymentMethod: string;
  serviceLocation: string;
  realLifeName: string;
  phone: string;
}

export interface OrderData {
  itemName: string;
  charName: string;
  phone: string;
}

export type AppTab = 'HOME' | 'FORM' | 'ABOUT' | 'TEAM' | 'ORDERS' | 'PARTNERS';
