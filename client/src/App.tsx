import { AuthProvider } from "./context/AuthContext";
import { useAuth } from "./hooks/useAuth";

import { RegisterView } from "./views/RegisterView";
import { LoginView } from "./views/LoginView";
import { WelcomeView } from "./views/WelcomeView";

import backgroundImg from "../src/assets/img/bkgCaracoles.jpg";

const MainContent = () => {
  const { currentView } = useAuth();

  return (
    <div
      className="app-container"
      style={
        currentView === "welcome"
          ? { backgroundImage: "linear-gradient(to right, #1e3c72, #2a5298)" }
          : { backgroundImage: `url(${backgroundImg})` }
      }
    >
      {currentView === "welcome" ? (
        <WelcomeView />
      ) : (
        <div className="main-wrapper">
          <div className="card">
            {currentView === "register" && <RegisterView />}
            {currentView === "login" && <LoginView />}
          </div>
        </div>
      )}
    </div>
  );
};

export const App = () => {
  return (
    <AuthProvider>
      <MainContent />
    </AuthProvider>
  );
};

export default App;
