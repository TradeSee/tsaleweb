export default function CompanyMapperInfo(dataArray) {
  return dataArray.map((data) => ({
    id: data.id,
    country: data.country,
    companyName: data.name,
    savedAt: data?.saved_at,
  }));
}
