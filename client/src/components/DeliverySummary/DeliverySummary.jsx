import { Box, Flex, Heading, Separator, Text } from '@radix-ui/themes';

import EditLink from '../EditLink/EditLink.jsx';

import css from './DeliverySummary.module.css';

export default function DeliverySummary({ customerPhone, deliveryAddress, selectedDeliveryCost, totalPrice }) {
  const {
    selectedCity,
    selectedMethod,
    selectedWarehouse: { selectedBranch, selectedPostomat },
    selectedStreet,
    buildingUnit,
    apartmentUnit,
  } = deliveryAddress;

  const city = selectedCity
    ? `${selectedCity.SettlementTypeDescription?.slice(0, 1) || ''}. ${selectedCity.Description || ''}`
    : '';

  const isBranch = selectedMethod === 'branch';
  const isPostomat = selectedMethod === 'postomat';
  const isCourier = selectedMethod === 'courier';

  return (
    <Flex direction="column" gap="7">
      <Box className={css.orderSummaryWrapper}>
        <Flex align="center" justify="between" mb="3">
          <Heading className={css.title} as="h3" size="3" weight="bold">
            Delivery address
          </Heading>
          <EditLink navTo="/delivery" />
        </Flex>
        <Box mb="5">
          {(isBranch || isPostomat) && (
            <Text as="p">{isBranch ? selectedBranch?.Description : selectedPostomat?.Description}</Text>
          )}
          {isCourier && (
            <Text as="p">
              {selectedStreet?.StreetsType} {selectedStreet?.Description}, {buildingUnit} , кв. {apartmentUnit}
            </Text>
          )}
          <Text as="p">{city}</Text>
          <Text as="p">{customerPhone}</Text>
        </Box>
        <Flex align="center" justify="between" mb="3">
          <Heading className={css.title} as="h3" size="3" weight="bold">
            Shipping
          </Heading>
          <EditLink navTo="/delivery" />
        </Flex>
        <Box>
          {(isBranch || isPostomat) && (
            <Text as="p">{isBranch ? `Доставка на відділення «Нова пошта»` : `Доставка в поштомат «Нова пошта»`}</Text>
          )}
          {isCourier && <Text as="p">Кур’єрська доставка «Нова пошта»</Text>}
          <Text as="p">{totalPrice >= 300 ? 'FREE' : `$${selectedDeliveryCost}`}</Text>
        </Box>
        <Separator my="5" size="4" />
      </Box>
    </Flex>
  );
}
