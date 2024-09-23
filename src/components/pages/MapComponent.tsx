import { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvent,
  LayersControl,
  LayerGroup,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { LatLngExpression } from "leaflet";
import L from "leaflet";
import locationsData from "../../local-json/locations.json";
import { useLocationContext } from "../../utilities/contexts/LocationContext";
// Define a custom icon
const customIcon = new L.Icon({
  iconUrl: require("./../../assests/icon/marker32px.png"), // Add your custom marker image here
  iconAnchor: [17, 45], // Adjust anchor to the correct point
  popupAnchor: [0, -45], // Popup should appear above the marker
});

const defaultPosition: LatLngExpression = [52.52, 13.405]; // Default center of the map

const MapUpdater = () => {
  const { selectedLocation } = useLocationContext();
  const map = useMap(); // Now it's safe to use useMap here

  useEffect(() => {
    if (selectedLocation) {
      map.flyTo(selectedLocation.position, 10); // Fly to selected position
    } else {
      map.flyTo(defaultPosition, 5); // Reset to default view
    }
  }, [selectedLocation, map]);

  // Listen for map click events
  useMapEvent("dblclick", (e) => {
    map.flyTo(e.latlng, 10); // Zoom into the location clicked
  });

  return null; // This component doesn't render anything
};
type LayerLocations = {
  name: string;
  city: string;
  position: [number, number];
  description: string;
  category?: string;
};
const MapComponent = () => {
  const { locations, selectLocation } = useLocationContext();
  const [hotellocations, setHotelLocations] = useState<LayerLocations[]>([]);
  const [touristSpots, setTouristSpots] = useState<LayerLocations[]>([]);
  useEffect(() => {
    // Fetching from JSON or API
    setHotelLocations(locationsData.hotels as LayerLocations[]);
    setTouristSpots(locationsData.touristSpots as LayerLocations[]);
  }, []);

  return (
    <MapContainer
      center={defaultPosition}
      inertiaMaxSpeed={1}
      zoom={5}
      minZoom={3}
      className="map"
      style={{ height: "80vh", width: "100%" }}>
      <LayersControl position="topleft">
        <LayersControl.BaseLayer name="Street Map" checked>
          <TileLayer
            url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
            attribution="&copy; OpenTopoMap contributors"
          />
        </LayersControl.BaseLayer>
        <LayersControl.BaseLayer name="OpenStreetMap.HOT">
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
        </LayersControl.BaseLayer>
        <LayersControl.BaseLayer name="Satellite">
          <TileLayer
            url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png"
            attribution="&copy; OpenTopoMap contributors"
          />
        </LayersControl.BaseLayer>
        <LayersControl.Overlay checked name="Locations">
          <LayerGroup>
            {locations.map((location, index) => (
              <Marker
                alt={location.city}
                key={location.id}
                position={location.position}
                icon={customIcon}
                eventHandlers={{
                  dblclick: () => selectLocation(location.id),
                }}>
                <Popup autoClose={true} closeOnClick={true} closeButton={true}>
                  <strong>
                    <span>{location.city}</span>,
                  </strong>
                  <span> {location.country}</span>
                  <p>{location.description}</p>
                  {location.url && (
                    <a
                      href={location.url}
                      target="_blank"
                      rel="noopener noreferrer">
                      More info
                    </a>
                  )}
                </Popup>
              </Marker>
            ))}
          </LayerGroup>
        </LayersControl.Overlay>

        <LayersControl.Overlay name="Hotels">
          <LayerGroup>
            {hotellocations.map((location, index) => (
              <Marker
                key={index}
                position={location.position}
                icon={customIcon}>
                <Popup autoClose={true} closeOnClick={true} closeButton={true}>
                  <strong>
                    <span>{location.name}</span>,
                  </strong>
                  <span> {location.city}</span>
                  <p>{location.description}</p>
                </Popup>
              </Marker>
            ))}
          </LayerGroup>
        </LayersControl.Overlay>
        <LayersControl.Overlay name="Tourist Spots">
          <LayerGroup>
            {touristSpots.map((location, index) => (
              <Marker
                key={index}
                position={location.position}
                icon={customIcon}>
                <Popup autoClose={true} closeOnClick={true} closeButton={true}>
                  <strong>
                    <span>{location.name}</span>,
                  </strong>
                  <span> {location.city}</span>
                  <p>{location.description}</p>
                </Popup>
              </Marker>
            ))}
          </LayerGroup>
        </LayersControl.Overlay>
      </LayersControl>

      <MapUpdater />
    </MapContainer>
  );
};

export default MapComponent;
