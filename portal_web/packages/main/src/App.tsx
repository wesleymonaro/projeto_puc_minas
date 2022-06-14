import React, { Suspense, lazy, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Amplify from "aws-amplify";
import Preloader from "./components/preloader";
import AlunosLista from "./pages/students";
import InstrutoresLista from "./pages/teachers";
// import TreinosLista from "./pages/classes";

const DashboardOne = lazy(() => import("./pages/dashboard-one"));
const Home = lazy(() => import("./pages/home"));
const SignIn = lazy(() => import("./pages/signin"));
const ErrorNotFound = lazy(() => import("./pages/error-404"));

const ClassicPlusErrorNotFound = lazy(
  () => import("./pages/classic-plus/error-404")
);

const App: React.FC = () => {
  const initAmplify = () => {
    Amplify.configure({
      Auth: {
        mandatorySignId: true,
        region: "us-east-1",
        userPoolId: "",
        userPoolWebClientId: "",
        authenticationFlowType: "USER_SRP_AUTH",
      },
    });
  };

  useEffect(() => {
    initAmplify();
  }, []);
  return (
    <>
      <Router>
        <Suspense fallback={<Preloader />}>
          <Routes>
            {/* Classic Routes */}

            {/* Dashboard Routes */}
            <Route path="/" element={<DashboardOne />} />
            <Route path="/home" element={<Home />} />

            {/* Authentication Routes */}
            <Route path="/login" element={<SignIn />} />
            <Route path="/alunos" element={<AlunosLista />} />
            <Route path="/instrutores" element={<InstrutoresLista />} />
            {/* <Route path="/treinos" element={<TreinosLista />} /> */}

            {/* 404 Page Route */}
            <Route path="*" element={<ErrorNotFound />} />
            <Route path="*" element={<ClassicPlusErrorNotFound />} />
          </Routes>
        </Suspense>
      </Router>
    </>
  );
};

export default App;
