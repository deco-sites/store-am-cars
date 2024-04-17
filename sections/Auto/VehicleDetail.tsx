import { type HTMLWidget, type ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import Section from "../../components/ui/Section.tsx";
import Icon from "../../components/ui/Icon.tsx";

export interface Spec {
  label: string;
  value: string;
}

export interface Highlight {
  title: string;
  description: string;
}

export interface CTA {
  label: string;
  href: string;
  variant?: "primary" | "secondary";
}

export interface Props {
  title: string;
  subtitle?: string;
  price: string;
  monthly?: string;
  location?: string;
  mileage?: string;
  year?: string;
  description?: HTMLWidget;
  images: ImageWidget[];
  specs?: Spec[];
  highlights?: Highlight[];
  ctas?: CTA[];
}

function VehicleDetail({
  title = "2023 Mercedes-Benz GLE 450",
  subtitle = "AMG Line, 4MATIC",
  price = "86.750 €",
  monthly = "1.120 €/mes",
  location = "Showroom centro",
  mileage = "10.000 km",
  year = "2023",
  description =
    "Un SUV premium con tecnología avanzada, materiales de lujo y una conducción pensada para el confort diario.",
  images = [
    "https://images.unsplash.com/photo-1493238792000-8113da705763?auto=format&fit=crop&w=1400&q=80",
    "https://images.unsplash.com/photo-1494905998402-395d579af36f?auto=format&fit=crop&w=1400&q=80",
    "https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=1400&q=80",
    "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1400&q=80",
  ],
  specs = [
    { label: "Engine", value: "3.0L Turbo" },
    { label: "Horsepower", value: "375 hp" },
    { label: "Drivetrain", value: "AWD" },
    { label: "Exterior", value: "Obsidian Black" },
    { label: "Interior", value: "Nappa leather" },
    { label: "VIN", value: "W1N0G8EB6PF" },
  ],
  highlights = [
    {
      title: "Inspección certificada",
      description: "Inspección multipunto con reacondicionamiento incluido.",
    },
    {
      title: "Garantía",
      description: "Cobertura ampliada y planes de servicio opcionales.",
    },
    {
      title: "Entrega flexible",
      description: "Entrega a domicilio o en showroom en pocos días.",
    },
  ],
  ctas = [
    { label: "Reservar prueba", href: "/test-drive", variant: "primary" },
    { label: "Financiación", href: "/finance", variant: "secondary" },
  ],
}: Props) {
  const [primary, ...rest] = images;

  return (
    <section class="bg-neutral-950 text-base-100">
      <Section.Container>
        <div class="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-10">
          <div class="flex flex-col gap-4">
            <div class="grid grid-cols-2 gap-3">
              <div class="col-span-2 overflow-hidden rounded-3xl border border-base-300/20">
                <Image
                  src={primary}
                  alt={title}
                  width={1200}
                  height={800}
                  class="h-[320px] w-full object-cover sm:h-[420px]"
                />
              </div>
              {rest.map((image, index) => (
                <div
                  key={`${title}-thumb-${index}`}
                  class="overflow-hidden rounded-2xl border border-base-300/20"
                >
                  <Image
                    src={image}
                    alt={`${title} interior ${index + 1}`}
                    width={600}
                    height={450}
                    class="h-40 w-full object-cover sm:h-52"
                  />
                </div>
              ))}
            </div>

            <div class="rounded-3xl border border-base-300/20 bg-neutral-900/60 p-6">
              <h3 class="text-lg font-semibold">Resumen del vehículo</h3>
              <div
                class="mt-4 text-sm text-base-300"
                dangerouslySetInnerHTML={{ __html: description }}
              />
              <div class="mt-6 grid grid-cols-2 gap-4 text-sm">
                {specs?.map((spec) => (
                  <div key={spec.label} class="flex flex-col gap-1">
                    <span class="text-xs uppercase tracking-[0.2em] text-base-400">
                      {spec.label}
                    </span>
                    <span class="text-base-100">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div class="flex flex-col gap-6">
            <div class="rounded-3xl border border-base-300/20 bg-neutral-900/70 p-6 lg:sticky lg:top-24">
              <div class="flex flex-col gap-4">
                <span class="text-xs uppercase tracking-[0.3em] text-base-400">
                  {subtitle}
                </span>
                <h1 class="text-3xl sm:text-4xl font-semibold">{title}</h1>
                <div class="flex items-baseline gap-3">
                  <span class="text-2xl font-semibold">{price}</span>
                  {monthly && (
                    <span class="text-sm text-base-300">{monthly}</span>
                  )}
                </div>
                <div class="flex flex-wrap gap-3 text-sm text-base-300">
                  {year && <span>{year}</span>}
                  {mileage && <span>{mileage}</span>}
                  {location && <span>{location}</span>}
                </div>

                <div class="flex flex-col gap-3">
                  {ctas.map((cta) => (
                    <a
                      key={cta.label}
                      href={cta.href}
                      class={`btn no-animation ${
                        cta.variant === "secondary"
                          ? "btn-outline"
                          : "btn-primary"
                      }`}
                    >
                      {cta.label}
                    </a>
                  ))}
                  <button
                    type="button"
                    class="btn btn-ghost no-animation gap-2"
                  >
                    <Icon id="favorite" />
                    Guardar en Mi Garaje
                  </button>
                </div>
              </div>
            </div>

            <div class="grid gap-4">
              {highlights?.map((highlight) => (
                <div
                  key={highlight.title}
                  class="rounded-2xl border border-base-300/20 bg-neutral-900/60 p-5"
                >
                  <h4 class="font-semibold">{highlight.title}</h4>
                  <p class="mt-2 text-sm text-base-300">
                    {highlight.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section.Container>
    </section>
  );
}

export default VehicleDetail;
