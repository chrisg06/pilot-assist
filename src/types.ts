export type WindType =  {
    raw: string,
    direction: string,
    speed: string,

}

export type WxType = {
    wx: String,
    vis: string,
    cld: Array<string>,
}

export type Route = {
    id: number;
    dept: string;
    dest: string;
    acft: string;
    route: string;
    notes: string;
  };

export type Notam = {
    _id: string,
    station: string,
    number: string,
    start: string,
    end: string,
    schedule: string,
    body: string,
    raw: string,
    saved_at: string
}