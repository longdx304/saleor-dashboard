import Form from "@saleor/components/Form";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import { FormattedMessage, useIntl } from "react-intl";

import useStateFromProps from "@saleor/hooks/useStateFromProps";
import { SearchVouchers_search_edges_node } from "@saleor/searches/types/SearchVouchers";
import SingleAutocompleteSelectField from "@saleor/components/SingleAutocompleteSelectField";
import createSingleAutocompleteSelectHandler from "@saleor/utils/handlers/singleAutocompleteSelectChangeHandler";
import Link from "@saleor/components/Link";
import Money from "@saleor/components/Money";
import Skeleton from "@saleor/components/Skeleton";
import { maybe } from "../../../misc";
import { OrderDetails_order } from "../../types/OrderDetails";

const useStyles = makeStyles(
  theme => ({
    root: {
      ...theme.typography.body1,
      lineHeight: 1.9,
      width: "100%"
    },
    textRight: {
      textAlign: "right"
    }
  }),
  { name: "OrderDraftDetailsSummary" }
);

interface OrderDraftDetailsSummaryProps {
  order: OrderDetails_order;
  vouchers?: SearchVouchers_search_edges_node[];
  vouchersLoading?: boolean;
  hasMoreVouchers: boolean;
  fetchVouchers?: (query: string) => void;
  onDraftOrderEdit?: (data: { voucher?: string }) => void;
  onFetchMoreVouchers: () => void;
  onShippingMethodEdit: () => void;
}

const OrderDraftDetailsSummary: React.FC<OrderDraftDetailsSummaryProps> = props => {
  const {
    order,
    onShippingMethodEdit,
    fetchVouchers,
    hasMoreVouchers: hasMoreVouchers,
    vouchersLoading,
    onFetchMoreVouchers: onFetchMoreVouchers,
    vouchers,
    onDraftOrderEdit
  } = props;

  const voucher = maybe(() => order.voucher);

  const [voucherCode, setVoucherCode] = useStateFromProps(
    maybe(() => voucher.code, "")
  );
  const [isInEditMode, setEditModeStatus] = React.useState(false);
  const toggleEditMode = () => setEditModeStatus(!isInEditMode);
  const intl = useIntl();
  const classes = useStyles(props);

  return (
    <table className={classes.root}>
      <tbody>
        <tr>
          {maybe(() => order.subtotal) ? (
            <>
              <td>
                <FormattedMessage
                  defaultMessage="Subtotal"
                  description="subtotal price or an order"
                />
              </td>
              <td className={classes.textRight}>
                <Money money={order.subtotal.gross} />
              </td>
            </>
          ) : (
            <td colSpan={2}>
              <Skeleton />
            </td>
          )}
        </tr>
        <tr>
          {order &&
          order.shippingMethod !== undefined &&
          order.shippingMethodName !== undefined ? (
            order.shippingMethod === null ? (
              order.availableShippingMethods &&
              order.availableShippingMethods.length > 0 ? (
                <td>
                  <Link onClick={onShippingMethodEdit}>
                    <FormattedMessage
                      defaultMessage="Add shipping carrier"
                      description="button"
                    />
                  </Link>
                </td>
              ) : (
                <td>
                  <FormattedMessage defaultMessage="No applicable shipping carriers" />
                </td>
              )
            ) : (
              <>
                <td>
                  <Link onClick={onShippingMethodEdit}>
                    {order.shippingMethodName}
                  </Link>
                </td>
                <td className={classes.textRight}>
                  {maybe(() => order.shippingPrice) ? (
                    <Money money={order.shippingPrice.gross} />
                  ) : (
                    "---"
                  )}
                </td>
              </>
            )
          ) : (
            <td colSpan={2}>
              <Skeleton />
            </td>
          )}
        </tr>
        <tr>
          {maybe(() => order.voucher) !== undefined ? (
            <>
              <td>
                <Link onClick={toggleEditMode}>
                  <FormattedMessage
                    defaultMessage="Update voucher"
                    description="button"
                  />
                </Link>
              </td>
              <td className={classes.textRight}>
                {isInEditMode ? (
                  <Form initial={{ query: "" }}>
                    {({ change, data }) => {
                      const handleChange = (event: React.ChangeEvent<any>) => {
                        change(event);
                        const value = event.target.value;

                        onDraftOrderEdit({
                          ["voucher"]: value
                        });
                        toggleEditMode();
                      };
                      const voucherChoices = maybe(() => vouchers, []).map(
                        voucher => ({
                          label: voucher.code,
                          value: voucher.id
                        })
                      );
                      const handleVoucherChange = createSingleAutocompleteSelectHandler(
                        handleChange,
                        setVoucherCode,
                        voucherChoices
                      );
                      return (
                        <SingleAutocompleteSelectField
                          allowCustomValues={false}
                          choices={voucherChoices}
                          displayValue={voucherCode}
                          fetchChoices={fetchVouchers}
                          hasMore={hasMoreVouchers}
                          loading={vouchersLoading}
                          placeholder={intl.formatMessage({
                            defaultMessage: "Search Voucher"
                          })}
                          onChange={handleVoucherChange}
                          onFetchMore={onFetchMoreVouchers}
                          name="query"
                          value={data.query}
                        />
                      );
                    }}
                  </Form>
                ) : maybe(() => order.voucher.code) === undefined ? (
                  <Typography></Typography>
                ) : (
                  <Typography>{order.voucher.code}</Typography>
                )}
              </td>
            </>
          ) : (
            <td colSpan={2}>
              <Skeleton />
            </td>
          )}
        </tr>
        <tr>
          {maybe(() => order.total.tax) !== undefined ? (
            <>
              <td>
                <FormattedMessage defaultMessage="Taxes (VAT included)" />
              </td>
              <td className={classes.textRight}>
                <Money money={order.total.tax} />
              </td>
            </>
          ) : (
            <td colSpan={2}>
              <Skeleton />
            </td>
          )}
        </tr>
        <tr>
          {maybe(() => order.total.gross) !== undefined ? (
            <>
              <td>
                <FormattedMessage
                  defaultMessage="Total"
                  description="total price of an order"
                />
              </td>
              <td className={classes.textRight}>
                <Money money={order.total.gross} />
              </td>
            </>
          ) : (
            <td colSpan={2}>
              <Skeleton />
            </td>
          )}
        </tr>
      </tbody>
    </table>
  );
};
OrderDraftDetailsSummary.displayName = "OrderDraftDetailsSummary";
export default OrderDraftDetailsSummary;
