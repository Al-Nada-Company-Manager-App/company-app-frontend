import { useState } from "react";
import NewQuoteModal from "./NewQuoteModal";
import { useGetAllQuotations } from "@src/queries/Quotations";
import { Loading, ErrorDisplay } from "@src/components/UI";
import { useThemeContext } from "@src/contexts/theme";
import { useSearchContext } from "@src/contexts/search";
import CustomBtn from "../UI/customBtn";
import QuotationsTable from "./components/QuotationsTable";
import PdfPreviewModal from "./components/PdfPreviewModal";

const Quotations = ({ isDark }: { isDark: boolean }) => {
  const { theme } = useThemeContext();
  const { searchQuery } = useSearchContext();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const { data, isLoading, error } = useGetAllQuotations({
    page: currentPage,
    limit: pageSize,
    search: searchQuery,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingQuoteId, setEditingQuoteId] = useState<number | null>(null);
  const [previewQuoteId, setPreviewQuoteId] = useState<number | null>(null);

  const handleOpenEdit = (id: number) => {
    setEditingQuoteId(id);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingQuoteId(null);
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
            message="Loading quotations..."
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
            subTitle="There was an error loading the quotations data."
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

  const quotesToShow = data?.data ?? [];
  const total = data?.metadata?.total ?? 0;

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
              Price Quotations
            </h2>
            <CustomBtn
              theme={theme}
              btnTitle="New Quote"
              onClick={() => {
                setEditingQuoteId(null);
                setIsModalOpen(true);
              }}
              className="mr-2 px-6 py-2 mb-5 font-semibold border-none"
            />
          </div>

          <QuotationsTable 
            quotations={quotesToShow ?? []} 
            theme={theme} 
            onEdit={handleOpenEdit}
            onPreview={setPreviewQuoteId}
            total={total}
            currentPage={currentPage}
            pageSize={pageSize}
            onPageChange={(page, size) => { setCurrentPage(page); setPageSize(size); }}
            loading={isLoading}
          />
        </div>
      </div>

      <NewQuoteModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        editingQuoteId={editingQuoteId}
        onSuccess={(id: number) => setEditingQuoteId(id)}
        onPreview={(id: number) => setPreviewQuoteId(id)}
      />

      <PdfPreviewModal
        quoteId={previewQuoteId}
        onClose={() => setPreviewQuoteId(null)}
      />
    </>
  );
};

export default Quotations;
