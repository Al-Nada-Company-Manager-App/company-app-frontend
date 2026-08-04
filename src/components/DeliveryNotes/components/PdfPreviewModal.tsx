import React, { useState } from "react";
import { Modal, Button, Spin, message } from "antd";
import { FileText, Download, Printer } from "lucide-react";
import { useThemeContext } from "@src/contexts/theme";
import ModalStyle from "@src/components/UI/ModalStyle";
import { useGetDeliveryById } from "@src/queries/DeliveryNotes";

interface PdfPreviewModalProps {
  quoteId: number | null;
  onClose: () => void;
}

const PdfPreviewModal: React.FC<PdfPreviewModalProps> = ({ quoteId, onClose }) => {
  const { theme } = useThemeContext();
  const [isDownloading, setIsDownloading] = useState(false);
  
  const { data: quote, isLoading } = useGetDeliveryById(quoteId);

  const handleDownload = () => {
    if (!quote?.dn_pdf_data) return;
    
    setIsDownloading(true);
    try {
      const link = document.createElement("a");
      link.href = quote.dn_pdf_data;
      link.download = `${quote.dn_number}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      message.success("PDF downloaded successfully");
    } catch (error) {
      console.error("Download failed", error);
      message.error("Failed to download PDF");
    } finally {
      setIsDownloading(false);
    }
  };

  const handlePrint = () => {
    if (!quote?.dn_pdf_data) return;
    const printWindow = window.open("");
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Print - ${quote.dn_number}</title>
            <style>
              body, html { margin: 0; padding: 0; height: 100%; overflow: hidden; }
              iframe { width: 100%; height: 100%; border: none; }
            </style>
          </head>
          <body>
            <iframe src="${quote.dn_pdf_data}"></iframe>
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.focus();
    }
  };

  return (
    <>
      <ModalStyle />
      <Modal
        open={!!quoteId}
        onCancel={onClose}
        footer={null}
        width={800}
        centered
        destroyOnHidden
        zIndex={99999}
        wrapClassName="custom-modal"
        title={
          <div className="flex justify-between items-center w-full pr-8">
            <div className="flex items-center gap-2">
              <FileText className="text-blue-600" size={20} />
              <span>
                {quote?.dn_number
                  ? `Preview - ${quote.dn_number}`
                  : "Loading Preview..."}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Button
                type="default"
                icon={<Printer size={16} />}
                onClick={handlePrint}
                disabled={!quote?.dn_pdf_data}
              >
                Print
              </Button>
              <Button
                type="primary"
                icon={<Download size={16} />}
                onClick={handleDownload}
                loading={isDownloading}
                disabled={!quote?.dn_pdf_data}
                style={{
                  background: theme.button.background,
                  borderColor: theme.button.background,
                }}
              >
                Download PDF
              </Button>
            </div>
          </div>
        }
      >
        <div 
          className="w-full bg-gray-100 dark:bg-gray-900 rounded-lg overflow-hidden flex items-center justify-center relative"
          style={{ height: "calc(100vh - 200px)", minHeight: "600px" }}
        >
          {isLoading ? (
            <div className="flex flex-col items-center justify-center text-gray-500">
              <Spin size="large" className="mb-4" />
              <p>Generating PDF preview...</p>
            </div>
          ) : quote?.dn_pdf_data ? (
            <iframe
              src={`${quote.dn_pdf_data}#toolbar=0`}
              className="w-full h-full border-0"
              title="PDF Preview"
            />
          ) : (
            <div className="flex flex-col items-center justify-center text-gray-500 gap-2">
              <FileText size={48} className="opacity-20" />
              <p>No PDF available to preview</p>
            </div>
          )}
        </div>
      </Modal>
    </>
  );
};

export default PdfPreviewModal;
