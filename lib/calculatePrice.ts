import BigNumber from 'bignumber.js'
import { ParsedUrlQuery } from 'querystring'
import { products } from './products'

export default function calculatePrice(query: ParsedUrlQuery): BigNumber {
  // console.log(`calculatePrice`)

  let amount = new BigNumber(0)
  for (let [id, quantity] of Object.entries(query)) {
    const product = products.find((p) => p.id === id)
    if (!product) continue

    const price = product.priceUsd // we just updated this from priceSol
    const productQuantity = new BigNumber(quantity as string)
    amount = amount.plus(productQuantity.multipliedBy(price))
  }

  return amount
}

// idea: round price to 2 decimals
export function applyDiscountCode(
  price: BigNumber,
  discount: BigNumber
): BigNumber {
  return price.multipliedBy(discount)
}

// idea: round price to 2 decimals
export function roundPrice(price: BigNumber, decimals: number): BigNumber {
  return price.decimalPlaces(decimals)
}

// idea: time based discount code
export function getDiscountCode(): string {
  const date = new Date()
  const day = date.getDate()
  const month = date.getMonth()
  const year = date.getFullYear()
  const code = `${day}-${month}-${year}`
  return code
}

// idea: time based discount calculation
export function getDiscount(): BigNumber {
  const date = new Date()
  const day = date.getDate()
  const month = date.getMonth()
  const year = date.getFullYear()
  const discount = new BigNumber(1 - day / 100)
  return discount
}

// idea: location based discount
export function getDiscountByLocation(): BigNumber {
  const discount = new BigNumber(0.9)
  return discount
}

// idea: calculate taxes
export function calculateTaxes(price: BigNumber, taxRate: number): BigNumber {
  const taxAmount = price.multipliedBy(taxRate)
  return price.plus(taxAmount)
}

// idea: A function to apply a surcharge to the total price:
export function applySurcharge(price: BigNumber, surcharge: number): BigNumber {
  const surchargeAmount = price.multipliedBy(surcharge)
  return price.plus(surchargeAmount)
}

// idea: A function to convert a price from one currency to another using an exchange rate:
export function convertPrice(
  price: BigNumber,
  exchangeRate: number
): BigNumber {
  return price.multipliedBy(exchangeRate)
}

// idea: A function to calculate the price of a subscription service based on the chosen plan and duration:
export function calculateSubscriptionPrice(
  pricePerMonth: BigNumber,
  planDurationMonths: number
): BigNumber {
  const totalDuration = new BigNumber(planDurationMonths)
  return pricePerMonth.multipliedBy(totalDuration)
}

// idea: A function to validate the format and contents of the query parameter before calculating the total price:
export function validateQuery(query: ParsedUrlQuery): boolean {
  const validKeys = products.map((product) => product.id)
  const queryKeys = Object.keys(query)
  return queryKeys.every((key) => validKeys.includes(key))
}

// idea: A function to apply a bulk discount to the total price if the customer is purchasing a large quantity of items:
export function applyBulkDiscount(
  price: BigNumber,
  quantity: number,
  discountThreshold: number,
  discountRate: number
): BigNumber {
  if (quantity >= discountThreshold) {
    const discountAmount = price.multipliedBy(discountRate)
    return price.minus(discountAmount)
  } else {
    return price
  }
}

// idea: A function to apply a dynamic pricing strategy that varies the price based on various factors, such as time of day, customer location, or stock levels:

export function applyDynamicPricing(
  price: BigNumber,
  timeOfDay: string,
  customerLocation: string,
  stockLevel: number
): BigNumber {
  // Apply price adjustments based on time of day
  if (timeOfDay === 'peak') {
    price = price.multipliedBy(1.2)
  } else if (timeOfDay === 'off-peak') {
    price = price.multipliedBy(0.8)
  }

  // Apply price adjustments based on customer location
  if (customerLocation === 'USA') {
    price = price.multipliedBy(1.1)
  } else if (customerLocation === 'Europe') {
    price = price.multipliedBy(1.2)
  } else if (customerLocation === 'Asia') {
    price = price.multipliedBy(1.3)
  }

  // Apply price adjustments based on stock level
  if (stockLevel === 0) {
    price = price.multipliedBy(1.5)
  } else if (stockLevel < 10) {
    price = price.multipliedBy(1.2)
  }

  return price
}

// Other Dynamic pricing example, Using a configuration object to specify the price adjustments:

