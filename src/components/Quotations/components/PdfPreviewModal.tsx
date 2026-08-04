import { Modal, Button, Spin } from "antd";
import { Download, FileText, Printer } from "lucide-react";
import { useThemeContext } from "@src/contexts/theme";
import ModalStyle from "@src/components/UI/ModalStyle";
import { useGetQuotationById } from "@src/queries/Quotations";
import { quotationApi } from "@src/queries/Quotations/quotationApi";

interface PdfPreviewModalProps {
  quoteId: number | null;
  onClose: () => void;
}

const PdfPreviewModal = ({ quoteId, onClose }: PdfPreviewModalProps) => {
  const { theme } = useThemeContext();
  const { data: quote, isLoading } = useGetQuotationById(quoteId);

  const handleDownload = async () => {
    if (quoteId) {
      try {
        await quotationApi.downloadQuotationPdf(quoteId, quote?.q_pdf_data);
      } catch (error) {
        console.error("Failed to download PDF", error);
      }
    }
  };

  const isNative = (window as any).Capacitor?.isNativePlatform();

  const handlePrint = () => {
    if (!quote?.q_pdf_data) return;
    const printWindow = window.open("");
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Print - ${quote.q_number}</title>
            <style>
              body, html { margin: 0; padding: 0; height: 100%; overflow: hidden; }
              iframe { width: 100%; height: 100%; border: none; }
            </style>
          </head>
          <body>
            <iframe src="${quote.q_pdf_data}"></iframe>
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
                {quote?.q_number
                  ? `Preview - ${quote.q_number}`
                  : "Loading Preview..."}
              </span>
            </div>
            <div className="flex items-center gap-2">
              {!isNative && (
                <Button
                  type="default"
                  icon={<Printer size={16} />}
                  onClick={handlePrint}
                  disabled={!quote?.q_pdf_data}
                >
                  Print
                </Button>
              )}
              <Button
                type="primary"
                icon={<Download size={16} />}
                onClick={handleDownload}
                disabled={!quote?.q_pdf_data}
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
          className="w-full flex items-center justify-center rounded-lg overflow-hidden border bg-gray-100 dark:bg-gray-900"
          style={{ 
            height: "calc(100vh - 200px)", 
            minHeight: "600px",
            borderColor: theme.row?.borderColor || "#eee"
          }}
        >
          {isLoading ? (
            <div className="flex flex-col items-center justify-center gap-3">
              <Spin size="large" />
              <span style={{ color: theme.employee?.roleSubtextColor }}>Loading PDF...</span>
            </div>
          ) : quote?.q_pdf_data ? (
            isNative ? (
              <div className="flex flex-col items-center gap-4 p-6 text-center">
                <FileText size={64} className="text-blue-500 opacity-80" />
                <h3 className="text-xl font-semibold" style={{ color: theme.title?.color }}>PDF is Ready</h3>
                <p style={{ color: theme.employee?.roleSubtextColor }}>
                  Mobile apps do not support inline PDF previews. Tap the button below to open the PDF in your device's native viewer.
                </p>
                <Button 
                  type="primary" 
                  size="large" 
                  onClick={handleDownload}
                  icon={<Download size={18} />}
                  style={{
                    background: theme.button.background,
                    borderColor: theme.button.background,
                  }}
                >
                  Open PDF
                </Button>
              </div>
            ) : (
              <iframe
                src={`${quote.q_pdf_data}#toolbar=0`}
                width="100%"
                height="100%"
                style={{ border: "none" }}
                title="PDF Preview"
              />
            )
          ) : (
            <div className="flex flex-col items-center gap-2 text-gray-500">
              <FileText size={48} className="opacity-50" />
              <p>PDF data not available for this quotation.</p>
            </div>
          )}
        </div>
      </Modal>
    </>
  );
};

export default PdfPreviewModal;
