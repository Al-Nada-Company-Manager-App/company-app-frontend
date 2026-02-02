import { useState } from "react";
import { Plus, FileText, ExternalLink } from "lucide-react";
import NewQuoteModal from "./NewQuoteModal";
import { useGetAllQuotations } from "@src/queries/Quotations";
import { Loading, ErrorDisplay } from "@src/components/UI";
import { useThemeContext } from "@src/contexts/theme";

const Quotations = ({ isDark }: { isDark: boolean }) => {
  const { theme } = useThemeContext();
  const { data: quotes, isLoading, error, refetch } = useGetAllQuotations();
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (isLoading) {
    return (
      <Loading size="large" message="Loading quotations..." isDark={isDark} />
    );
  }

  if (error) {
    return (
      <ErrorDisplay
        status="error"
        title="Failed to Load"
        message={error.message}
        isDark={isDark}
      />
    );
  }

  return (
    <div
      className={`p-6 min-h-screen ${isDark ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"}`}
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <FileText className="w-8 h-8 text-blue-600" />
            Price Quotations
          </h1>
          <p
            className={`text-sm ${isDark ? "text-gray-400" : "text-gray-500"}`}
          >
            Manage and generate price quotations for customers.
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          <Plus className="w-4 h-4" />
          New Quote
        </button>
      </div>

      {/* Table Section */}
      <div
        className={`rounded-xl shadow-sm overflow-hidden ${isDark ? "bg-gray-800" : "bg-white"}`}
      >
        <table className="w-full text-left border-collapse">
          <thead
            className={`${isDark ? "bg-gray-700 text-gray-200" : "bg-gray-100 text-gray-600"} uppercase text-xs font-semibold`}
          >
            <tr>
              <th className="p-4">Ref Code</th>
              <th className="p-4">Customer</th>
              <th className="p-4">Date</th>
              <th className="p-4 text-right">Total</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {quotes.length > 0 ? (
              quotes.map((quote) => (
                <tr
                  key={quote.q_id}
                  className={`border-b ${isDark ? "border-gray-700 hover:bg-gray-750" : "border-gray-100 hover:bg-gray-50"}`}
                >
                  <td className="p-4 font-medium">{quote.q_ref_code}</td>
                  <td className="p-4">{quote.q_customer_name}</td>
                  <td className="p-4">
                    {new Date(quote.q_created_at).toLocaleDateString()}
                  </td>
                  <td className="p-4 text-right">
                    ${quote.q_total_amount?.toFixed(2)}
                  </td>
                  <td className="p-4 text-center">
                    <a
                      href={`http://localhost:4000/${quote.q_pdf_path}`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-blue-500 hover:underline text-sm"
                    >
                      <ExternalLink className="w-4 h-4" /> View PDF
                    </a>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="p-8 text-center text-gray-500">
                  No quotations found. Create one to get started!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <NewQuoteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={() => {
          setIsModalOpen(false);
        }}
      />
    </div>
  );
};

export default Quotations;
