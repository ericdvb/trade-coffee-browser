function getProperties(coffee, propertyKeys: Array<string> | string) {
  if (Array.isArray(propertyKeys)) {
    return propertyKeys.map(key => coffee.properties.find(property => property.key === key)?.value)
  }
  return coffee.properties.find(property => property.key === propertyKeys)?.value
}

function coffeeToDB(coffee) {
  return {
    fetchedAtTime: coffee.fetchedAtTime,
    roasterId: coffee.roaster?.id,
    detailPageURI: coffee.click_url,
    coffeeName: coffee.name,
    coffeeImageURI: coffee.default_image.url,
    coffeeWeight: coffee.bean_weight?.value,
    flavors: getProperties(coffee, ["flavor_wheel_primary", "flavor_wheel_secondary", "flavor_wheel_tertiary"]) || [],
    tradeDescription: coffee.description,
    shortDescription: getProperties(coffee, 'coffee_description_short'),
    process: getProperties(coffee, 'coffee_processing_method'),
    subRegion: getProperties(coffee, 'coffee_sub_region'),
    elevationHi: parseInt(getProperties(coffee, 'coffee_elevation_hi')?.replace(/,/g, '')) || undefined,
    elevationLow: parseInt(getProperties(coffee, 'coffee_elevation_lo')?.replace(/,/g, '')) || undefined,
    starRating: parseInt(getProperties(coffee, 'coffee_star_rating')) || undefined,
    bodyLevel: parseInt(getProperties(coffee, 'coffee_body_level')) || undefined,
    acidityLevel: parseInt(getProperties(coffee,'coffee_acidity_level')) || undefined,
    roastLevel: parseInt(getProperties(coffee, 'roast_level_description')) || undefined,
    roasterDescription: getProperties(coffee, 'coffee_description_roaster'),
    queueable: coffee.queueable,
    varietal: getProperties(coffee, 'coffee_plant_varietal')?.split(',').map((varietal: string) => varietal.trim()) || [],
    tasteGroup: JSON.stringify(coffee.taste_group),
    selectEligible: coffee.trade_select_eligible,
    premiumEligible: coffee.trade_select_premium_eligible,
    classicsEligible: coffee.trade_select_classics_eligible,
    price: JSON.stringify(coffee.variants.filter((variant: { grind_type: string }) => variant.grind_type === "whole").map(weightPricesToDB))
  }
}

function weightPricesToDB(variant) {
  return {
    weight: variant.bean_weight_label,
    price: variant.price_raw,
    priceDiscount: variant.subscription_pricing.price_quantity_1_raw,
    priceDiscountSpecial: variant.subscription_pricing.price_quantity_2_raw,
  };
}

function roasterToDB(roaster) {
  const roasterImageURI = roaster.default_image.url ||
    roaster.content.logo_black?.file?.url ||
    roaster.content.logoBlack?.file?.url ||
    roaster.content.logo_white?.file?.url ||
    roaster.content.logoWhite?.file?.url;
  return {
    name: roaster.name,
    imageURI: !roasterImageURI || roasterImageURI.match(/^https?:\/\//)?.length > 0
      ? roasterImageURI
      : `https://${roasterImageURI}`,
    location: roaster.content.city,
    roasterURI: `https://drinktrade.com${roaster.click_url}`
  };
}

export {
  coffeeToDB,
  weightPricesToDB,
  roasterToDB,
}
