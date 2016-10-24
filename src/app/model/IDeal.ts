declare namespace model {
  interface IDeal extends IDealDTO {
    id: string;
    clinicId: string;
    title: string;
    price: number;
  }
}
