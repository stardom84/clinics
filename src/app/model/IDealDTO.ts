declare namespace model {
  interface IDealDTO extends IDTO {
    id: string;
    code: string;
    clinicId: string;
    title: string;
    price: number;
    promoImgId: string;
  }
}
