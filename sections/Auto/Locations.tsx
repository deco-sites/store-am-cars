import { type ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";

export interface Location {
  name: string;
  address: string;
  phone: string;
  hours: string;
  image?: ImageWidget;
  href?: string;
}

export interface Props {
  title?: string;
  subtitle?: string;
  locations?: Location[];
}

function Locations({
  title = "Visita nuestras ubicaciones",
  subtitle = "Tres showrooms con atención personalizada.",
  locations = [
    {
      name: "Showroom centro",
      address: "101 Market Street, Suite 200",
      phone: "(555) 201-9980",
      hours: "Lun-Sáb 9:00-19:00",
      href: "/locations/downtown",
      image:
        "https://images.unsplash.com/photo-1493238792000-8113da705763?auto=format&fit=crop&w=1400&q=80",
    },
    {
      name: "Estudio oeste",
      address: "875 Harbor Drive",
      phone: "(555) 443-1102",
      hours: "Lun-Vie 10:00-18:00",
      href: "/locations/westside",
      image:
        "https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=1400&q=80",
    },
    {
      name: "Campus norte",
      address: "455 Evergreen Blvd",
      phone: "(555) 882-3311",
      hours: "Todos los días 9:00-20:00",
      href: "/locations/north",
      image:
        "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1400&q=80",
    },
  ],
}: Props) {
  return (
    <section class="bg-neutral-950 text-base-100">
      <div class="container flex flex-col gap-8 py-16 lg:py-24">
        <div class="flex flex-col gap-3">
          <span class="text-xs uppercase tracking-[0.3em] text-base-400">
            {subtitle}
          </span>
          <h2 class="text-3xl sm:text-4xl font-semibold">{title}</h2>
        </div>
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {locations.map((location) => (
            <a
              key={location.name}
              href={location.href}
              class="group flex flex-col overflow-hidden rounded-3xl border border-base-300/20 bg-neutral-900/70"
            >
              {location.image && (
                <Image
                  src={location.image}
                  alt={location.name}
                  width={1000}
                  height={600}
                  class="h-48 w-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
              )}
              <div class="flex flex-col gap-3 p-6">
                <h3 class="text-lg font-semibold">{location.name}</h3>
                <div class="text-sm text-base-300">
                  <p>{location.address}</p>
                  <p>{location.phone}</p>
                  <p>{location.hours}</p>
                </div>
                <span class="text-xs uppercase tracking-[0.2em] text-base-400">
                  Ver detalles
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Locations;
