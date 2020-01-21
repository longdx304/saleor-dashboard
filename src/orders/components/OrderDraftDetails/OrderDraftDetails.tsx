import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import React from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { SearchVouchers_search_edges_node } from "@saleor/searches/types/SearchVouchers";

import CardTitle from "@saleor/components/CardTitle";
import { DraftOrderInput } from "../../../types/globalTypes";

import { maybe } from "../../../misc";
import { OrderDetails_order } from "../../types/OrderDetails";
import OrderDraftDetailsProducts, {
  FormData as OrderDraftDetailsProductsFormData
} from "../OrderDraftDetailsProducts";
import OrderDraftDetailsSummary from "../OrderDraftDetailsSummary/OrderDraftDetailsSummary";

interface OrderDraftDetailsProps {
  order: OrderDetails_order;
  vouchers: SearchVouchers_search_edges_node[];
  vouchersLoading: boolean;
  hasMoreVouchers: boolean;
  fetchVouchers: (query: string) => void;
  onFetchMoreVouchers: () => void;
  onOrderLineAdd: () => void;
  onOrderLineChange: (
    id: string,
    data: OrderDraftDetailsProductsFormData
  ) => void;
  onOrderLineRemove: (id: string) => void;
  onShippingMethodEdit: () => void;
  onDraftOrderEdit: (data: DraftOrderInput) => void;
}

const OrderDraftDetails: React.FC<OrderDraftDetailsProps> = ({
  order,
  vouchers,
  vouchersLoading,
  fetchVouchers,
  hasMoreVouchers,
  onFetchMoreVouchers,
  onDraftOrderEdit,
  onOrderLineAdd,
  onOrderLineChange,
  onOrderLineRemove,
  onShippingMethodEdit
}) => {
  const intl = useIntl();

  return (
    <Card>
      <CardTitle
        title={intl.formatMessage({
          defaultMessage: "Order Details",
          description: "section header"
        })}
        toolbar={
          <Button color="primary" variant="text" onClick={onOrderLineAdd}>
            <FormattedMessage
              defaultMessage="Add products"
              description="button"
            />
          </Button>
        }
      />
      <OrderDraftDetailsProducts
        lines={maybe(() => order.lines)}
        onOrderLineChange={onOrderLineChange}
        onOrderLineRemove={onOrderLineRemove}
      />
      {maybe(() => order.lines.length) !== 0 && (
        <CardContent>
          <OrderDraftDetailsSummary
            order={order}
            vouchers={vouchers}
            vouchersLoading={vouchersLoading}
            fetchVouchers={fetchVouchers}
            hasMoreVouchers={hasMoreVouchers}
            onFetchMoreVouchers={onFetchMoreVouchers}
            onShippingMethodEdit={onShippingMethodEdit}
            onDraftOrderEdit={onDraftOrderEdit}
          />
        </CardContent>
      )}
    </Card>
  );
};
OrderDraftDetails.displayName = "OrderDraftDetails";
export default OrderDraftDetails;
