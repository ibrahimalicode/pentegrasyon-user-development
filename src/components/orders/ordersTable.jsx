//MODULE
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

//COMP
import GetirYemekTableBody from "./getirYemek/getirYemekTableBody";
import YemekSepetiTableBody from "./yemekSepeti/yemekSepetiTableBody";
import MigrosYemekTableBody from "./migrosYemek/migrosYemekTableBody";
import TrendyolYemekTableBody from "./trendyolYemek/trendyolYemekTableBody";

//REDUX
import {
  getIntegrationInformationByLicenseId as getGetirInfo,
  resetGetIntegrationInformationByLicenseId as resetGetGetirInfo,
} from "../../redux/informations/getirYemek/getIntegrationInformationByLicenseIdSlice";
import {
  getIntegrationInformationByLicenseId as getMigrosInfo,
  resetGetIntegrationInformationByLicenseId as resetGetMigrosInfo,
} from "../../redux/informations/migrosYemek/getIntegrationInformationByLicenseIdSlice";
import {
  getIntegrationInformationByLicenseId as getTrendInfo,
  resetGetIntegrationInformationByLicenseId as resetGetTrendInfo,
} from "../../redux/informations/trendyolYemek/getIntegrationInformationByLicenseIdSlice";
import {
  getIntegrationInformationByLicenseId as getYSInfo,
  resetGetIntegrationInformationByLicenseId as resetGetYSInfo,
} from "../../redux/informations/yemekSepeti/getIntegrationInformationByLicenseIdSlice";

export const marketplaceTableBodies = [
  {
    TableBody: GetirYemekTableBody,
  },
  {
    TableBody: MigrosYemekTableBody,
  },
  {
    TableBody: TrendyolYemekTableBody,
  },
  {
    TableBody: YemekSepetiTableBody,
  },
];

const OrdersTable = ({
  licenses,
  ordersData,
  setOrdersData,
  canSelectCourier,
}) => {
  const dispatch = useDispatch();
  const { infoData: getirInfo, error: getirErr } = useSelector(
    (s) => s.integrationInfos.getirYemek.getIntegrationInfo
  );
  const { infoData: migrosInfo, error: migrosErr } = useSelector(
    (s) => s.integrationInfos.migrosYemek.getIntegrationInfo
  );
  const { infoData: trendInfo, error: trendErr } = useSelector(
    (s) => s.integrationInfos.trendyolYemek.getIntegrationInfo
  );
  const { infoData: ysInfo, error: ysErr } = useSelector(
    (s) => s.integrationInfos.yemekSepeti.getIntegrationInfo
  );

  const settingsAddedLicenses = licenses.filter((L) => L.isSettingsAdded);

  const getirLicense = settingsAddedLicenses.find((L) => L.licenseTypeId === 0);
  const migrosLicense = settingsAddedLicenses.find((L) => L.licenseTypeId == 1);
  const trendLicense = settingsAddedLicenses.find((L) => L.licenseTypeId === 2);
  const ysLicense = settingsAddedLicenses.find((L) => L.licenseTypeId === 3);

  const [getirSett, setGetirSett] = useState(null);
  const [migrosSett, setMigrosSett] = useState(null);
  const [trendyolSett, setTrendyolSett] = useState(null);
  const [ysSett, setYsSett] = useState(null);

  //GET SETTINGS
  useEffect(() => {
    if (getirLicense && !getirSett) {
      dispatch(getGetirInfo(getirLicense.id));
    }
  }, [getirLicense]);
  useEffect(() => {
    if (migrosLicense && !migrosSett) {
      dispatch(getMigrosInfo(migrosLicense.id));
    }
  }, [migrosLicense]);
  useEffect(() => {
    if (trendLicense && !trendyolSett) {
      dispatch(getTrendInfo(trendLicense.id));
    }
  }, [trendLicense]);
  useEffect(() => {
    if (ysLicense && !ysSett) {
      dispatch(getYSInfo(ysLicense.id));
    }
  }, [ysLicense]);

  //SET SETTINGS
  //GETIR
  useEffect(() => {
    if (getirInfo) {
      setGetirSett(getirInfo);
      dispatch(resetGetGetirInfo());
    } else if (getirErr) dispatch(resetGetGetirInfo());
  }, [getirInfo, getirErr]);

  //MIGROS
  useEffect(() => {
    if (migrosInfo) {
      setMigrosSett(migrosInfo);
      dispatch(resetGetMigrosInfo());
    } else if (migrosErr) dispatch(resetGetMigrosInfo());
  }, [migrosInfo, migrosErr]);

  //TRENDYOL
  useEffect(() => {
    if (trendInfo) {
      setTrendyolSett(trendInfo);
      dispatch(resetGetTrendInfo());
    } else if (trendErr) dispatch(resetGetTrendInfo());
  }, [trendInfo, trendErr]);

  //YEMEKSEPETI
  useEffect(() => {
    if (ysInfo) {
      setYsSett(ysInfo);
      dispatch(resetGetYSInfo());
    } else if (ysErr) dispatch(resetGetYSInfo());
  }, [ysInfo, ysErr]);

  function getMarketPlaceAssets(order) {
    const TableBodyComp =
      marketplaceTableBodies[order.marketplaceId]?.TableBody;

    //GET SETTINGS ACCORDING TO MARKETPLACE
    const marketplaceSettings = [getirSett, migrosSett, trendyolSett, ysSett][
      order.marketplaceId
    ];

    return {
      TableBody: (
        <TableBodyComp
          order={order}
          licenses={licenses.filter(
            (L) => L.licenseTypeId == order.marketplaceId
          )}
          setOrdersData={setOrdersData}
          totalItems={ordersData?.length}
          canSelectCourier={canSelectCourier}
          licenseSettings={marketplaceSettings}
        />
      ),
    };
  }

  return (
    <main className="overflow-x-auto">
      <div className="border border-solid border-[--light-4] rounded-lg min-w-max">
        <table className="w-full text-sm font-light">
          <thead>
            <tr className="bg-[--light-3] h-10 text-left">
              <th></th>
              <th>Onay Kodu</th>
              <th>Restoran</th>
              <th>Tarih</th>
              <th>Müşteri Adı</th>
              <th>Bölge</th>
              <th>Kurye</th>
              <th>Tutar</th>
              <th className="w-28">Durum</th>
              <th className="pr-2">Yazdır</th>
            </tr>
          </thead>

          <tbody>
            {ordersData.map((order, i) => (
              <React.Fragment key={i}>
                {getMarketPlaceAssets(order)?.TableBody}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
};

export default OrdersTable;
