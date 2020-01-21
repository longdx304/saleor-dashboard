import { Omit } from "@material-ui/core";
import { storiesOf } from "@storybook/react";
import React from "react";

import placeholderImage from "@assets/images/placeholder60x60.png";
import { fetchMoreProps, permissions } from "@saleor/fixtures";
import OrderDraftPage, {
  OrderDraftPageProps
} from "../../../orders/components/OrderDraftPage";
import { clients, countries, draftOrder } from "../../../orders/fixtures";
import Decorator from "../../Decorator";

const order = draftOrder(placeholderImage);

const props: Omit<OrderDraftPageProps, "classes"> = {
  ...fetchMoreProps,
  countries,
  disabled: false,
  fetchUsers: () => undefined,
  fetchVouchers: () => undefined,
  hasMoreVouchers: undefined,
  onBack: () => undefined,
  onBillingAddressEdit: undefined,
  onDraftFinalize: () => undefined,
  onDraftOrderEdit: () => undefined,
  onDraftRemove: () => undefined,
  onFetchMoreVouchers: () => undefined,
  onNoteAdd: undefined,
  onOrderLineAdd: () => undefined,
  onOrderLineChange: () => undefined,
  onOrderLineRemove: () => () => undefined,
  onProductClick: undefined,
  onProfileView: () => undefined,
  onShippingAddressEdit: undefined,
  onShippingMethodEdit: undefined,
  order,
  saveButtonBarState: "default",
  userPermissions: permissions,
  users: clients,
  usersLoading: false,
  vouchers: undefined,
  vouchersLoading: undefined
};

storiesOf("Views / Orders / Order draft", module)
  .addDecorator(Decorator)
  .add("default", () => <OrderDraftPage {...props} />)
  .add("loading", () => (
    <OrderDraftPage {...props} disabled={true} order={undefined} />
  ))
  .add("without lines", () => (
    <OrderDraftPage {...props} order={{ ...order, lines: [] }} />
  ))
  .add("no user permissions", () => (
    <OrderDraftPage {...props} userPermissions={[]} />
  ));
