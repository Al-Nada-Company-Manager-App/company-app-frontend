import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useGetCustomerLocations } from "@src/queries/Customers";
import type { Theme } from "@src/types/theme";
import { useState } from "react";
import { createPortal } from "react-dom";
import CustomerDetailModal from "./CustomerDetailModal";
import { Spin } from "antd";
import { Maximize2, Minimize2 } from "lucide-react";

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
  const [isFullscreen, setIsFullscreen] = useState(false);

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

  const mapContent = (
    <MapContainer
      center={egyptCenter}
      zoom={6}
      style={{
        height: isFullscreen ? "100vh" : "500px",
        width: "100%",
      }}
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
                  color: location.c_type === "COMPANY" ? "#1677ff" : "#52c41a",
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
  );

  const toggleButton = (
    <button
      onClick={() => setIsFullscreen(!isFullscreen)}
      style={{
        position: "absolute",
        top: 12,
        right: 12,
        zIndex: 10001,
        background: "white",
        border: "2px solid rgba(0,0,0,0.2)",
        borderRadius: 8,
        padding: "8px",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
      }}
      title={isFullscreen ? "Exit fullscreen" : "Fullscreen"}
    >
      {isFullscreen ? (
        <Minimize2 size={18} color="#333" />
      ) : (
        <Maximize2 size={18} color="#333" />
      )}
    </button>
  );

  const legend = (
    <div
      style={{
        padding: "8px 16px",
        display: "flex",
        gap: 16,
        alignItems: "center",
        fontSize: 13,
        background: isFullscreen
          ? "rgba(255,255,255,0.95)"
          : theme.container.background,
        color: isFullscreen ? "#333" : theme.title?.color,
        position: isFullscreen ? "absolute" : "relative",
        bottom: isFullscreen ? 0 : undefined,
        left: isFullscreen ? 0 : undefined,
        right: isFullscreen ? 0 : undefined,
        zIndex: isFullscreen ? 10001 : undefined,
      }}
    >
      <span>
        📍 <strong>{locations?.length || 0}</strong> customers on map
      </span>
      <span style={{ color: "#999", fontSize: 12 }}>
        Click a marker to view details
      </span>
    </div>
  );

  // Fullscreen: render via portal directly into document.body
  const fullscreenOverlay = isFullscreen
    ? createPortal(
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 10000,
            background: "#000",
          }}
        >
          {toggleButton}
          {mapContent}
          {legend}
        </div>,
        document.body,
      )
    : null;

  return (
    <>
      {/* Normal (inline) view */}
      {!isFullscreen && (
        <div
          style={{
            borderRadius: "12px",
            overflow: "hidden",
            position: "relative",
            border: `1px solid ${theme.row?.borderColor || "#e2e8f0"}`,
          }}
        >
          {toggleButton}
          {mapContent}
          {legend}
        </div>
      )}

      {/* Fullscreen portal */}
      {fullscreenOverlay}

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
