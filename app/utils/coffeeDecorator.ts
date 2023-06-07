function coffeeToDB(coffee) {
  return {
    fetchedAtTime: coffee.fetchedAtTime,
    roasterId: coffee.roaster?.id,
    detailPageURI: coffee.click_url,
    coffeeName: coffee.name,
    coffeeImageURI: coffee.default_image.url,
    coffeeWeight: coffee.bean_weight?.value,
    flavors: coffee.properties.filter(property => property.key.includes("flavor_wheel")).map(property => property.value) || [],
    tradeDescription: coffee.description,
    shortDescription: coffee.properties.find(property => property.key === 'coffee_description_short')?.value,
    process: coffee.properties.find(property => property.key === 'coffee_processing_method')?.value,
    subRegion: coffee.properties.find(property => property.key === 'coffee_sub_region')?.value,
    elevationHi: parseInt(coffee.properties.find(property => property.key === 'coffee_elevation_hi')?.value?.replace(/,/g, '')) || undefined,
    elevationLow: parseInt(coffee.properties.find(property => property.key === 'coffee_elevation_lo')?.value?.replace(/,/g, '')) || undefined,
    starRating: parseInt(coffee.properties.find(property => property.key === 'coffee_star_rating')?.value) || undefined,
    bodyLevel: parseInt(coffee.properties.find(property => property.key === 'coffee_body_level')?.value) || undefined,
    acidityLevel: parseInt(coffee.properties.find(property => property.key === 'coffee_acidity_level')?.value) || undefined,
    roastLevel: parseInt(coffee.properties.find(property => property.key === 'roast_level_description')?.value) || undefined,
    roasterDescription: coffee.properties.find(property => property.key === 'coffee_description_roaster')?.value,
    queueable: coffee.queueable,
    varietal: coffee.properties.find(property => property.key === 'coffee_plant_varietal')?.value?.split(',').map((varietal: string) => varietal.trim()) || [],
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
  return {
    name: roaster.name,
    imageURI: roaster.default_image.url || `https://${roaster.content.logo_black?.file?.url}`,
    location: roaster.content.city,
    roasterURI: `https://drinktrade.com${roaster.click_url}`
  };
}

export {
  coffeeToDB,
  weightPricesToDB,
  roasterToDB,
}
