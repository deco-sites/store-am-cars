import { type HTMLWidget, type ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import { useId } from "../../sdk/useId.ts";

export interface Props {
  title: HTMLWidget;
  subtitle?: string;
  image?: ImageWidget;
  benefits?: string[];
  ctaLabel?: string;
  disclaimer?: string;
}

function LeadLanding({
  title = "Reserva una prueba privada",
  subtitle =
    "Cuéntanos qué buscas y un asesor confirmará tu cita en menos de 24 horas.",
  image =
    "https://images.unsplash.com/photo-1493238792000-8113da705763?auto=format&fit=crop&w=1400&q=80",
  benefits = [
    "Horarios flexibles y entrega a domicilio",
    "Presentación personalizada del vehículo",
    "Opciones de preaprobación de financiación",
  ],
  ctaLabel = "Solicitar cita",
  disclaimer =
    "Al enviar, aceptas que nuestro equipo te contacte con la información proporcionada.",
}: Props) {
  const id = useId();

  return (
    <section class="bg-neutral-950 text-base-100">
      <div class="container grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-10 py-16 lg:py-24">
        <div class="flex flex-col gap-6">
          <div
            class="text-4xl sm:text-5xl font-semibold leading-tight"
            dangerouslySetInnerHTML={{ __html: title }}
          />
          {subtitle && <p class="text-base text-base-300">{subtitle}</p>}

          <ul class="grid gap-3 text-sm text-base-300">
            {benefits.map((benefit) => (
              <li key={benefit} class="flex items-start gap-3">
                <span class="mt-1 h-2 w-2 rounded-full bg-primary" />
                <span>{benefit}</span>
              </li>
            ))}
          </ul>

          <div class="overflow-hidden rounded-3xl border border-base-300/20">
            <Image
              src={image}
              alt="Experiencia de prueba"
              width={1200}
              height={800}
              class="h-72 w-full object-cover sm:h-96"
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>

        <div class="rounded-3xl border border-base-300/20 bg-neutral-900/70 p-6">
          <form class="grid gap-4" aria-labelledby={`${id}-title`}>
            <h2 id={`${id}-title`} class="text-2xl font-semibold">
              Iniciar solicitud
            </h2>
            <div class="grid gap-4 sm:grid-cols-2">
              <label class="flex flex-col gap-2 text-sm">
                Nombre completo
                <input
                  class="input input-bordered bg-neutral-950/70 text-base-100"
                  type="text"
                  name="name"
                  placeholder="Nombre y apellidos"
                />
              </label>
              <label class="flex flex-col gap-2 text-sm">
                Correo electrónico
                <input
                  class="input input-bordered bg-neutral-950/70 text-base-100"
                  type="email"
                  name="email"
                  placeholder="tu@email.com"
                />
              </label>
            </div>
            <div class="grid gap-4 sm:grid-cols-2">
              <label class="flex flex-col gap-2 text-sm">
                Teléfono
                <input
                  class="input input-bordered bg-neutral-950/70 text-base-100"
                  type="tel"
                  name="phone"
                  placeholder="Tu teléfono"
                />
              </label>
              <label class="flex flex-col gap-2 text-sm">
                Ubicación preferida
                <select class="select select-bordered bg-neutral-950/70 text-base-100">
                  <option>Showroom centro</option>
                  <option>Estudio oeste</option>
                  <option>Campus norte</option>
                </select>
              </label>
            </div>
            <label class="flex flex-col gap-2 text-sm">
              Vehículo de interés
              <input
                class="input input-bordered bg-neutral-950/70 text-base-100"
                type="text"
                name="vehicle"
                placeholder="2023 Mercedes-Benz GLE"
              />
            </label>
            <label class="flex flex-col gap-2 text-sm">
              Comentarios
              <textarea
                class="textarea textarea-bordered bg-neutral-950/70 text-base-100"
                name="message"
                placeholder="Comparte horarios, detalles del vehículo o dudas de financiación."
              />
            </label>
            <button type="submit" class="btn btn-primary no-animation">
              {ctaLabel}
            </button>
            {disclaimer && <p class="text-xs text-base-400">{disclaimer}</p>}
          </form>
        </div>
      </div>
    </section>
  );
}

export default LeadLanding;
