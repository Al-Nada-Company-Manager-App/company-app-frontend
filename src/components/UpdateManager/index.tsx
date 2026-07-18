import { useState, useEffect } from "react";
import { Modal, Button, Typography } from "antd";
import { DownloadOutlined, WarningOutlined, InfoCircleOutlined } from "@ant-design/icons";
import { getBackendUrl } from "@src/platform/storage";

const { Title, Text } = Typography;

export const UpdateManager = () => {
  const [updateInfo, setUpdateInfo] = useState<{
    mandatory: boolean;
    latest: string;
    show: boolean;
  } | null>(null);

  useEffect(() => {
    const checkUpdates = async () => {
      try {
        const baseUrl = await getBackendUrl();
        const res = await fetch(`${baseUrl}/app-version`);
        if (!res.ok) return;

        const data = await res.json();
        
        let platform = "web";
        // @ts-ignore
        if (window.companyManager) platform = "windows"; // Assuming windows/linux desktop
        // @ts-ignore
        else if (window.Capacitor?.isNativePlatform()) platform = "android";

        const policy = data.platforms[platform];
        if (!policy) return;

        let currentVersion = "1.0.0";
        // @ts-ignore
        if (window.companyManager) currentVersion = await window.companyManager.getAppVersion();
        
        // Simple semver comparison (assumes format x.y.z)
        const isOlder = (v1: string, v2: string) => {
          const p1 = v1.split(".").map(Number);
          const p2 = v2.split(".").map(Number);
          for (let i = 0; i < 3; i++) {
            if (p1[i] < p2[i]) return true;
            if (p1[i] > p2[i]) return false;
          }
          return false;
        };

        if (isOlder(currentVersion, policy.minimum)) {
          setUpdateInfo({ mandatory: true, latest: policy.latest, show: true });
        } else if (isOlder(currentVersion, policy.latest)) {
          setUpdateInfo({ mandatory: false, latest: policy.latest, show: true });
        }
      } catch (err) {
        console.error("Failed to check app version", err);
      }
    };

    checkUpdates();
  }, []);

  const handleUpdate = () => {
    // @ts-ignore
    if (window.companyManager) {
      // Trigger Electron updater
      // @ts-ignore
      window.companyManager.installUpdate();
    } else {
      // Redirect to download page or play store
      window.open("https://your-download-link.com", "_blank");
    }
  };

  if (!updateInfo || !updateInfo.show) return null;

  return (
    <Modal
      open={updateInfo.show}
      closable={!updateInfo.mandatory}
      maskClosable={!updateInfo.mandatory}
      onCancel={() => !updateInfo.mandatory && setUpdateInfo({ ...updateInfo, show: false })}
      footer={null}
      centered
      className="update-modal"
    >
      <div className="flex flex-col items-center text-center p-4">
        {updateInfo.mandatory ? (
          <WarningOutlined style={{ fontSize: 48, color: '#faad14', marginBottom: 16 }} />
        ) : (
          <InfoCircleOutlined style={{ fontSize: 48, color: '#1890ff', marginBottom: 16 }} />
        )}
        
        <Title level={4}>
          {updateInfo.mandatory ? "Mandatory Update Required" : "New Version Available"}
        </Title>
        
        <Text style={{ marginBottom: 24 }}>
          {updateInfo.mandatory 
            ? `Your current version is no longer supported. Please update to version ${updateInfo.latest} to continue using the app.`
            : `A new version (${updateInfo.latest}) is available. Would you like to update now?`
          }
        </Text>

        <div className="flex gap-4 w-full">
          {!updateInfo.mandatory && (
            <Button 
              size="large" 
              className="flex-1"
              onClick={() => setUpdateInfo({ ...updateInfo, show: false })}
            >
              Later
            </Button>
          )}
          <Button 
            type="primary" 
            size="large" 
            icon={<DownloadOutlined />}
            className="flex-1"
            onClick={handleUpdate}
          >
            Update Now
          </Button>
        </div>
      </div>
    </Modal>
  );
};
