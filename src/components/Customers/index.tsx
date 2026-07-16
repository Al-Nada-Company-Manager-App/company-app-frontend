import { useState, useEffect } from "react";
import { Tabs } from "antd";
import { useCustomers } from "@src/hooks/Customers/useCustomers";
import CustomerTable from "./components/CustomerTable";
import CustomerMap from "./components/CustomerMap";
import { ErrorDisplay } from "@src/components/UI";
import CustomBtn from "../UI/customBtn";
import CustomerModal from "./components/CustomerModal";
import { useSearchContext } from "@src/contexts/search";
import { useQueryClient } from "@tanstack/react-query";
import { customerKeys } from "@src/queries/Customers/customerQueries";

interface CustomersProps {
  isDark: boolean;
}

const CustomersPage = ({ isDark }: CustomersProps) => {
  const { searchQuery } = useSearchContext();
  const queryClient = useQueryClient();

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

  // Fetch companies
  const {
    customers: companies,
    total: companyTotal,
    theme,
    isLoading: companiesLoading,
    error: companiesError,
  } = useCustomers(isDark, {
    page: companyPage,
    limit: companyPageSize,
    search: searchQuery,
    type: "COMPANY",
  });

  // Fetch persons
  const {
    customers: persons,
    total: personTotal,
    isLoading: personsLoading,
    error: personsError,
  } = useCustomers(isDark, {
    page: personPage,
    limit: personPageSize,
    search: searchQuery,
    type: "PERSON",
  });

  const tabItems = [
    {
      key: "customers",
      label: "📋 Customers",
      children: (
        <>
          <div
            className="w-full rounded-2xl p-6 mb-6"
            style={{
              background: theme.container.background,
              backdropFilter: theme.container.backdropFilter,
              minHeight: "auto",
            }}
          >
            {/* Companies Section */}
            <div className="mb-8">
              <h3
                className="text-md font-semibold mb-4"
                style={{ color: theme.title.color }}
              >
                Companies
              </h3>
              {companiesError ? (
                <ErrorDisplay
                  status="error"
                  title="Failed to Load Companies"
                  subTitle="There was an error loading the company data."
                  message={companiesError.message}
                  onRetry={() =>
                    queryClient.invalidateQueries({
                      queryKey: customerKeys.lists(),
                    })
                  }
                  showRetryButton={true}
                  showHomeButton={false}
                  isDark={isDark}
                />
              ) : (
                <CustomerTable
                  customers={companies}
                  theme={theme}
                  total={companyTotal}
                  currentPage={companyPage}
                  pageSize={companyPageSize}
                  onPageChange={(page, size) => {
                    setCompanyPage(page);
                    setCompanyPageSize(size);
                  }}
                  loading={companiesLoading}
                />
              )}
            </div>
          </div>
          <div
            className="w-full rounded-2xl p-6 mb-6"
            style={{
              background: theme.container.background,
              backdropFilter: theme.container.backdropFilter,
              minHeight: "auto",
            }}
          >
            {/* Persons Section */}
            <div>
              <h3
                className="text-md font-semibold mb-4"
                style={{ color: theme.title.color }}
              >
                Persons
              </h3>
              {personsError ? (
                <ErrorDisplay
                  status="error"
                  title="Failed to Load Persons"
                  subTitle="There was an error loading the person data."
                  message={personsError.message}
                  onRetry={() =>
                    queryClient.invalidateQueries({
                      queryKey: customerKeys.lists(),
                    })
                  }
                  showRetryButton={true}
                  showHomeButton={false}
                  isDark={isDark}
                />
              ) : (
                <CustomerTable
                  customers={persons}
                  theme={theme}
                  total={personTotal}
                  currentPage={personPage}
                  pageSize={personPageSize}
                  onPageChange={(page, size) => {
                    setPersonPage(page);
                    setPersonPageSize(size);
                  }}
                  loading={personsLoading}
                />
              )}
            </div>
          </div>
        </>
      ),
    },
    {
      key: "map",
      label: "🗺️ Map",
      children: (
        <div
          className="w-full rounded-2xl p-6"
          style={{
            background: theme.container.background,
            backdropFilter: theme.container.backdropFilter,
          }}
        >
          <CustomerMap theme={theme} />
        </div>
      ),
    },
  ];

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
          <div className="mb-2 flex items-center justify-between">
            <h2
              className="text-lg font-bold"
              style={{ color: theme.title.color }}
            >
              Customers
            </h2>
            <CustomBtn
              theme={theme}
              btnTitle="Add New Customer"
              onClick={() => setShowAddModal(true)}
              className="mr-2 px-6 py-2 mb-5 font-semibold border-none"
            />
          </div>
        </div>

        <Tabs defaultActiveKey="customers" items={tabItems} size="large" />
      </div>
      <CustomerModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        theme={theme}
      />
    </>
  );
};

export default CustomersPage;
