import ConfirmBtn from "@src/components/UI/confirm";
import type { Product } from "@src/types/Products/product";
import type { Theme } from "@src/types/theme";
import { Col, Descriptions, Image, Modal, Row } from "antd";
import { useState } from "react";
import ProductModal from "./ProductModal";
import { useDeleteProduct } from "@src/queries/Products/productQueries";
import { useThemeContext } from "@src/contexts/theme";
import CustomBtn from "@src/components/UI/customBtn";
import { convertTimestampToDate } from "@src/utils/ConvertDate";
import { getImageUrl, getPlaceholderUrl } from "@src/config/api";

interface DetailModal {
  modalOpen: boolean;
  onClose: () => void;
  theme: Theme;
  product?: Product;
}

const ProductDetailModal = ({
  modalOpen,
  onClose,
  product,
  theme,
}: DetailModal) => {
  const [updateOpen, setUpdateOpen] = useState(false);
  const { isDark } = useThemeContext();
  const deleteProduct = useDeleteProduct(isDark);

  const handleDelete = async (productId: number) => {
    if (productId === -1) return;
    await deleteProduct.mutateAsync(productId);
  };

  const handleUpdateClose = () => {
    setUpdateOpen(false);
    onClose();
  };

  return (
    <>
      <Modal
        className="custom-modal"
        title="Product Details"
        open={modalOpen}
        onCancel={onClose}
        footer={
          <div className="flex justify-end">
            <CustomBtn
              btnTitle="Edit"
              onClick={() => setUpdateOpen(true)}
              theme={{
                ...theme,
                button: {
                  ...theme.button,
                  background: "#faad14",
                  hoverBackground: "#d48806",
                  color: "#fff",
                  hoverColor: "#fff",
                },
              }}
              className="mr-2 px-6 py-2 mb-5 font-semibold border-none"
            />
            <ConfirmBtn
              type="primary"
              isdanger={true}
              btnTitle="Delete"
              onOk={() => {
                handleDelete(product?.p_id || -1);
                onClose();
              }}
              onCancel={() => {
                console.log("Delete cancelled");
              }}
              className="px-6 py-2 mb-5 mr-5"
              theme={theme}
            />
          </div>
        }
        centered
        style={{ minWidth: 900, width: "auto", maxWidth: "95vw" }}
      >
        <Row gutter={[16, 16]}>
          <Col span={8}>
            <Image
              src={getImageUrl("products", product?.p_photo)}
              fallback={getPlaceholderUrl("products")}
              alt={product?.p_name}
              style={{ borderRadius: "12px", width: "100%" }}
            />
          </Col>
          <Col span={16}>
            <Descriptions bordered column={1}>
              <Descriptions.Item label="Product Name">
                {product?.p_name}
              </Descriptions.Item>
              {product?.p_category && (
                <Descriptions.Item label="Category">
                  {product.p_category}
                </Descriptions.Item>
              )}
              {product?.p_size && (
                <Descriptions.Item label="Size">
                  {product.p_size}
                </Descriptions.Item>
              )}
              {product?.model_code && (
                <Descriptions.Item label="Model Code">
                  {product.model_code}
                </Descriptions.Item>
              )}
              {product?.serial_number && (
                <Descriptions.Item label="Serial Number">
                  {product.serial_number}
                </Descriptions.Item>
              )}
              {product?.p_quantity !== undefined && product?.p_quantity !== null && (
                <Descriptions.Item label="Quantity">
                  {product.p_quantity}
                </Descriptions.Item>
              )}
              {product?.p_costprice !== undefined && product?.p_costprice !== null && (
                <Descriptions.Item label="Cost Price">
                  {product.p_costprice}
                </Descriptions.Item>
              )}
              {product?.p_sellprice !== undefined && product?.p_sellprice !== null && (
                <Descriptions.Item label="Sell Price">
                  {product.p_sellprice}
                </Descriptions.Item>
              )}
              {product?.expire_date && (
                <Descriptions.Item label="Expire Date">
                  {convertTimestampToDate(product.expire_date)}
                </Descriptions.Item>
              )}
              {product?.p_status && (
                <Descriptions.Item label="Status">
                  {product.p_status}
                </Descriptions.Item>
              )}
              {product?.p_description && product.p_description !== "N/A" && product.p_description.trim() !== "" && (
                <Descriptions.Item label="Description">
                  <div
                    style={{
                      padding: 0,
                      maxWidth: "100%",
                      overflowWrap: "break-word",
                      lineHeight: "1.6",
                      fontSize: "13px",
                    }}
                    dangerouslySetInnerHTML={{
                      __html: product.p_description,
                    }}
                  />
                </Descriptions.Item>
              )}
            </Descriptions>
          </Col>
        </Row>
      </Modal>
      <ProductModal
        key={product?.p_id}
        isOpen={updateOpen}
        onClose={handleUpdateClose}
        product={product}
        theme={theme}
      />
    </>
  );
};

export default ProductDetailModal;
