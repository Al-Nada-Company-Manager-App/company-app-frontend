import { Modal, Button, Spin } from "antd";
import { Download, FileText } from "lucide-react";
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
        await quotationApi.downloadQuotationPdf(quoteId);
      } catch (error) {
        console.error("Failed to download PDF", error);
      }
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
        destroyOnClose
        wrapClassName="custom-modal"
        title={
          <div className="flex justify-between items-center w-full pr-8">
            <div className="flex items-center gap-2">
              <FileText className="text-blue-600" size={20} />
              <span>
                {quote?.q_ref_code
                  ? `Preview - ${quote.q_ref_code}`
                  : "Loading Preview..."}
              </span>
            </div>
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
        }
      >
        <div
          className="w-full flex items-center justify-center rounded-lg overflow-hidden border"
          style={{ 
            height: "70vh",
            background: theme.container?.background || "#fff",
            borderColor: theme.row?.borderColor || "#eee"
          }}
        >
          {isLoading ? (
            <div className="flex flex-col items-center justify-center gap-3">
              <Spin size="large" />
              <span style={{ color: theme.employee?.roleSubtextColor }}>Loading PDF...</span>
            </div>
          ) : quote?.q_pdf_data ? (
            <iframe
              src={quote.q_pdf_data}
              width="100%"
              height="100%"
              style={{ border: "none" }}
              title="PDF Preview"
            />
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
