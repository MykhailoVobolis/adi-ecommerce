import { Box, Flex } from '@radix-ui/themes';
import { LiaCheckSolid } from 'react-icons/lia';

import css from './DeliveryMethodSelector.module.css';

export default function DeliveryMethodSelector({ options, handleSelect, selectedMethod, deliveryCost, totalPrice }) {
  const { pickupPointCost, courierDeliveryCost } = deliveryCost;

  return (
    <ul className={css.delyverySelectList}>
      {options.map((option) => (
        <li key={option.value} className={`${css.deliveryItem} ${selectedMethod === option.value ? css.isActive : ''}`}>
          <label className={css.label} key={option.value}>
            <input
              className={css.radioInput}
              type="radio"
              name="deliveryType"
              value={option.value}
              checked={selectedMethod === option.value}
              onChange={() => handleSelect(option.value)}
            />
            <span className={css.customRadio}>
              {selectedMethod === option.value && <LiaCheckSolid className={css.checkActiveIcon} size={14} />}
            </span>
            <Box>
              <Flex className={css.titleWrapper}>
                <p className={css.methodTitle}>{option.title}</p>
                {totalPrice >= 300 ? (
                  <p>{option.price}</p>
                ) : (
                  <p>
                    {option.value === 'branch' || option.value === 'postomat'
                      ? `${pickupPointCost ?? 0} грн.`
                      : `${courierDeliveryCost ?? 0} грн.`}
                  </p>
                )}
              </Flex>
              <Flex className={css.descriptionWrqpper}>
                <span>{option.checkIcon}</span>
                <p className={css.description}>{option.infoText}</p>
              </Flex>
            </Box>
          </label>
        </li>
      ))}
    </ul>
  );
}