/*
type PricingConfiguration = {
  timeOfDay: {
    peak: number,
    offPeak: number,
  },
  customerLocation: {
    USA: number,
    Europe: number,
    Asia: number,
  },
  stockLevel: {
    high: number,
    medium: number,
    low: number,
    outOfStock: number,
  },
}

export function applyDynamicPricing(price: BigNumber, config: PricingConfiguration): BigNumber {
  let adjustedPrice = price

  // Apply price adjustments based on time of day
  if (timeOfDay === 'peak') {
    adjustedPrice = adjustedPrice.multipliedBy(config.timeOfDay.peak)
  } else if (timeOfDay === 'off-peak') {
    adjustedPrice = adjustedPrice.multipliedBy(config.timeOfDay.offPeak)
  }

  // Apply price adjustments based on customer location
  if (customerLocation === 'USA') {
    adjustedPrice = adjustedPrice.multipliedBy(config.customerLocation.USA)
  } else if (customerLocation === 'Europe') {
    adjustedPrice = adjustedPrice.multipliedBy(config.customerLocation.Europe)
  } else if (customerLocation === 'Asia') {
    adjustedPrice = adjustedPrice.multipliedBy(config.customerLocation.Asia)
  }

  // Apply price adjustments based on stock level
  if (stockLevel === 'outOfStock') {
    adjustedPrice = adjustedPrice.multipliedBy(config.stockLevel.outOfStock)
  } else if (stockLevel === 'low') {
    adjustedPrice = adjustedPrice.multipliedBy(config.stockLevel.low)
  } else if (stockLevel === 'medium') {
    adjustedPrice = adjustedPrice.multipliedBy(config.stockLevel.medium)
  } else if (stockLevel === 'high') {
    adjustedPrice = adjustedPrice.multipliedBy(config.stockLevel.high)
  }

  return adjustedPrice
}


*/

/*

Using a callback function to dynamically generate the price adjustment factor:

type PriceAdjustmentCallback = (price: BigNumber) => number

export function applyDynamicPricing(price: BigNumber, callback: PriceAdjustmentCallback): BigNumber {
  const adjustmentFactor = callback(price)
  return price.multipliedBy(adjustmentFactor)
}

// Example callback function that returns a random adjustment factor between 0.8 and 1.2
function generateRandomAdjustmentFactor(price: BigNumber): number {
  const minFactor = 0.8
  const maxFactor = 1.2
  const range = maxFactor - minFactor
  const randomOffset = Math.random() * range
  return minFactor + randomOffset
}






*/

/*

// Using a set of rules to determine the price adjustment factor:

type PricingRule = {
  condition: (price: BigNumber) => boolean,
  adjustmentFactor: number,
}

export function applyDynamicPricing(price: BigNumber, rules: PricingRule[]): BigNumber {
  const matchingRule = rules.find((rule) => rule.condition(price))
  if (matchingRule) {
    const adjustmentFactor = matchingRule.adjustmentFactor
    return price.multipliedBy(adjustmentFactor)
  } else {
    return price
  }
}

// Example usage:
const rules = [
  {
    condition: (price) => price.greaterThan(100),
    adjustmentFactor: 0.9,
  },
  {
    condition: (price) => price.lessThanOrEqualTo(50),
    adjustmentFactor: 1.1,
  },
  {
    condition: (price) => price.isBetween(50, 100),
    adjustmentFactor: 1.05,
  },
]
const adjustedPrice = applyDynamicPricing(originalPrice, rules)



*/

/*

Using a factory function to create a customized version of the applyDynamicPricing function with a specific set of rules:
export type DynamicPricingConfig = {
  condition: (price: BigNumber) => boolean,
  adjustmentFactor: number,
}

export function createDynamicPricingFunction(config: DynamicPricingConfig[]): (price: BigNumber) => BigNumber {
  return function applyDynamicPricing(price: BigNumber): BigNumber {
    const matchingConfig = config.find((c) => c.condition(price))
    if (matchingConfig) {
      const adjustmentFactor = matchingConfig.adjustmentFactor
      return price.multipliedBy(adjustmentFactor)
    } else {
      return price
    }
  }
}

// Example usage:
const config = [
  {
    condition: (price) => price.greaterThan(100),
    adjustmentFactor: 0.9,
  },
  {
    condition: (price) => price.lessThanOrEqualTo(50),
    adjustmentFactor: 1.1,
  },
  {
    condition: (price) => price.isBetween(50, 100),
    adjustmentFactor: 1.05,
  },
]
const dynamicPricingFunction = createDynamicPricingFunction(config)
const adjustedPrice = dynamicPricingFunction(originalPrice)



*/
