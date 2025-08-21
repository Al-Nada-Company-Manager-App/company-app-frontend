import React from "react";
import { Customer } from "../../types/Customers/customer";

interface CustomerDetailModalProps {
  customer: Customer;
  onClose: () => void;
}

const CustomerDetailModal: React.FC<CustomerDetailModalProps> = ({
  customer,
  onClose,
}) => {
  // TODO: Implement delete logic
  return (
    <div className="modal">
      <h2>Customer Details</h2>
      <p>Name: {customer.name}</p>
      <p>Email: {customer.email}</p>
      <button type="button" onClick={onClose}>
        Close
      </button>
      <button type="button" className="btn-danger">
        Delete Customer
      </button>
    </div>
  );
};

export default CustomerDetailModal;
