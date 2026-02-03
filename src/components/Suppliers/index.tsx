import { useState } from "react";
import { useSuppliers } from "@src/hooks/Suppliers/useSuppliers";
import SupplierTable from "./components/SupplierTable";
import { Loading, ErrorDisplay } from "@src/components/UI";
import CustomBtn from "../UI/customBtn";
import AddSupplierModal from "./components/AddSupplierModal";
import { useSearchContext } from "@src/contexts/search";
interface SuppliersProps {
  isDark: boolean;
}
const SuppliersPage = ({ isDark }: SuppliersProps) => {
  const { suppliers, theme, isLoading, error } = useSuppliers(isDark);
  const { searchQuery } = useSearchContext();

  const [showAddModal, setShowAddModal] = useState(false);
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
            message="Loading supplliers..."
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
            title="Failed to Load Customers"
            subTitle="There was an error loading the customer data."
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

  // Filter suppliers with relational logic
  const filteredSuppliers = (() => {
    if (!suppliers) return [];
    const query = searchQuery.trim().toLowerCase();
    if (!query) return suppliers;

    const directMatches = suppliers.filter((supplier) => {
      const name = supplier.s_name?.toLowerCase() || "";
      const email = supplier.s_email?.toLowerCase() || "";
      const fax = supplier.s_fax?.toLowerCase() || "";
      const phone = supplier.s_phone?.toLowerCase() || "";

      return (
        name.includes(query) ||
        email.includes(query) ||
        fax.includes(query) ||
        phone.includes(query)
      );
    });

    const relatedIds = new Set<number>();

    directMatches.forEach((match) => {
      relatedIds.add(match.s_id);

      // If match is a Person, add their Company
      if (match.s_type === "PERSON" && match.s_company_id) {
        relatedIds.add(match.s_company_id);
      }

      // If match is a Company, add all their Employees
      if (match.s_type === "COMPANY") {
        // Find all employees for this company
        const employees = suppliers.filter(
          (s) => s.s_company_id === match.s_id,
        );
        employees.forEach((emp) => relatedIds.add(emp.s_id));
      }
    });

    return suppliers.filter((s) => relatedIds.has(s.s_id));
  })();

  const suppliersToShow = filteredSuppliers;

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
              Suppliers
            </h2>
            <CustomBtn
              theme={theme}
              btnTitle="Add New Supplier"
              onClick={() => setShowAddModal(true)}
              className="mr-2 px-6 py-2 mb-5 font-semibold border-none"
            />
          </div>

          {/* Companies Section */}
          <div className="mb-8">
            <h3
              className="text-md font-semibold mb-4"
              style={{ color: theme.title.color }}
            >
              Companies
            </h3>
            <SupplierTable
              suppliers={
                suppliersToShow?.filter((s) => s.s_type !== "PERSON") ?? []
              }
              theme={theme}
            />
          </div>

          {/* Persons Section */}
          <div>
            <h3
              className="text-md font-semibold mb-4"
              style={{ color: theme.title.color }}
            >
              Persons
            </h3>
            <SupplierTable
              suppliers={
                suppliersToShow?.filter((s) => s.s_type === "PERSON") ?? []
              }
              theme={theme}
            />
          </div>
        </div>
      </div>
      <AddSupplierModal
        modalOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        theme={theme}
      />
    </>
  );
};

export default SuppliersPage;
