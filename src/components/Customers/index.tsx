import { useState } from "react";
import { useCustomers } from "@src/hooks/Customers/useCustomers";
import CustomerTable from "./components/CustomerTable";
import { Loading, ErrorDisplay } from "@src/components/UI";
import CustomBtn from "../UI/customBtn";
import AddCustomerModal from "./components/AddCustomerModal";
import { useSearchContext } from "@src/contexts/search";
interface CustomersProps {
  isDark: boolean;
}
const CustomersPage = ({ isDark }: CustomersProps) => {
  const { customers, theme, isLoading, error } = useCustomers(isDark);
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

  // Filter customers with relational logic
  const filteredCustomers = (() => {
    if (!customers) return [];
    const query = searchQuery.trim().toLowerCase();
    if (!query) return customers;

    const directMatches = customers.filter((customer) => {
      const name = customer.c_name?.toLowerCase() || "";
      const email = customer.c_email?.toLowerCase() || "";
      const fax = customer.c_fax?.toLowerCase() || "";
      const phone = customer.c_phone?.toLowerCase() || "";

      return (
        name.includes(query) ||
        email.includes(query) ||
        fax.includes(query) ||
        phone.includes(query)
      );
    });

    const relatedIds = new Set<number>();

    directMatches.forEach((match) => {
      relatedIds.add(match.c_id);

      // If match is a Person, add their Company
      if (match.c_type === "PERSON" && match.c_company_id) {
        relatedIds.add(match.c_company_id);
      }

      // If match is a Company, add all their Employees
      if (match.c_type === "COMPANY") {
        // Find all employees for this company
        const employees = customers.filter(
          (c) => c.c_company_id === match.c_id,
        );
        employees.forEach((emp) => relatedIds.add(emp.c_id));
      }
    });

    return customers.filter((c) => relatedIds.has(c.c_id));
  })();

  const customersToShow = filteredCustomers;

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
              Customers
            </h2>
            <CustomBtn
              theme={theme}
              btnTitle="Add New Customer"
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
            <CustomerTable
              customers={
                customersToShow?.filter((c) => c.c_type !== "PERSON") ?? []
              }
              theme={theme}
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
              customers={
                customersToShow?.filter((c) => c.c_type === "PERSON") ?? []
              }
              theme={theme}
            />
          </div>
        </div>
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
