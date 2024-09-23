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

type LayerLocations = {
  name: string;
  city: string;
  position: [number, number];
  description: string;
  category?: string;
};

// Add custom icon for Marker
const customIconforLocation = new L.Icon({
  iconUrl: require("./../../assests/icon/marker32px.png"),
  iconAnchor: [17, 45],
  popupAnchor: [0, -45],
});

const customIconforHotels = new L.Icon({
  iconUrl: require("./../../assests/icon/hotel.png"),
  iconAnchor: [17, 45],
  popupAnchor: [0, -45],
});

const customIconforTouristSpot = new L.Icon({
  iconUrl: require("./../../assests/icon/landmark.png"),
  iconAnchor: [17, 45],
  popupAnchor: [0, -45],
});

// Default center of the map
const defaultPosition: LatLngExpression = [52.52, 13.405];

const MapUpdater = () => {
  const { selectedLocation } = useLocationContext();
  const map = useMap();

  useEffect(() => {
    // Fly to the selected location's position or default position
    if (selectedLocation) {
      map.flyTo(selectedLocation.position, 10);
    } else {
      map.flyTo(defaultPosition, 5);
    }
  }, [selectedLocation, map]);

  // Listen for double-click events on the map to fly to that location
  useMapEvent("dblclick", (e) => {
    map.flyTo(e.latlng, 10);
  });

  return null;
};

const MapComponent = () => {
  const { locations, selectLocation } = useLocationContext();
  const [hotellocations, setHotelLocations] = useState<LayerLocations[]>([]);
  const [touristSpots, setTouristSpots] = useState<LayerLocations[]>([]);

  useEffect(() => {
    // Set hotel and tourist spot locations from the imported JSON data
    setHotelLocations(locationsData.hotels as LayerLocations[]);
    setTouristSpots(locationsData.touristSpots as LayerLocations[]);
  }, []);

  return (
    <MapContainer
      center={defaultPosition}
      zoom={5}
      minZoom={3}
      className="map"
      style={{ height: "80vh", width: "100%" }}>
      <LayersControl position="topleft">
        <LayersControl.BaseLayer name="Street Map">
          <TileLayer
            url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
            attribution="&copy; OpenTopoMap contributors"
          />
        </LayersControl.BaseLayer>
        <LayersControl.BaseLayer name="Open Street Map" checked>
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
                key={location.id}
                position={location.position}
                icon={customIconforLocation}
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
                icon={customIconforHotels}>
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
                icon={customIconforTouristSpot}>
                <Popup autoClose={true} closeOnClick={true} closeButton={true}>
                  <strong>
                    <span>{location.name}</span>
                  </strong>
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
