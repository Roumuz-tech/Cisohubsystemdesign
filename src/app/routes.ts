import { createBrowserRouter } from "react-router";
import Home from "./pages/Home";
import DesignSystem from "./pages/DesignSystem";
import QuickAssessment from "./pages/QuickAssessment";
import QuickAssessmentV2 from "./pages/QuickAssessmentV2";
import Login from "./pages/Login";

export const router = createBrowserRouter([
  { path: "/", Component: Home },
  { path: "/design-system", Component: DesignSystem },
  { path: "/quick-assessment", Component: QuickAssessment },
  { path: "/quick-assessment-v2", Component: QuickAssessmentV2 },
  { path: "/login", Component: Login },
  { path: "*", Component: Home },
]);
