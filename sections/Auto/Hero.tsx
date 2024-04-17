import { type HTMLWidget, type ImageWidget } from "apps/admin/widgets.ts";
import { Picture, Source } from "apps/website/components/Picture.tsx";

export interface CTA {
  label: string;
  href: string;
  variant?: "primary" | "secondary";
}

export interface Stat {
  label: string;
  value: string;
}

export interface Props {
  eyebrow?: string;
  title: HTMLWidget;
  subtitle?: string;
  image: {
    desktop: ImageWidget;
    mobile: ImageWidget;
    alt?: string;
  };
  ctas?: CTA[];
  stats?: Stat[];
}

const CTA_STYLES: Record<NonNullable<CTA["variant"]>, string> = {
  primary:
    "bg-primary text-primary-content hover:bg-primary/90 border border-transparent",
  secondary:
    "bg-transparent text-base-100 border border-base-100/30 hover:border-base-100/60",
};

function AutoHero({
  eyebrow = "Confianza en cada kilómetro",
  title = "Inventario premium con precios transparentes",
  subtitle =
    "Descubre vehículos certificados, opciones de financiación y una experiencia de compra de alto nivel.",
  image,
  ctas = [
    { label: "Ver inventario", href: "/inventory", variant: "primary" },
    { label: "Reservar prueba", href: "/test-drive", variant: "secondary" },
  ],
  stats = [
    { label: "Vehículos disponibles", value: "120+" },
    { label: "Aprobación media", value: "24h" },
    { label: "Valoración", value: "4.9/5" },
  ],
}: Props) {
  return (
    <section class="relative overflow-hidden bg-neutral-950 text-base-100">
      <div class="absolute inset-0">
        <div class="absolute -top-36 right-0 h-72 w-72 rounded-full bg-primary/20 blur-3xl" />
        <div class="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-secondary/20 blur-3xl" />
        <div class="absolute inset-0 bg-gradient-to-br from-neutral-950 via-neutral-900/80 to-neutral-950" />
      </div>

      <div class="container relative grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-10 py-16 lg:py-24">
        <div class="flex flex-col gap-6">
          <span class="text-xs uppercase tracking-[0.4em] text-base-300">
            {eyebrow}
          </span>
          <div
            class="text-4xl sm:text-5xl lg:text-6xl font-semibold leading-[1.05]"
            dangerouslySetInnerHTML={{ __html: title }}
          />
          {subtitle && (
            <p class="text-base sm:text-lg text-base-300 max-w-xl">
              {subtitle}
            </p>
          )}
          <div class="flex flex-wrap gap-3">
            {ctas.map((cta) => (
              <a
                key={cta.href}
                href={cta.href}
                class={`inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition ${
                  CTA_STYLES[cta.variant ?? "primary"]
                }`}
              >
                {cta.label}
              </a>
            ))}
          </div>
          <div class="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-6">
            {stats.map((stat) => (
              <div
                key={stat.label}
                class="rounded-2xl border border-base-100/10 bg-base-100/5 px-4 py-3"
              >
                <div class="text-xl font-semibold">{stat.value}</div>
                <div class="text-xs text-base-300 uppercase tracking-[0.2em]">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div class="relative">
          <div class="absolute -inset-6 rounded-[2rem] border border-base-100/10" />
          <div class="relative overflow-hidden rounded-[2rem] border border-base-100/10 bg-neutral-900/60">
            <Picture>
              <Source
                media="(max-width: 767px)"
                src={image.mobile}
                width={640}
                height={520}
              />
              <Source
                media="(min-width: 768px)"
                src={image.desktop}
                width={920}
                height={720}
              />
              <img
                src={image.desktop}
                alt={image.alt ?? "Featured vehicle"}
                class="h-full w-full object-cover"
                loading="lazy"
                decoding="async"
              />
            </Picture>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AutoHero;
