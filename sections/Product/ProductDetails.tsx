import { ProductDetailsPage } from "apps/commerce/types.ts";
import ImageGallerySlider from "../../components/product/Gallery.tsx";
import ProductInfo from "../../components/product/ProductInfo.tsx";
import Breadcrumb from "../../components/ui/Breadcrumb.tsx";
import Section from "../../components/ui/Section.tsx";
import { clx } from "../../sdk/clx.ts";

export interface Props {
  /** @title Integration */
  page: ProductDetailsPage | null;
}

export default function ProductDetails({ page }: Props) {
  /**
   * Rendered when a not found is returned by any of the loaders run on this page
   */
  if (!page) {
    return (
      <div class="w-full flex justify-center items-center py-28">
        <div class="flex flex-col items-center justify-center gap-6">
          <span class="font-medium text-2xl">Página no encontrada</span>
          <a href="/" class="btn no-animation">
            Volver al inicio
          </a>
        </div>
      </div>
    );
  }

  const specBlacklist = new Set([
    "descriptionhtml",
    "cluster",
    "category",
    "refid",
  ]);
  const specs = page.product.additionalProperty
    ?.filter((prop) =>
      prop.name && prop.value && !specBlacklist.has(prop.name.toLowerCase())
    )
    .reduce((acc, prop) => {
      if (!acc.find((item) => item.name === prop.name)) {
        acc.push({ name: prop.name, value: prop.value });
      }
      return acc;
    }, [] as { name: string; value: string }[]);

  return (
    <div class="container flex flex-col gap-4 sm:gap-6 w-full py-6 sm:py-8 px-5 sm:px-0">
      <Breadcrumb itemListElement={page.breadcrumbList.itemListElement} />

      <div
        class={clx(
          "container grid",
          "grid-cols-1 gap-6 py-0",
          "lg:grid-cols-5 lg:gap-10",
        )}
      >
        <div class="lg:col-span-3">
          <ImageGallerySlider page={page} />
        </div>
        <div class="lg:col-span-2">
          <ProductInfo page={page} />
        </div>
      </div>

      {specs && specs.length > 0 && (
        <div class="rounded-3xl border border-base-300/20 bg-neutral-900/60 p-6">
          <h2 class="text-xl font-semibold text-base-100">Especificaciones</h2>
          <div class="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
            {specs.map((spec) => (
              <div key={spec.name} class="flex flex-col gap-1">
                <span class="text-xs uppercase tracking-[0.2em] text-base-400">
                  {spec.name}
                </span>
                <span class="text-base-100">{spec.value}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export const LoadingFallback = () => <Section.Placeholder height="635px" />;
