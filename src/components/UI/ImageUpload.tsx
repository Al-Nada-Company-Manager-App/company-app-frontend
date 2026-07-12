import React, { useEffect } from "react";
import { Upload } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import type { RcFile, UploadChangeParam, UploadFile } from "antd/es/upload";
import type { Theme } from "@src/types/theme";

interface ImageUploadProps {
  value: UploadFile | RcFile | null;
  onChange: (file: RcFile | null) => void;
  previewImage: string | undefined;
  onPreviewChange: (url: string | undefined) => void;
  theme: Theme;
  isOpen: boolean;
  altText?: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  value: _value,
  onChange,
  previewImage,
  onPreviewChange,
  theme,
  isOpen,
  altText = "Upload Preview",
}) => {
  useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      const items = e.clipboardData?.items;
      if (!items) return;
      for (const item of Array.from(items)) {
        if (item.type.startsWith("image/")) {
          const file = item.getAsFile();
          if (file) {
            const rcFile = Object.assign(file, {
              uid: `paste-${Date.now()}`,
            }) as RcFile;
            onChange(rcFile);
            onPreviewChange(URL.createObjectURL(file));
          }
          break;
        }
      }
    };
    if (isOpen) {
      document.addEventListener("paste", handlePaste);
    }
    return () => {
      document.removeEventListener("paste", handlePaste);
    };
  }, [isOpen, onChange, onPreviewChange]);

  const handleImageChange = (info: UploadChangeParam<UploadFile>) => {
    const fileObj = info.file as RcFile;
    if (fileObj) {
      onChange(fileObj);
      onPreviewChange(URL.createObjectURL(fileObj));
    }
  };

  return (
    <Upload.Dragger
      name="photo"
      showUploadList={false}
      beforeUpload={() => false}
      onChange={handleImageChange}
      accept="image/*"
      style={{
        borderRadius: "12px",
        overflow: "hidden",
        border: `1px solid ${theme.row?.borderColor || "#E2E8F0"}`,
        padding: previewImage ? 0 : undefined,
        background: "transparent",
      }}
    >
      {previewImage ? (
        <img
          src={previewImage}
          alt={altText}
          style={{
            width: "100%",
            maxHeight: "220px",
            objectFit: "cover",
            display: "block",
          }}
        />
      ) : (
        <div style={{ padding: "16px" }}>
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">Click or drag image here</p>
          <p className="ant-upload-hint">Paste from clipboard (Ctrl+V)</p>
        </div>
      )}
    </Upload.Dragger>
  );
};

export default ImageUpload;
