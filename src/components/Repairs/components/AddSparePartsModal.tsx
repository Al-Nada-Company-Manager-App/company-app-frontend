// import React, { useState } from "react";
// import { Modal, Select, InputNumber, Row, Col } from "antd";
// import { PlusOutlined } from "@ant-design/icons";
// import CustomBtn from "@src/components/UI/customBtn";
// import type { Theme } from "@src/types/theme";
// import { useSpareParts } from "@src/queries/SpareParts";
// import type {
//   SparePart,
//   SelectedSparePart,
// } from "@src/types/SpareParts/sparePart";

// interface UpdateStatusModalProps {
//   modalOpen: boolean;
//   onClose: () => void;
//   repair?: Repair;
//   theme: Theme;
// }

// const AddSparePartsModal = ({
//   modalOpen,
//   onClose,
//   repair,
//   theme,
// }: UpdateStatusModalProps) => {
//   const [selectedSpareParts, setSelectedSpareParts] = useState<
//     SelectedSparePart[]
//   >([]);
//   const { data: spareParts = [] } = useSpareParts();

//   const handleSpareChange = (
//     index: number,
//     field: keyof SelectedSparePart,
//     value: number | null
//   ) => {
//     const updated = [...selectedSpareParts];
//     updated[index][field] = value as never;
//     setSelectedSpareParts(updated);
//   };

//   return (
//     <Modal
//       title="Update Repair Status"
//       open={modalOpen}
//       onCancel={onClose}
//       footer={null}
//       centered
//     >
//       {selectedSpareParts.map((part, index) => (
//         <Row gutter={[16, 16]} key={index} style={{ marginBottom: "10px" }}>
//           <Col span={16}>
//             <Select
//               placeholder="Select Spare Part"
//               style={{ width: "100%" }}
//               onChange={(value) => handleSpareChange(index, "sp_id", value)}
//               value={part.sp_id ?? undefined}
//             >
//               {spareParts.map((sp: SparePart) => (
//                 <Option key={sp.p_id} value={sp.p_id}>
//                   {sp.p_name} (Available: {sp.p_quantity})
//                 </Option>
//               ))}
//             </Select>
//           </Col>
//           <Col span={8}>
//             <InputNumber
//               min={1}
//               placeholder="Quantity"
//               style={{ width: "100%" }}
//               onChange={(value) =>
//                 handleSpareChange(index, "sp_quantity", value ?? 0)
//               }
//               value={part.sp_quantity}
//             />
//           </Col>
//         </Row>
//       ))}
//     </Modal>
//   );
// };

// export default AddSparePartsModal;
