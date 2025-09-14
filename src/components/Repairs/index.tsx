import { useState } from "react";
import { useRepairs } from "@src/hooks/Repairs/useRepairs";
import RepairProcessTable from "./components/RepairProcessTable";
import { Loading, ErrorDisplay } from "@src/components/UI";
import CustomBtn from "../UI/customBtn";
import AddRepairModal from "./components/AddRepairModal";
import DevicesTable from "./components/DevicesTable";
import AddDeviceModal from "./components/AddDeviceModal";

interface RepairsProps {
  isDark: boolean;
}

const RepairsPage = ({ isDark }: RepairsProps) => {
  const { theme, isLoading, error, repairs, devices } = useRepairs(isDark);
  const [showAddRepairModal, setShowAddRepairModal] = useState(false);
  const [showAddDeviceModal, setShowAddDeviceModal] = useState(false);

  if (isLoading) {
    return (
      <Loading size="large" message="Loading repairs..." isDark={isDark} />
    );
  }

  if (error) {
    return (
      <ErrorDisplay
        status="error"
        title="Failed to Load Repairs"
        subTitle="There was an error loading the repair data."
        message={error.message}
        onRetry={() => window.location.reload()}
        showRetryButton
        isDark={isDark}
      />
    );
  }

  return (
    <>
      <div className="p-6">
        <div
          className="w-full rounded-2xl p-6 mb-6"
          style={{
            background: theme.container.background,
            backdropFilter: theme.container.backdropFilter,
            minHeight: "auto",
          }}
        >
          {/* Repair Processes Table*/}
          <div className="mb-6 flex items-center justify-between">
            <h2
              className="text-lg font-bold"
              style={{ color: theme.title.color }}
            >
              Repair Processes
            </h2>
            <CustomBtn
              theme={theme}
              btnTitle="Add New Repair"
              onClick={() => setShowAddRepairModal(true)}
              className="mr-2 px-6 py-2 mb-5 font-semibold border-none"
            />
          </div>
          <RepairProcessTable repairs={repairs} theme={theme} />
        </div>
      </div>

      <div className="p-6">
        <div
          className="w-full rounded-2xl p-6 mb-6"
          style={{
            background: theme.container.background,
            backdropFilter: theme.container.backdropFilter,
            minHeight: "auto",
          }}
        >
          {/* Devices Table */}
          <div className="mb-6 flex items-center justify-between">
            <h2
              className="text-lg font-bold"
              style={{ color: theme.title.color }}
            >
              Devices Under Maintenance
            </h2>
            <CustomBtn
              theme={theme}
              btnTitle="Add New Device Under Maintenance"
              onClick={() => setShowAddDeviceModal(true)}
              className="mr-2 px-6 py-2 mb-5 font-semibold border-none"
              />
          </div>
          <DevicesTable devices={devices} theme={theme} />
        </div>
      </div>

      {showAddRepairModal && (
        <AddRepairModal
          open={showAddRepairModal}
          onClose={() => setShowAddRepairModal(false)}
          theme={theme}
        />
      )}
      {showAddDeviceModal && (
        <AddDeviceModal 
          open={showAddDeviceModal}
          onClose={() => setShowAddDeviceModal(false)}
          theme={theme}
        />
      )}
    </>
  );
};

export default RepairsPage;
