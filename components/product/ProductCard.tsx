import type { Product } from "apps/commerce/types.ts";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import Image from "apps/website/components/Image.tsx";
import Icon from "../ui/Icon.tsx";
import { clx } from "../../sdk/clx.ts";
import { formatPrice } from "../../sdk/format.ts";
import { relative } from "../../sdk/url.ts";
import { useOffer } from "../../sdk/useOffer.ts";
import { useSendEvent } from "../../sdk/useSendEvent.ts";
import WishlistButton from "../wishlist/WishlistButton.tsx";

interface Props {
  product: Product;
  /** Preload card image */
  preload?: boolean;
  /** @description used for analytics event */
  itemListName?: string;
  /** @description index of the product card in the list */
  index?: number;
  class?: string;
}

const WIDTH = 420;
const HEIGHT = 320;
const ASPECT_RATIO = `${WIDTH} / ${HEIGHT}`;

const propertyValue = (product: Product, keys: string[]) => {
  const lookup = new Set(keys.map((key) => key.toLowerCase()));
  return product.additionalProperty?.find((prop) =>
    prop.name && lookup.has(prop.name.toLowerCase())
  )?.value;
};

const statusBadge = (label: string) => {
  const lower = label.toLowerCase();
  if (lower.includes("sold")) {
    return "bg-error/20 text-error";
  }
  if (lower.includes("reserved")) {
    return "bg-warning/20 text-warning";
  }
  return "bg-success/20 text-success";
};

function ProductCard({
  product,
  preload,
  itemListName,
  index,
  class: _class,
}: Props) {
  const { url, image: images, offers, isVariantOf } = product;
  const title = isVariantOf?.name ?? product.name;
  const trim = propertyValue(product, ["trim", "version", "series"]);
  const [front, back] = images ?? [];

  const { listPrice, price, availability } = useOffer(offers);
  const relativeUrl = relative(url) ?? "#";
  const inStock = availability === "https://schema.org/InStock";
  const badge = propertyValue(product, ["badge", "certified", "tag"]);
  const status = propertyValue(product, [
    "stock_status",
    "status",
    "availability",
  ]) ?? (inStock ? "Available" : "Reserved");

  const year = propertyValue(product, ["year", "model_year"]);
  const mileage = propertyValue(product, [
    "mileage",
    "odometer",
    "km",
    "miles",
  ]);
  const transmission = propertyValue(product, ["transmission", "gearbox"]);
  const fuel = propertyValue(product, ["fuel", "fuel_type"]);
  const location = propertyValue(product, ["location", "store", "dealer"]);

  const specs = [year, mileage, transmission, fuel].filter(Boolean).join(" • ");
  const priceLabel = price
    ? formatPrice(price, offers?.priceCurrency)
    : "Consultar precio";

  const item = mapProductToAnalyticsItem({ product, price, listPrice, index });

  const event = useSendEvent({
    on: "click",
    event: {
      name: "select_item" as const,
      params: {
        item_list_name: itemListName,
        items: [item],
      },
    },
  });

  return (
    <article
      {...event}
      class={clx(
        "group flex h-full flex-col overflow-hidden rounded-3xl border border-base-300/20 bg-neutral-900/70",
        _class,
      )}
    >
      <figure
        class={clx("relative", !inStock && "opacity-80")}
        style={{ aspectRatio: ASPECT_RATIO }}
      >
        <a
          href={relativeUrl}
          aria-label="ver vehículo"
          class="absolute inset-0 grid grid-cols-1 grid-rows-1"
        >
          <Image
            src={front?.url ?? ""}
            alt={front?.alternateName ?? title}
            width={WIDTH}
            height={HEIGHT}
            style={{ aspectRatio: ASPECT_RATIO }}
            class="object-cover rounded-3xl col-span-full row-span-full"
            sizes="(max-width: 640px) 90vw, 33vw"
            preload={preload}
            loading={preload ? "eager" : "lazy"}
            decoding="async"
          />
          <Image
            src={back?.url ?? front?.url ?? ""}
            alt={back?.alternateName ?? front?.alternateName ?? title}
            width={WIDTH}
            height={HEIGHT}
            style={{ aspectRatio: ASPECT_RATIO }}
            class="object-cover rounded-3xl col-span-full row-span-full transition-opacity opacity-0 lg:group-hover:opacity-100"
            sizes="(max-width: 640px) 90vw, 33vw"
            loading="lazy"
            decoding="async"
          />
        </a>

        <div class="absolute top-4 left-4 flex flex-col gap-2">
          {status && (
            <span
              class={clx(
                "text-xs font-semibold uppercase tracking-[0.2em] px-3 py-1 rounded-full",
                statusBadge(status),
              )}
            >
              {status}
            </span>
          )}
          {badge && (
            <span class="text-xs font-semibold uppercase tracking-[0.2em] px-3 py-1 rounded-full bg-base-100/90 text-neutral-900">
              {badge}
            </span>
          )}
        </div>

        <div class="absolute bottom-4 right-4">
          <WishlistButton item={item} variant="icon" />
        </div>
      </figure>

      <div class="flex flex-1 flex-col gap-3 p-5">
        <div class="flex items-start justify-between gap-4">
          <div>
            <span class="text-lg font-semibold text-base-100">{title}</span>
            {trim && (
              <div class="text-xs uppercase tracking-[0.2em] text-base-400">
                {trim}
              </div>
            )}
          </div>
          <div class="text-lg font-semibold text-base-100">
            {priceLabel}
          </div>
        </div>
        {specs && (
          <div class="text-xs text-base-300">
            {specs}
          </div>
        )}
        <div class="mt-auto flex items-center justify-between text-xs text-base-400">
          <span>{location ?? ""}</span>
          <span class="inline-flex items-center gap-1">
            Ver detalles
            <Icon id="chevron-right" size={16} />
          </span>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;
