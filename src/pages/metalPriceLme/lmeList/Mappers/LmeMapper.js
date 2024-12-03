export default function LmeMapper(data, filter, metalName) {
  const dates = data[filter].datas;

  function findDataByMetal(metalArray, metalName) {
    for (const metal of metalArray) {
      if (metal[0] === metalName) {
        return metal.map((metalValue) => {
          const filteredMetal = metalValue.replace(",", ".");

          return parseFloat(filteredMetal);
        });
      }
    }
    return null;
  }

  const metalOfficialData = findDataByMetal(
    data[filter].official_morning,
    metalName
  );

  const metalMovingsData = findDataByMetal(data[filter].cashe_price, metalName);

  const metalUnofficialData = findDataByMetal(
    data[filter].official_unof,
    metalName
  );
  const metalWarehouseData = findDataByMetal(
    data[filter].official_unof,
    metalName
  );

  let cash = {};
  cash[dates[0]] = metalOfficialData[1];
  cash[dates[1]] = metalOfficialData[2];
  cash["float"] = metalOfficialData[3];

  let avgs = {};
  avgs[dates[6]] = metalOfficialData[7];
  avgs[dates[7]] = metalOfficialData[8];

  return {
    type: filter,
    Name: metalName,

    official: {
      cash,
      avgs,
    },

    movings: {
      "10days": metalMovingsData[1],
      "20days": metalMovingsData[2],
      "30days": metalMovingsData[3],
      "last Days": metalMovingsData[4],
    },

    unofficial: {
      cash: {
        official: metalUnofficialData[1],
        unofficial: metalUnofficialData[2],
        float: metalUnofficialData[3],
      },
      "3 month": {
        official: metalUnofficialData[4],
        unofficial: metalUnofficialData[5],
        float: metalUnofficialData[6],
      },
    },

    warehouse: {
      inventory: {
        MT: metalWarehouseData[1],
        float: metalWarehouseData[2],
      },
      volume: {
        MT: metalWarehouseData[3],
        float: metalWarehouseData[4],
      },
    },
  };
}
