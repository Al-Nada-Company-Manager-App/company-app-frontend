import { useState } from "react";
import NewDeliveryModal from "./NewDeliveryModal";
import { useGetAllDeliveries, useDeleteDelivery } from "@src/queries/DeliveryNotes";
import { Loading, ErrorDisplay } from "@src/components/UI";
import { useThemeContext } from "@src/contexts/theme";
import { useSearchContext } from "@src/contexts/search";
import CustomBtn from "../UI/customBtn";
import DeliveriesTable from "./components/DeliveriesTable";
import PdfPreviewModal from "./components/PdfPreviewModal";

const Deliveries = ({ isDark }: { isDark: boolean }) => {
  const { theme } = useThemeContext();
  const { searchQuery } = useSearchContext();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const { data, isLoading, error } = useGetAllDeliveries({
    page: currentPage,
    limit: pageSize,
    search: searchQuery,
  });
  
  const deleteDelivery = useDeleteDelivery();
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDeliveryId, setEditingDeliveryId] = useState<number | null>(null);
  const [previewId, setPreviewId] = useState<number | null>(null);

  const handleOpenEdit = (id: number) => {
    setEditingDeliveryId(id);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingDeliveryId(null);
  };
  
  const handleDelete = (id: number) => {
    deleteDelivery.mutate(id);
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
            message="Loading deliveries..."
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
            subTitle="There was an error loading the deliveries data."
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

  const deliveriesToShow = data?.deliveries ?? [];
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
              Delivery Notes (إذن تسليم)
            </h2>
            <CustomBtn
              theme={theme}
              btnTitle="New Delivery"
              onClick={() => {
                setEditingDeliveryId(null);
                setIsModalOpen(true);
              }}
              className="mr-2 px-6 py-2 mb-5 font-semibold border-none"
            />
          </div>

          <DeliveriesTable 
            deliveries={deliveriesToShow} 
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

      <NewDeliveryModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        editingDeliveryId={editingDeliveryId}
        onSuccess={(id: number) => setEditingDeliveryId(id)}
        onPreview={(id: number) => setPreviewId(id)}
      />

      <PdfPreviewModal
        quoteId={previewId}
        onClose={() => setPreviewId(null)}
      />
    </>
  );
};

export default Deliveries;
