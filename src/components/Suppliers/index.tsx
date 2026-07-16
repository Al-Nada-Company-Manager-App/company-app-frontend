import { useState, useEffect } from "react";
import { useSuppliers } from "@src/hooks/Suppliers/useSuppliers";
import SupplierTable from "./components/SupplierTable";
import { Loading, ErrorDisplay } from "@src/components/UI";
import CustomBtn from "../UI/customBtn";
import SupplierModal from "./components/SupplierModal";
import { useSearchContext } from "@src/contexts/search";

interface SuppliersProps {
  isDark: boolean;
}

const SuppliersPage = ({ isDark }: SuppliersProps) => {
  const { searchQuery } = useSearchContext();
  const [showAddModal, setShowAddModal] = useState(false);
  
  const [companyPage, setCompanyPage] = useState(1);
  const [companyPageSize, setCompanyPageSize] = useState(10);
  const [personPage, setPersonPage] = useState(1);
  const [personPageSize, setPersonPageSize] = useState(10);

  useEffect(() => {
    // Reset to first page when search changes
    setCompanyPage(1);
    setPersonPage(1);
  }, [searchQuery]);

  const { suppliers: companies, total: companyTotal, theme, isLoading: companiesLoading, error: companiesError } = useSuppliers(isDark, {
    page: companyPage,
    limit: companyPageSize,
    search: searchQuery,
    type: "COMPANY",
  });

  const { suppliers: persons, total: personTotal, isLoading: personsLoading, error: personsError } = useSuppliers(isDark, {
    page: personPage,
    limit: personPageSize,
    search: searchQuery,
    type: "PERSON",
  });

  const isLoading = companiesLoading || personsLoading;
  const error = companiesError || personsError;
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
              suppliers={companies}
              theme={theme}
              total={companyTotal}
              currentPage={companyPage}
              pageSize={companyPageSize}
              onPageChange={(page, size) => {
                setCompanyPage(page);
                setCompanyPageSize(size);
              }}
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
              suppliers={persons}
              theme={theme}
              total={personTotal}
              currentPage={personPage}
              pageSize={personPageSize}
              onPageChange={(page, size) => {
                setPersonPage(page);
                setPersonPageSize(size);
              }}
            />
          </div>
        </div>
      </div>
      <SupplierModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        theme={theme}
      />
    </>
  );
};

export default SuppliersPage;
