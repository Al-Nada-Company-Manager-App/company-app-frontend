import { useState } from "react";
import { Tabs } from "antd";
import { useCustomers } from "@src/hooks/Customers/useCustomers";
import CustomerTable from "./components/CustomerTable";
import CustomerMap from "./components/CustomerMap";
import { Loading, ErrorDisplay } from "@src/components/UI";
import CustomBtn from "../UI/customBtn";
import AddCustomerModal from "./components/AddCustomerModal";
import { useSearchContext } from "@src/contexts/search";

interface CustomersProps {
  isDark: boolean;
}

const CustomersPage = ({ isDark }: CustomersProps) => {
  const { searchQuery } = useSearchContext();

  const [showAddModal, setShowAddModal] = useState(false);
  const [companyPage, setCompanyPage] = useState(1);
  const [personPage, setPersonPage] = useState(1);
  const pageSize = 10;

  // Fetch companies
  const {
    customers: companies,
    total: companyTotal,
    theme,
    isLoading: companiesLoading,
    error: companiesError,
  } = useCustomers(isDark, {
    page: companyPage,
    limit: pageSize,
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
    limit: pageSize,
    search: searchQuery,
    type: "PERSON",
  });

  const isLoading = companiesLoading && personsLoading;
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
            message="Loading customers..."
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
              <CustomerTable
                customers={companies}
                theme={theme}
                total={companyTotal}
                currentPage={companyPage}
                pageSize={pageSize}
                onPageChange={(page) => setCompanyPage(page)}
                loading={companiesLoading}
              />
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
              <CustomerTable
                customers={persons}
                theme={theme}
                total={personTotal}
                currentPage={personPage}
                pageSize={pageSize}
                onPageChange={(page) => setPersonPage(page)}
                loading={personsLoading}
              />
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
      <AddCustomerModal
        modalOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        theme={theme}
      />
    </>
  );
};

export default CustomersPage;
