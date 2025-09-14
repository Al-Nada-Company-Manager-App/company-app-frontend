import { Table } from "antd";
import type { Device } from "@src/types/Devices/device";
import type { Theme } from "@src/types/theme";
import StatusBadge from "@src/components/UI/StatusBadge";
// import { useState } from "react";
// import ProductDetailModal from "./ProductDetailModal";
// import ProductInfo from "./components/ProductInfo";

interface DevicesTableProps {
  devices: Device[];
  theme: Theme;
}

const { Column } = Table;

const DevicesTable = ({ devices }: DevicesTableProps) => {
//   const [selectedRow, setSelectedRow] = useState<Device>();
//   const [isModalVisible, setIsModalVisible] = useState(false);

  return (
    <>
          <div className="custom-table">
            <Table<Device>
              dataSource={devices}
              showHeader={true}
              pagination={{ pageSize: 10 }}
              rowKey="p_id"
              //     onRow={(record) => ({
              //       onClick: () => {
              //         setSelectedRow(record);
              //         setIsModalVisible(true);
              //       },
              //     })}
            >
              <Column
                title="Serial Number"
                dataIndex="serial_number"
                key="serial_number"
              />
              <Column
                title="Product"
                dataIndex="p_name"
                key="p_name"
                // render={(_, record: Product) => (
                //   <ProductInfo product={record} theme={theme} />
                // )}
              />
              <Column title="Status" dataIndex="p_status" key="p_status"
              render={(status: string) => <StatusBadge status={status} />}
              />
            </Table>
          </div>
      {/* <ProductDetailModal
        modalOpen={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        product={selectedRow}
        theme={theme}
      /> */}
    </>
  );
};

export default DevicesTable;

