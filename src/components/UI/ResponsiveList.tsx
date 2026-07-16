import React from "react";
import { Pagination, Grid } from "antd";

interface ResponsiveListProps {
  table: React.ReactNode;
  cards: React.ReactNode;
  pagination?: {
    current: number;
    pageSize: number;
    total: number;
    onChange: (page: number, pageSize: number) => void;
    showSizeChanger?: boolean;
  };
  loading?: boolean;
  empty?: React.ReactNode;
  className?: string;
}

export const ResponsiveList: React.FC<ResponsiveListProps> = ({
  table,
  cards,
  pagination,
  loading,
  empty,
  className = "",
}) => {
  const { useBreakpoint } = Grid;
  const screens = useBreakpoint();

  if (empty) {
    return <div className={className}>{empty}</div>;
  }

  // We could also wrap in a loading overlay if needed, 
  // but often the Table and Cards handle their own loading or it's handled above.

  return (
    <div className={`w-full ${className}`}>
      <div className="w-full">
        {screens.md ? (
          <div className="w-full overflow-x-auto">{table}</div>
        ) : (
          <div className="w-full">{cards}</div>
        )}
      </div>

      {pagination && pagination.total > 0 && (
        <div className="mt-4 flex justify-end w-full">
          <Pagination
            current={pagination.current}
            pageSize={pagination.pageSize}
            total={pagination.total}
            onChange={pagination.onChange}
            showSizeChanger={pagination.showSizeChanger !== false}
            showTotal={(total, range) =>
              `${range[0]}-${range[1]} of ${total} items`
            }
          />
        </div>
      )}
    </div>
  );
};

export default ResponsiveList;
