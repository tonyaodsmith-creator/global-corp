export type Region = { id: string; name: string; hq: string; growth: number; revenue: number; risk: 'Basso'|'Medio'|'Medio-Alto'|'Alto' }
export type Plant = { name: string; region: string; capacity: number; utilization: number; status: 'Attivo'|'Manut.'|'FermO'; lateShipments: number }
export type Shipment = { id: string; route: string; eta: string; risk: 'Basso'|'Medio'|'Alto' }
export type PnL = { label: string; q3: number; q4: number }
export type Headcount = { dept: string; people: number; open: number; churn: number }
export type RDProject = { cod: string; title: string; progress: number; stage: 'Ricerca'|'Sperimentazione'|'Pilota'|'GoToMarket' }
export type NewsItem = { title: string; impact: 'Positivo'|'Negativo'|'Rischio'; tag: string; day: number }

export type GameState = {
  day: number;
  speed: 0|1|2|3; // 0=pause, 1=normal, 2=fast, 3=ultra
  cash: number;
  revenueYTD: number;
  operatingMargin: number;
  marketShare: number;
  esgScore: number;
  regions: Region[];
  plants: Plant[];
  shipments: Shipment[];
  pnlRows: PnL[];
  headcount: Headcount[];
  rd: RDProject[];
  news: NewsItem[];
  policies: {
    hiringFreeze: boolean;
    nonStrategicCostCut: boolean;
    roiThreshold: number;
    capexMax: number;
  };
}
