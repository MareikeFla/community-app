import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import { Marker, TileLayer } from "react-leaflet";
import {
  PopupBody,
  PopupHeader,
  StyledMapContainer,
  StyledPopup,
} from "./Map.styled";
import { Icon } from "leaflet";

export default function Map({ event }) {
  const { location, eventName } = event;
  const { street, houseNumber, zip, city, latitude, longitude } = location;
  const coordinates = [latitude, longitude];

  const CustomIcon = new Icon({
    iconUrl: "/assets/icons/map_pin.png",
    shadowUrl: "/assets/icons/map_pin-shadow.png",
    iconSize: [25, 36],
    shadowSize: [41, 41],
    iconAnchor: [12.5, 36],
    shadowAnchor: [12.5, 42],
    popupAnchor: [0, -40],
  });

  return (
    <StyledMapContainer center={coordinates} zoom={13} scrollWheelZoom={true}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={coordinates} icon={CustomIcon}>
        <StyledPopup>
          <PopupHeader>{eventName}</PopupHeader> <br />
          <PopupBody>
            {street} {houseNumber}
          </PopupBody>{" "}
          <br />
          <PopupBody>
            {zip} {city}
          </PopupBody>
        </StyledPopup>
      </Marker>
    </StyledMapContainer>
  );
}
