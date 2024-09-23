import MapView from "./components/features/MapHome";
import Header from "./components/pages/Header";

import { LocationProvider } from "./utilities/contexts/LocationContext";

function App() {
  return (
    <LocationProvider>
      <Header></Header>
      <MapView></MapView>
    </LocationProvider>
  );
}

export default App;
