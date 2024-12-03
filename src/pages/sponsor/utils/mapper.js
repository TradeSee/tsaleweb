export default function CompanyMapper(data) {
  const id = data.id;
  const hsCodes = Object.keys(data?.myProducts);

  
  return {
    id,

    hsCodes: hsCodes.map((hsCode) => {
      return {
        code: hsCode,
        anx1: data.myProducts[hsCode].anx1,
        anx2: data.myProducts[hsCode].anx2,
        hsName: data.myProducts[hsCode].hsName,
        key: data.myProducts[hsCode].key,
        price: data.myProducts[hsCode].price,
        unit: data.myProducts[hsCode].unit,
      };
    }),

    activity: data.activity,
    address: data.address,
    city: data.city,
    companyN: data.companyN,
    companyS: data.companyS,
    corporateName: data.corporateName,
    idNumber: data.idNumber,
    fantasy: data.fantasy,
    issuing: data.issuing,
    jurisdiction: data.jurisdiction,
    naic: data.naic,
    neighborhood: data.neighborhood,
    privacy: data.privacy,
    state: data.state,
    terms: data.terms,
  };
}
