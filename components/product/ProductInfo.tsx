import { ProductDetailsPage } from "apps/commerce/types.ts";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import { clx } from "../../sdk/clx.ts";
import { formatPrice } from "../../sdk/format.ts";
import { useOffer } from "../../sdk/useOffer.ts";
import { useSendEvent } from "../../sdk/useSendEvent.ts";
import WishlistButton from "../wishlist/WishlistButton.tsx";

interface Props {
  page: ProductDetailsPage | null;
}

const propertyValue = (
  product: ProductDetailsPage["product"],
  keys: string[],
) => {
  const lookup = new Set(keys.map((key) => key.toLowerCase()));
  return product.additionalProperty?.find((prop) =>
    prop.name && lookup.has(prop.name.toLowerCase())
  )?.value;
};

function ProductInfo({ page }: Props) {
  if (page === null) {
    throw new Error("Missing Product Details Page Info");
  }

  const { breadcrumbList, product } = page;
  const { productID, offers, isVariantOf, sku } = product;
  const description = product.description || isVariantOf?.description;
  const title = isVariantOf?.name ?? product.name;

  const {
    price = 0,
    listPrice,
    availability,
  } = useOffer(offers);

  const status = propertyValue(product, [
    "stock_status",
    "status",
    "availability",
  ]) ??
    (availability === "https://schema.org/InStock"
      ? "Disponible"
      : "Reservado");

  const year = propertyValue(product, ["year", "model_year"]);
  const mileage = propertyValue(product, [
    "mileage",
    "odometer",
    "km",
    "miles",
  ]);
  const location = propertyValue(product, ["location", "store", "dealer"]);
  const vin = propertyValue(product, ["vin", "chassis"]) ?? sku;
  const whatsapp = propertyValue(product, ["whatsapp", "phone", "contact"]);

  const breadcrumb = {
    ...breadcrumbList,
    itemListElement: breadcrumbList?.itemListElement.slice(0, -1),
    numberOfItems: breadcrumbList.numberOfItems - 1,
  };

  const item = mapProductToAnalyticsItem({
    product,
    breadcrumbList: breadcrumb,
    price,
    listPrice,
  });

  const viewItemEvent = useSendEvent({
    on: "view",
    event: {
      name: "view_item",
      params: {
        item_list_id: "vehicle",
        item_list_name: "Vehicle",
        items: [item],
      },
    },
  });

  const whatsappMessage = vin
    ? `Estoy interesado/a en ${title} (VIN ${vin}).`
    : `Estoy interesado/a en ${title}.`;
  const whatsappHref = whatsapp
    ? `https://api.whatsapp.com/send/?phone=${whatsapp}&text=${
      encodeURIComponent(whatsappMessage)
    }`
    : null;

  return (
    <div {...viewItemEvent} class="flex flex-col gap-6">
      <span
        class={clx(
          "text-xs uppercase tracking-[0.3em] font-semibold",
          "rounded-full px-3 py-1 w-fit",
          status.toLowerCase().includes("sold")
            ? "bg-error/20 text-error"
            : status.toLowerCase().includes("reserved")
            ? "bg-warning/20 text-warning"
            : "bg-success/20 text-success",
        )}
      >
        {status}
      </span>

      <div>
        <span class="text-3xl sm:text-4xl font-semibold text-base-100">
          {title}
        </span>
        {vin && (
          <div class="text-xs text-base-400 uppercase tracking-[0.2em] mt-2">
            VIN {vin}
          </div>
        )}
      </div>

      <div class="flex items-baseline gap-3">
        <span class="text-3xl font-semibold text-base-100">
          {formatPrice(price, offers?.priceCurrency) ?? "Consultar precio"}
        </span>
        {listPrice && (
          <span class="line-through text-sm font-medium text-base-400">
            {formatPrice(listPrice, offers?.priceCurrency)}
          </span>
        )}
      </div>

      <div class="flex flex-wrap gap-3 text-xs text-base-300">
        {year && (
          <span class="rounded-full border border-base-300/40 px-3 py-1">
            {year}
          </span>
        )}
        {mileage && (
          <span class="rounded-full border border-base-300/40 px-3 py-1">
            {mileage}
          </span>
        )}
        {location && (
          <span class="rounded-full border border-base-300/40 px-3 py-1">
            {location}
          </span>
        )}
      </div>

      <div class="flex flex-col gap-3">
        <a href="/test-drive" class="btn btn-primary no-animation">
          Reservar prueba
        </a>
        <a href="/finance" class="btn btn-outline no-animation">
          Financiación
        </a>
        {whatsappHref && (
          <a href={whatsappHref} class="btn btn-ghost no-animation">
            WhatsApp sobre este vehículo
          </a>
        )}
        <WishlistButton item={item} />
      </div>

      {productID && description && (
        <div class="text-sm text-base-300">
          <details>
            <summary class="cursor-pointer text-base-100">
              Resumen del vehículo
            </summary>
            <div
              class="ml-2 mt-2"
              dangerouslySetInnerHTML={{ __html: description }}
            />
          </details>
        </div>
      )}
    </div>
  );
}

export default ProductInfo;
