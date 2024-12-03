import React, { useEffect } from "react";
import Login from "../pages/login";
import Register from "../pages/register";
import Home from "../pages/home";
import MetalPriceLme from "../pages/metalPriceLme";
import MetalPriceDashboard from "../pages/metalPriceLme/dashboard";
import Sustainability from "../pages/Sustainability";
import FindNewPartner from "../pages/findNewPartner";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LmeList from "../pages/metalPriceLme/lmeList";
import StayInformed from "../pages/stayInformed";
import SingleStayInformed from "../pages/stayInformed/single";
import Loading from "../components/LoadingPage";
import CarbonCredit from "../pages/carbonCredit";
import CarbonCreditDashboard from "../pages/carbonCredit/dashboard";
import DashboardSustainability from "../pages/Sustainability/dashboard";
import FormSustainability from "../pages/Sustainability/form";
import EditFormSustain from "../pages/Sustainability/form/editQuestions";
import MetalPriceList from "../pages/metalPriceLme/metalPriceList";
import MetalPriceDetails from "../pages/metalPriceLme/metalPriceList/metalPriceDetails";
import CarbonRegister from "../pages/carbonCredit/plans";
import Simulation from "../pages/simulation";
import Sponsor from "../pages/sponsor";
import ListSponsor from "../pages/sponsor/List";
import SingleSponsor from "../pages/sponsor/Single";
import Profile from "../pages/Profile";
import SucessPurchase from "../pages/SucessPurchase";
import Billing from "../pages/billing";
import Services from "../pages/Services";
import Credits from "../pages/billing/credits";
import SuccessPageCredits from "../pages/SucessPurchase/credits";
import Expenses from "../pages/ExpensesHistory";
import InfoCredits from "../pages/infoCredits";
import SavedOperations from "../pages/savedOperations";
import SavedMetalPrice from "../pages/savedOperations/components/SavedMetalPrice";
import Notifications from "../pages/notification";
import Plans from "../pages/billing/components/plans";
import ForgotPassword from "../pages/forgotPassword";
import Fnp from "../pages/savedOperations/pages/fnp";
import Simu from "../pages/savedOperations/pages/Simu";
import MyCompany from "../pages/myCompany";
import Chats from "../pages/Chats";
import CompanyProfile from "../pages/myCompany/CompanyProfile";
import AnalyticsPage from "../pages/analytics";
import LogsControlPage from "../pages/logsControl";
import Reports from "../pages/Reports";
import GlobalTrack from "../pages/globalTrack";
import SearchGlobalTrack from "../pages/globalTrack/search";
import SavedGlobalTrack from "../pages/globalTrack/saved";
import LeadsEnrichment from "../pages/leadsEnrichment";
import SearchLeads from "../pages/leadsEnrichment/search";
import ListPage from "../pages/leadsEnrichment/listPage";
import LinkedinProfile from "../pages/leadsEnrichment/SearchContact/Components/LinkedinProfile";
import ProfileCompany from "../pages/leadsEnrichment/profileCompany";
import Capitalize from "../utils/capitalize";
import MarketingPage from "../pages/marketing";
import ProfileContact from "../pages/leadsEnrichment/contactProfile";
import Example from "../pages/billing/components/example";

const AppRoutes = () => {
  useEffect(() => {
    const TitlePage = Capitalize(
      window.location.pathname.replace("/", "").replace(/-/g, " ")
    );

    document.title = TitlePage.replace(
      /Leadsenrichment/g,
      "Leads Enrichment"
    ).replace(/\//g, " - ");
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/register" element={<Register />} />
        <Route path="/example" element={<Example />} />
        <Route path="/loading" element={<Loading />} />
        <Route path="/home" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/Success" exact element={<SucessPurchase />} />
        <Route path="/market-intelligence" element={<MetalPriceLme />} />
        <Route path="/leads-ProfileContact" element={<ProfileContact />} />
        <Route
          path="/market-intelligence-dashboard"
          element={<MetalPriceDashboard />}
        />
        <Route
          path="/market-intelligence-list/:metalname"
          element={<MetalPriceList />}
        />
        <Route
          path="/market-intelligence-details"
          element={<MetalPriceDetails />}
        />
        <Route path="/sustainability" element={<Sustainability />} />
        <Route
          path="/dashboard-sustainability"
          element={<DashboardSustainability />}
        />
        <Route
          path="/form-sustainability/:name"
          element={<FormSustainability />}
        />
        <Route
          path="/editform-sustainability/:name"
          element={<EditFormSustain />}
        />
        <Route path="/lmelist/:metalName" element={<LmeList />} />
        <Route path="/trade-data" element={<FindNewPartner />} />
        <Route path="/stayinformed" element={<StayInformed />} />
        <Route path="/stayinformed/:id" element={<SingleStayInformed />} />      
        <Route path="/carboncredit" element={<CarbonCredit />} />
        <Route
          path="/carboncredit-dashboard"
          element={<CarbonCreditDashboard />}
        />
        <Route path="/carboncredit-plan" element={<CarbonRegister />} />
        <Route path="/simulation" element={<Simulation />} />
        <Route path="/international-sponsor" element={<Sponsor />} />
        <Route path="/international-sponsor-list" element={<ListSponsor />} />
        <Route
          path="/international-sponsor-single/:id"
          element={<SingleSponsor />}
        />
        <Route path="/billing" element={<Billing />} />
        <Route path="/credits" element={<Credits />} />
        <Route path="/successCredits" element={<SuccessPageCredits />} />
        <Route path="/expenses" element={<Expenses />} />
        <Route path="/info-credits" element={<InfoCredits />} />
        <Route path="/saved-operations" element={<SavedOperations />} />
        <Route path="/saved-operations/fnp" element={<Fnp />} />
        <Route path="/saved-operations/simu" element={<Simu />} />
        <Route path="/saved-operations/mp" element={<SavedOperations />} />
        <Route path="/saved-operations/sustain" element={<SavedOperations />} />      
        <Route path="/saved-metalPrice" element={<SavedMetalPrice />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/plans" element={<Plans />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/my-company" element={<MyCompany />} />
        <Route path="/my-company/chats" element={<Chats />} />
        <Route path="/my-company/profile" element={<CompanyProfile />} />
        <Route path="/analytics" element={<AnalyticsPage />} />
        <Route path="/marketing" element={<MarketingPage />} />       
        <Route path="/logscontrol" element={<LogsControlPage />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/globaltrack" element={<GlobalTrack />} />
        <Route path="/globaltrack-search" element={<SearchGlobalTrack />} />
        <Route path="/globaltrack-saved" element={<SavedGlobalTrack />} />
        <Route path="/leadsenrichment" element={<LeadsEnrichment />} />
        <Route path="/leadsenrichment-search" element={<SearchLeads />} />
        <Route path="/leadsenrichment-listPage" element={<ListPage />} />
        <Route path="/leadsenrichment-linkedin" element={<LinkedinProfile />} />
        <Route
          path="/leadsenrichment-profileCompany"
          element={<ProfileCompany />}
        />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
