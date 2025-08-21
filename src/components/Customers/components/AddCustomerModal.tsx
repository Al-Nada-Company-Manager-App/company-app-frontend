import React from "react";

interface AddCustomerModalProps {
  onClose: () => void;
}

const AddCustomerModal: React.FC<AddCustomerModalProps> = ({ onClose }) => {
  // TODO: Implement form and add logic
  return (
    <div className="modal">
      <h2>Add New Customer</h2>
      <form>
        {/* Form fields here */}
        <button type="button" onClick={onClose}>
          Close
        </button>
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default AddCustomerModal;
