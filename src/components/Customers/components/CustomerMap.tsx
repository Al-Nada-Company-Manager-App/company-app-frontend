import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useGetCustomerLocations } from "@src/queries/Customers";
import type { Theme } from "@src/types/theme";
import { useState } from "react";
import CustomerDetailModal from "./CustomerDetailModal";
import { Spin } from "antd";

// Fix default marker icons (leaflet asset issue with bundlers)
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

// Custom icons for companies vs persons
const companyIcon = new L.Icon({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

interface CustomerMapProps {
  theme: Theme;
}

const CustomerMap = ({ theme }: CustomerMapProps) => {
  const { data: locations, isLoading } = useGetCustomerLocations();
  const [selectedCustomerId, setSelectedCustomerId] = useState<number | null>(
    null,
  );
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Egypt center coordinates
  const egyptCenter: [number, number] = [26.8206, 30.8025];

  const handleMarkerClick = (customerId: number) => {
    setSelectedCustomerId(customerId);
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    setSelectedCustomerId(null);
  };

  if (isLoading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: 400,
          background: theme.container.background,
          borderRadius: "12px",
        }}
      >
        <Spin size="large" />
      </div>
    );
  }

  return (
    <>
      <div
        style={{
          borderRadius: "12px",
          overflow: "hidden",
          border: `1px solid ${theme.row?.borderColor || "#e2e8f0"}`,
        }}
      >
        <MapContainer
          center={egyptCenter}
          zoom={6}
          style={{ height: "500px", width: "100%" }}
          scrollWheelZoom={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {locations?.map((location) => (
            <Marker
              key={location.c_id}
              position={[location.c_latitude, location.c_longitude]}
              icon={companyIcon}
              eventHandlers={{
                click: () => handleMarkerClick(location.c_id),
              }}
            >
              <Popup>
                <div style={{ textAlign: "center", minWidth: 120 }}>
                  <strong>{location.c_name}</strong>
                  <br />
                  <span
                    style={{
                      fontSize: "11px",
                      color:
                        location.c_type === "COMPANY" ? "#1677ff" : "#52c41a",
                      fontWeight: 600,
                    }}
                  >
                    {location.c_type === "COMPANY" ? "🏢 Company" : "👤 Person"}
                  </span>
                  <br />
                  <button
                    onClick={() => handleMarkerClick(location.c_id)}
                    style={{
                      marginTop: 6,
                      padding: "4px 12px",
                      borderRadius: 6,
                      border: "none",
                      background: "#1677ff",
                      color: "#fff",
                      cursor: "pointer",
                      fontSize: 12,
                    }}
                  >
                    View Details
                  </button>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>

        {/* Legend */}
        <div
          style={{
            padding: "8px 16px",
            display: "flex",
            gap: 16,
            alignItems: "center",
            fontSize: 13,
            background: theme.container.background,
            color: theme.title?.color,
          }}
        >
          <span>
            📍 <strong>{locations?.length || 0}</strong> customers on map
          </span>
          <span style={{ color: "#999", fontSize: 12 }}>
            Click a marker to view details
          </span>
        </div>
      </div>

      <CustomerDetailModal
        modalOpen={isModalVisible}
        onClose={handleModalClose}
        customerId={selectedCustomerId}
        theme={theme}
      />
    </>
  );
};

export default CustomerMap;
