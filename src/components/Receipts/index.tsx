import { useState } from "react";
import NewReceiptModal from "./NewReceiptModal";
import { useGetAllReceipts, useDeleteReceipt } from "@src/queries/Receipts";
import { Loading, ErrorDisplay } from "@src/components/UI";
import { useThemeContext } from "@src/contexts/theme";
import { useSearchContext } from "@src/contexts/search";
import CustomBtn from "../UI/customBtn";
import ReceiptsTable from "./components/ReceiptsTable";
import PdfPreviewModal from "./components/PdfPreviewModal";

const Receipts = ({ isDark }: { isDark: boolean }) => {
  const { theme } = useThemeContext();
  const { searchQuery } = useSearchContext();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const { data, isLoading, error } = useGetAllReceipts({
    page: currentPage,
    limit: pageSize,
    search: searchQuery,
  });
  
  const deleteReceipt = useDeleteReceipt();
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingReceiptId, setEditingReceiptId] = useState<number | null>(null);
  const [previewId, setPreviewId] = useState<number | null>(null);

  const handleOpenEdit = (id: number) => {
    setEditingReceiptId(id);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingReceiptId(null);
  };
  
  const handleDelete = (id: number) => {
    deleteReceipt.mutate(id);
  };

  if (isLoading) {
    return (
      <div className="p-6">
        <div
          className="w-full rounded-2xl"
          style={{
            background: theme.container.background,
            backdropFilter: theme.container.backdropFilter,
            minHeight: "400px",
          }}
        >
          <Loading
            size="large"
            message="Loading receipts..."
            textStyle={{ color: theme.title.color }}
            containerStyle={{
              background: "transparent",
              minHeight: "400px",
            }}
            isDark={isDark}
          />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div
          className="w-full rounded-2xl"
          style={{
            background: theme.container.background,
            backdropFilter: theme.container.backdropFilter,
            minHeight: "400px",
          }}
        >
          <ErrorDisplay
            status="error"
            title="Failed to Load"
            subTitle="There was an error loading the receipts data."
            message={error.message}
            onRetry={() => window.location.reload()}
            showRetryButton={true}
            showHomeButton={false}
            isDark={isDark}
            style={{
              background: "transparent",
              minHeight: "400px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          />
        </div>
      </div>
    );
  }

  const receiptsToShow = data?.receipts ?? [];
  const total = data?.total ?? 0;

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
          {/* Title and Add Button Row */}
          <div className="mb-6 flex items-center justify-between">
            <h2
              className="text-lg font-bold"
              style={{ color: theme.title.color }}
            >
              Receipt Notes (إذن استلام)
            </h2>
            <CustomBtn
              theme={theme}
              btnTitle="New Receipt"
              onClick={() => {
                setEditingReceiptId(null);
                setIsModalOpen(true);
              }}
              className="mr-2 px-6 py-2 mb-5 font-semibold border-none"
            />
          </div>

          <ReceiptsTable 
            receipts={receiptsToShow} 
            theme={theme} 
            onEdit={handleOpenEdit}
            onPreview={setPreviewId}
            onDelete={handleDelete}
            total={total}
            currentPage={currentPage}
            pageSize={pageSize}
            onPageChange={(page, size) => { setCurrentPage(page); setPageSize(size); }}
            loading={isLoading}
          />
        </div>
      </div>

      <NewReceiptModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        editingReceiptId={editingReceiptId}
        onSuccess={(id: number) => setEditingReceiptId(id)}
        onPreview={(id: number) => setPreviewId(id)}
      />

      <PdfPreviewModal
        quoteId={previewId}
        onClose={() => setPreviewId(null)}
      />
    </>
  );
};

export default Receipts;
