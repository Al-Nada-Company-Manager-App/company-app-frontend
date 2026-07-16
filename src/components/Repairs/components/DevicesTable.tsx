import { Table } from "antd";
import ResponsiveList from "@src/components/UI/ResponsiveList";
import DeviceCard from "./DeviceCard";
import { useState } from "react";
import type { Device } from "@src/types/Devices/device";
import type { Theme } from "@src/types/theme";
import StatusBadge from "@src/components/UI/StatusBadge";

interface DevicesTableProps {
  devices: Device[];
  theme: Theme;
}

const { Column } = Table;

const DevicesTable = ({ devices, theme }: DevicesTableProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  
  const paginatedDevices = devices.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const tableComponent = (
    <Table<Device>
      dataSource={paginatedDevices}
      showHeader={true}
      pagination={false}
      rowKey="p_id"
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
      />
      <Column title="Status" dataIndex="p_status" key="p_status"
      render={(status: string) => <StatusBadge status={status} />}
      />
    </Table>
  );

  const cardsComponent = (
    <div className="flex flex-col gap-4">
      {paginatedDevices.map((device) => (
        <DeviceCard
          key={device.p_id}
          device={device}
          theme={theme}
        />
      ))}
    </div>
  );

  return (
    <>
      <div className="custom-table">
        <ResponsiveList
          className="custom-table"
          table={tableComponent}
          cards={cardsComponent}
          pagination={{
            current: currentPage,
            pageSize: pageSize,
            total: devices.length,
            onChange: (page) => setCurrentPage(page),
            showSizeChanger: false,
          }}
        />
      </div>
    </>
  );
};

export default DevicesTable;

