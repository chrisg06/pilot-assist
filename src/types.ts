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