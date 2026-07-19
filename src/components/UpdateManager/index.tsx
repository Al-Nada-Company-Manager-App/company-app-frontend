import { useState, useEffect } from "react";
import { Modal, Button, Typography } from "antd";
import { DownloadOutlined, WarningOutlined, InfoCircleOutlined } from "@ant-design/icons";
import { getBackendUrl } from "@src/platform/storage";
import { Filesystem, Directory } from '@capacitor/filesystem';
import { FileOpener } from '@capawesome-team/capacitor-file-opener';
import packageJson from '../../../package.json';

const { Title, Text } = Typography;

export const UpdateManager = () => {
  const [updateInfo, setUpdateInfo] = useState<{
    mandatory: boolean;
    latest: string;
    show: boolean;
  } | null>(null);
  const [downloadProgress, setDownloadProgress] = useState<number | null>(null);
  const [isDownloading, setIsDownloading] = useState(false);

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

        let currentVersion = packageJson.version;
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

        if (isOlder(currentVersion, policy.latest)) {
          setUpdateInfo({ mandatory: true, latest: policy.latest, show: true });
        }
      } catch (err) {
        console.error("Failed to check app version", err);
      }
    };

    checkUpdates();

    // @ts-ignore
    if (window.companyManager) {
      // @ts-ignore
      window.companyManager.onUpdateProgress((progressObj: any) => {
        setDownloadProgress(Math.round(progressObj.percent));
      });
      // @ts-ignore
      window.companyManager.onUpdateDownloaded(() => {
        setIsDownloading(false);
        // @ts-ignore
        window.companyManager.installUpdate();
      });
    }
  }, []);

  const handleUpdate = async () => {
    setIsDownloading(true);
    setDownloadProgress(0);
    // @ts-ignore
    if (window.companyManager) {
      // @ts-ignore
      window.companyManager.downloadUpdate();
    } else {
      // Android Updater Logic
      try {
        const res = await fetch("https://api.github.com/repos/Al-Nada-Company-Manager-App/company-app-frontend/releases/latest");
        if (!res.ok) throw new Error("Failed to fetch release info");
        const releaseData = await res.json();
        
        const apkAsset = releaseData.assets.find((a: any) => a.name.endsWith(".apk"));
        if (!apkAsset) throw new Error("APK not found in the latest release");

        // Use Native DownloadFile to avoid memory limit crashes
        const progressListener = await Filesystem.addListener('progress', (status) => {
          if (status.contentLength > 0) {
            setDownloadProgress(Math.round((status.bytes / status.contentLength) * 100));
          }
        });

        const savedFile = await Filesystem.downloadFile({
          url: apkAsset.browser_download_url,
          path: 'update.apk',
          directory: Directory.Cache,
          progress: true
        });

        await progressListener.remove();
        
        let fileUri = savedFile.path;
        if (!fileUri?.startsWith('file://')) {
          const stat = await Filesystem.stat({ path: 'update.apk', directory: Directory.Cache });
          fileUri = stat.uri;
        }
        
        setIsDownloading(false);
        setUpdateInfo({ ...updateInfo!, show: false });
        
        await FileOpener.openFile({
          path: fileUri!,
          mimeType: 'application/vnd.android.package-archive'
        });
      } catch (err) {
        console.error("Update Failed:", err);
        setIsDownloading(false);
        // Fallback
        window.open("https://github.com/Al-Nada-Company-Manager-App/company-app-frontend/releases/latest", "_blank");
      }
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
          {!updateInfo.mandatory && !isDownloading && (
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
            icon={isDownloading ? <DownloadOutlined className="animate-bounce" /> : <DownloadOutlined />}
            className="flex-1"
            onClick={handleUpdate}
            disabled={isDownloading}
          >
            {isDownloading 
              ? `Downloading... ${downloadProgress !== null ? downloadProgress + "%" : ""}` 
              : "Update Now"}
          </Button>
        </div>
      </div>
    </Modal>
  );
};
