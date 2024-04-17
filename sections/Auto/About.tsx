import { type HTMLWidget, type ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";

export interface Stat {
  label: string;
  value: string;
}

export interface Props {
  title: string;
  subtitle?: string;
  body: HTMLWidget;
  image?: ImageWidget;
  stats?: Stat[];
}

function About({
  title = "Construido sobre transparencia y confianza",
  subtitle = "Vehículos premium y servicio de alto nivel",
  body =
    "Seleccionamos inventario de fuentes confiables, respaldamos cada vehículo con informes detallados y ofrecemos una experiencia de compra sin fricciones desde el primer clic hasta la entrega.",
  image =
    "https://images.unsplash.com/photo-1494905998402-395d579af36f?auto=format&fit=crop&w=1400&q=80",
  stats = [
    { label: "Años de experiencia", value: "12" },
    { label: "Vehículos entregados", value: "6.400+" },
    { label: "Partners financieros", value: "18" },
  ],
}: Props) {
  return (
    <section class="bg-neutral-950 text-base-100">
      <div class="container grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-10 py-16 lg:py-24">
        <div class="flex flex-col gap-6">
          <span class="text-xs uppercase tracking-[0.3em] text-base-400">
            {subtitle}
          </span>
          <h2 class="text-3xl sm:text-4xl font-semibold">{title}</h2>
          <div
            class="text-base text-base-300"
            dangerouslySetInnerHTML={{
              __html: body,
            }}
          />
          <div class="grid grid-cols-3 gap-4 pt-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                class="rounded-2xl border border-base-300/20 bg-neutral-900/60 px-4 py-3"
              >
                <div class="text-xl font-semibold">{stat.value}</div>
                <div class="text-xs text-base-300 uppercase tracking-[0.2em]">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div class="overflow-hidden rounded-3xl border border-base-300/20">
          <Image
            src={image}
            alt={title}
            width={1200}
            height={900}
            class="h-full w-full object-cover"
            loading="lazy"
            decoding="async"
          />
        </div>
      </div>
    </section>
  );
}

export default About;
