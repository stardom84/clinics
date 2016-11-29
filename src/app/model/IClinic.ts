declare namespace model {
  interface IClinic extends BaseModel {
    id: string;
    code: string;
    name: string;
    location: string;
    rating?: number;
    specialities?: ISpecialty[];
  }
}


