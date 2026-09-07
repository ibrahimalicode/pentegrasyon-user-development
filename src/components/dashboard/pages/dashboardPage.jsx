//MODULES
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

//COMP
import StatCard from "../statCard";
import SalesBar from "../salesBar";
import OrdersTimeline from "../ordersTimeline";
import OrderAnalysis from "../orderAnalysis";
import RestaurantsTable from "../restaurantsTable";
import MarketplaceChart from "../merketplaceChart";
import DownloadDesktopButton from "../../common/downloadDesktopButton";

//UTILS
import { formatDate } from "../../../utils/utils";

//REDUX
import {
  getLicenses,
  resetGetLicenses,
} from "../../../redux/licenses/getLicensesSlice";
import {
  getOrderFacts,
  resetGetOrderFacts,
} from "../../../redux/orders/getOrderFactsSlice";

const FACTS_PAGE_SIZE = 5000;
// Safety cap: 3 pages = 15k orders / 30 days, far above any single account.
const FACTS_MAX_PAGES = 3;

const DashboardPage = () => {
  const dispatch = useDispatch();
  // Order KPIs are derived inside SalesBar (which owns the statistics
  // fetch and its filters) and lifted here so the cards can show them.
  const [orderTotals, setOrderTotals] = useState(null);

  // The marketplace charts only show marketplaces the user actually holds
  // a license for; null = not resolved yet (charts fall back to the four
  // majors so a failed fetch never blanks them).
  const { licenses } = useSelector((state) => state.licenses.getLicenses);
  const [licensedMarketplaceIds, setLicensedMarketplaceIds] = useState(null);

  useEffect(() => {
    if (!licensedMarketplaceIds) {
      dispatch(getLicenses({ pageNumber: 0, pageSize: 0 }));
    }
  }, [licensedMarketplaceIds]);

  useEffect(() => {
    if (licenses?.data) {
      setLicensedMarketplaceIds([
        ...new Set(licenses.data.map((L) => L.licenseTypeId)),
      ]);
      dispatch(resetGetLicenses());
    }
  }, [licenses]);

  // Last-30-days OrderFacts rows — fetched ONCE here and shared by the
  // analysis section and the payment/courier splits in the donut card.
  const { data: factsData, error: factsError } = useSelector(
    (state) => state.orders.facts,
  );
  const [factsRows, setFactsRows] = useState(null);
  const [factsUnavailable, setFactsUnavailable] = useState(false);
  const [factsBuffer] = useState({ rows: [], page: 1 });

  function fetchFactsPage(pageNumber) {
    dispatch(
      getOrderFacts({
        pageNumber,
        pageSize: FACTS_PAGE_SIZE,
        startDateTime: formatDate(
          new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
        ),
        endDateTime: formatDate(new Date()),
      }),
    );
  }

  useEffect(() => {
    factsBuffer.rows = [];
    factsBuffer.page = 1;
    fetchFactsPage(1);
  }, []);

  useEffect(() => {
    if (factsData) {
      factsBuffer.rows = [...factsBuffer.rows, ...(factsData.data || [])];
      const morePages =
        factsData.hasNextPage && factsBuffer.page < FACTS_MAX_PAGES;
      dispatch(resetGetOrderFacts());
      if (morePages) {
        factsBuffer.page += 1;
        fetchFactsPage(factsBuffer.page);
      } else {
        setFactsRows(factsBuffer.rows);
        setFactsUnavailable(false);
      }
    }
    if (factsError) {
      if (!factsRows) setFactsUnavailable(true);
      dispatch(resetGetOrderFacts());
    }
  }, [factsData, factsError]);

  return (
    // px-[4%] matches every other page; the old px-16 made the dashboard
    // the only screen with a different gutter.
    <section className="pt-20 sm:pt-[5.25rem] px-[4%] pb-5 min-h-0">
      <div className="flex flex-col gap-4 py-4">
        {/* The dashboard has no toolbar, so the desktop-app download gets a
            slim row of its own above the cards. */}
        <div className="flex justify-end">
          <DownloadDesktopButton />
        </div>
        <StatCard orderTotals={orderTotals} />
        {/* Chart beside the donut instead of stacked — the dashboard holds
            little data, so it should fit a screen without scrolling. */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 w-full items-stretch">
          <div className="xl:col-span-2 min-w-0">
            <SalesBar onTotalsChange={setOrderTotals} />
          </div>
          <MarketplaceChart
            licensedMarketplaceIds={licensedMarketplaceIds}
            factsRows={factsRows}
          />
        </div>
        <OrdersTimeline licensedMarketplaceIds={licensedMarketplaceIds} />
        <OrderAnalysis rows={factsRows} unavailable={factsUnavailable} />
        <RestaurantsTable />
      </div>
    </section>
  );
};

export default DashboardPage;
