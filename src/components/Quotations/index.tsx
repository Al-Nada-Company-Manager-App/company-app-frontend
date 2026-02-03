import { useState } from "react";
import NewQuoteModal from "./NewQuoteModal";
import { useGetAllQuotations } from "@src/queries/Quotations";
import { Loading, ErrorDisplay } from "@src/components/UI";
import { useThemeContext } from "@src/contexts/theme";
import { useSearchContext } from "@src/contexts/search";
import CustomBtn from "../UI/customBtn";
import QuotationsTable from "./components/QuotationsTable";

const Quotations = ({ isDark }: { isDark: boolean }) => {
  const { theme } = useThemeContext();
  const { searchQuery } = useSearchContext();
  const { data: quotes, isLoading, error } = useGetAllQuotations();
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  // Filter logic
  const filteredQuotes = quotes?.filter((quote) => {
    const query = searchQuery.toLowerCase();
    const ref = quote.q_ref_code?.toLowerCase() || "";
    const name = quote.q_customer_name?.toLowerCase() || "";

    return ref.includes(query) || name.includes(query);
  });

  const quotesToShow = searchQuery.trim() === "" ? quotes : filteredQuotes;

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
              onClick={() => setIsModalOpen(true)}
              className="mr-2 px-6 py-2 mb-5 font-semibold border-none"
            />
          </div>

          <QuotationsTable quotations={quotesToShow ?? []} theme={theme} />
        </div>
      </div>

      <NewQuoteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={() => {
          setIsModalOpen(false);
        }}
      />
    </>
  );
};

export default Quotations;
