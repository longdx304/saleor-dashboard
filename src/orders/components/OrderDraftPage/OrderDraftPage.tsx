import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import React from "react";
import { useIntl } from "react-intl";

import AppHeader from "@saleor/components/AppHeader";
import CardMenu from "@saleor/components/CardMenu";
import { ConfirmButtonTransitionState } from "@saleor/components/ConfirmButton";
import { Container } from "@saleor/components/Container";
import { DateTime } from "@saleor/components/Date";
import Grid from "@saleor/components/Grid";
import PageHeader from "@saleor/components/PageHeader";
import SaveButtonBar from "@saleor/components/SaveButtonBar";
import Skeleton from "@saleor/components/Skeleton";
import { sectionNames } from "@saleor/intl";
import { SearchCustomers_search_edges_node } from "@saleor/searches/types/SearchCustomers";
import { SearchVouchers_search_edges_node } from "@saleor/searches/types/SearchVouchers";
import { FetchMoreProps, UserPermissionProps } from "@saleor/types";
import { maybe } from "../../../misc";
import { DraftOrderInput } from "../../../types/globalTypes";
import { OrderDetails_order } from "../../types/OrderDetails";
import OrderCustomer from "../OrderCustomer";
import OrderDraftDetails from "../OrderDraftDetails/OrderDraftDetails";
import { FormData as OrderDraftDetailsProductsFormData } from "../OrderDraftDetailsProducts";
import OrderHistory, { FormData as HistoryFormData } from "../OrderHistory";

const useStyles = makeStyles(
  theme => ({
    date: {
      marginBottom: theme.spacing(3)
    },
    header: {
      display: "flex",
      marginBottom: 0
    }
  }),
  { name: "OrderDraftPage" }
);

export interface OrderDraftPageProps
  extends FetchMoreProps,
    UserPermissionProps {
  disabled: boolean;
  order: OrderDetails_order;
  users: SearchCustomers_search_edges_node[];
  vouchers: SearchVouchers_search_edges_node[];
  vouchersLoading: boolean;
  usersLoading: boolean;
  hasMoreVouchers: boolean;
  countries: Array<{
    code: string;
    label: string;
  }>;
  saveButtonBarState: ConfirmButtonTransitionState;
  fetchUsers: (query: string) => void;
  fetchVouchers: (query: string) => void;
  onFetchMoreVouchers: () => void;
  onBack: () => void;
  onBillingAddressEdit: () => void;
  onDraftOrderEdit: (data: DraftOrderInput) => void;
  onDraftFinalize: () => void;
  onDraftRemove: () => void;
  onNoteAdd: (data: HistoryFormData) => void;
  onOrderLineAdd: () => void;
  onOrderLineChange: (
    id: string,
    data: OrderDraftDetailsProductsFormData
  ) => void;
  onOrderLineRemove: (id: string) => void;
  onProductClick: (id: string) => void;
  onShippingAddressEdit: () => void;
  onShippingMethodEdit: () => void;
  onProfileView: () => void;
}

const OrderDraftPage: React.FC<OrderDraftPageProps> = props => {
  const {
    disabled,
    fetchUsers,
    fetchVouchers,
    hasMoreVouchers,
    onFetchMoreVouchers,
    vouchers,
    vouchersLoading,
    hasMore,
    saveButtonBarState,
    onBack,
    onBillingAddressEdit,
    onDraftOrderEdit,
    onDraftFinalize,
    onDraftRemove,
    onFetchMore,
    onNoteAdd,
    onOrderLineAdd,
    onOrderLineChange,
    onOrderLineRemove,
    onShippingAddressEdit,
    onShippingMethodEdit,
    onProfileView,
    order,
    users,
    usersLoading,
    userPermissions
  } = props;
  const classes = useStyles(props);

  const intl = useIntl();

  return (
    <Container>
      <AppHeader onBack={onBack}>
        {intl.formatMessage(sectionNames.draftOrders)}
      </AppHeader>
      <PageHeader
        className={classes.header}
        inline
        title={maybe(() => order.number) ? "#" + order.number : undefined}
      >
        <CardMenu
          menuItems={[
            {
              label: intl.formatMessage({
                defaultMessage: "Cancel order",
                description: "button"
              }),
              onSelect: onDraftRemove
            }
          ]}
        />
      </PageHeader>
      <div className={classes.date}>
        {order && order.created ? (
          <Typography variant="caption">
            <DateTime date={order.created} />
          </Typography>
        ) : (
          <Skeleton style={{ width: "10em" }} />
        )}
      </div>
      <Grid>
        <div>
          <OrderDraftDetails
            order={order}
            vouchers={vouchers}
            fetchVouchers={fetchVouchers}
            hasMoreVouchers={hasMoreVouchers}
            vouchersLoading={vouchersLoading}
            onDraftOrderEdit={onDraftOrderEdit}
            onFetchMoreVouchers={onFetchMoreVouchers}
            onOrderLineAdd={onOrderLineAdd}
            onOrderLineChange={onOrderLineChange}
            onOrderLineRemove={onOrderLineRemove}
            onShippingMethodEdit={onShippingMethodEdit}
          />
          <OrderHistory
            history={maybe(() => order.events)}
            onNoteAdd={onNoteAdd}
          />
        </div>
        <div>
          <OrderCustomer
            canEditAddresses={true}
            canEditCustomer={true}
            fetchUsers={fetchUsers}
            hasMore={hasMore}
            loading={usersLoading}
            order={order}
            users={users}
            userPermissions={userPermissions}
            onBillingAddressEdit={onBillingAddressEdit}
            onDraftOrderEdit={onDraftOrderEdit}
            onFetchMore={onFetchMore}
            onProfileView={onProfileView}
            onShippingAddressEdit={onShippingAddressEdit}
          />
        </div>
      </Grid>
      <SaveButtonBar
        state={saveButtonBarState}
        disabled={disabled || !maybe(() => order.canFinalize)}
        onCancel={onBack}
        onSave={onDraftFinalize}
        labels={{
          save: intl.formatMessage({
            defaultMessage: "Finalize",
            description: "button"
          })
        }}
      />
    </Container>
  );
};
OrderDraftPage.displayName = "OrderDraftPage";
export default OrderDraftPage;
