import { type ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import Section from "../../components/ui/Section.tsx";
import Icon from "../../components/ui/Icon.tsx";

export interface VehicleSpec {
  label: string;
  value: string;
}

export interface Vehicle {
  id?: string;
  name: string;
  trim?: string;
  price: string;
  year: string;
  mileage: string;
  transmission?: string;
  fuel?: string;
  location?: string;
  badge?: string;
  image: ImageWidget;
  href: string;
}

export interface FilterGroup {
  label: string;
  options: string[];
}

export interface Props {
  title?: string;
  subtitle?: string;
  filters?: FilterGroup[];
  vehicles?: Vehicle[];
}

function FilterGroup({ label, options }: FilterGroup) {
  return (
    <div class="flex flex-col gap-3">
      <span class="text-xs uppercase tracking-[0.2em] text-base-400">
        {label}
      </span>
      <div class="flex flex-wrap gap-2">
        {options.map((option) => (
          <button
            key={option}
            type="button"
            class="rounded-full border border-base-300/50 px-3 py-1 text-xs text-base-200 hover:border-base-100/60"
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}

function VehicleCard({ vehicle }: { vehicle: Vehicle }) {
  return (
    <a
      href={vehicle.href}
      class="group flex h-full flex-col overflow-hidden rounded-3xl border border-base-300/20 bg-neutral-900/70 transition hover:border-base-100/40"
    >
      <div class="relative">
        <Image
          src={vehicle.image}
          alt={vehicle.name}
          width={720}
          height={480}
          class="h-56 w-full object-cover sm:h-64"
          loading="lazy"
          decoding="async"
        />
        {vehicle.badge && (
          <span class="absolute left-4 top-4 rounded-full bg-base-100/90 px-3 py-1 text-xs font-semibold text-neutral-900">
            {vehicle.badge}
          </span>
        )}
        <button
          type="button"
          aria-label="Guardar vehículo"
          class="absolute right-4 top-4 rounded-full border border-base-100/20 bg-neutral-950/70 p-2 text-base-100 opacity-0 transition group-hover:opacity-100"
        >
          <Icon id="favorite" size={18} />
        </button>
      </div>
      <div class="flex flex-1 flex-col gap-4 p-5">
        <div class="flex items-start justify-between gap-4">
          <div>
            <div class="text-lg font-semibold text-base-100">
              {vehicle.name}
            </div>
            {vehicle.trim && (
              <div class="text-xs uppercase tracking-[0.2em] text-base-300">
                {vehicle.trim}
              </div>
            )}
          </div>
          <div class="text-lg font-semibold text-base-100">
            {vehicle.price}
          </div>
        </div>
        <div class="flex flex-wrap gap-3 text-xs text-base-300">
          <span>{vehicle.year}</span>
          <span>{vehicle.mileage}</span>
          {vehicle.transmission && <span>{vehicle.transmission}</span>}
          {vehicle.fuel && <span>{vehicle.fuel}</span>}
        </div>
        <div class="mt-auto flex items-center justify-between text-xs text-base-300">
          <span>{vehicle.location}</span>
          <span class="inline-flex items-center gap-1">
            Ver detalles
            <Icon id="chevron-right" size={16} />
          </span>
        </div>
      </div>
    </a>
  );
}

function Inventory({
  title = "Inventario",
  subtitle =
    "Explora vehículos certificados listos para entrega rápida y financiación flexible.",
  filters = [
    { label: "Marca", options: ["BMW", "Audi", "Mercedes", "Porsche"] },
    { label: "Carrocería", options: ["SUV", "Berlina", "Coupé", "Cabrio"] },
    { label: "Precio", options: ["<30k€", "30-60k€", "60-90k€", "90k€+"] },
  ],
  vehicles = [
    {
      name: "2022 BMW X5 M",
      trim: "Competition",
      price: "98.400 €",
      year: "2022",
      mileage: "18.200 km",
      transmission: "Automático",
      fuel: "Híbrido",
      location: "Showroom centro",
      badge: "Certificado",
      href: "/vehicle/2022-bmw-x5-m",
      image:
        "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1400&q=80",
    },
    {
      name: "2021 Audi RS7",
      trim: "Sportback",
      price: "112.900 €",
      year: "2021",
      mileage: "12.450 km",
      transmission: "Automático",
      fuel: "Gasolina",
      location: "Estudio oeste",
      badge: "Pocos km",
      href: "/vehicle/2021-audi-rs7",
      image:
        "https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=1400&q=80",
    },
    {
      name: "2023 Mercedes-Benz GLE",
      trim: "AMG Line",
      price: "86.750 €",
      year: "2023",
      mileage: "6.300 km",
      transmission: "Automático",
      fuel: "Gasolina",
      location: "Campus norte",
      badge: "Nueva entrada",
      href: "/vehicle/2023-mercedes-gle",
      image:
        "https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=1400&q=80",
    },
    {
      name: "2020 Porsche 911",
      trim: "Carrera S",
      price: "134.500 €",
      year: "2020",
      mileage: "9.800 km",
      transmission: "Automático",
      fuel: "Gasolina",
      location: "Showroom centro",
      badge: "Rendimiento",
      href: "/vehicle/2020-porsche-911",
      image:
        "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=1400&q=80",
    },
  ],
}: Props) {
  return (
    <section class="bg-neutral-950">
      <Section.Container class="text-base-100">
        <div class="flex flex-col gap-4">
          <span class="text-xs uppercase tracking-[0.3em] text-base-400">
            {subtitle}
          </span>
          <div class="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div class="flex flex-col gap-2">
              <h2 class="text-3xl sm:text-4xl font-semibold text-base-100">
                {title}
              </h2>
              <p class="text-base text-base-300 max-w-xl">
                Inventario curado con informes verificados y tarifas
                transparentes.
              </p>
            </div>
            <div class="flex items-center gap-3">
              <input
                type="text"
                placeholder="Buscar marca, modelo, versión"
                class="input input-bordered bg-neutral-900 text-base-100 placeholder:text-base-400"
              />
              <select class="select select-bordered bg-neutral-900 text-base-100">
                <option>Ordenar por</option>
                <option>Precio: menor a mayor</option>
                <option>Precio: mayor a menor</option>
                <option>Novedades</option>
              </select>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-10">
          <aside class="hidden lg:flex flex-col gap-8 rounded-3xl border border-base-300/20 bg-neutral-900/60 p-6">
            {filters.map((filter) => (
              <FilterGroup key={filter.label} {...filter} />
            ))}
            <button class="btn btn-outline btn-sm">Restablecer filtros</button>
          </aside>

          <div class="flex flex-col gap-6">
            <div class="flex gap-2 overflow-x-auto lg:hidden">
              {filters.map((filter) => (
                <button
                  key={filter.label}
                  class="rounded-full border border-base-300/50 px-4 py-2 text-xs text-base-200"
                >
                  {filter.label}
                </button>
              ))}
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {vehicles.map((vehicle) => (
                <VehicleCard key={vehicle.name} vehicle={vehicle} />
              ))}
            </div>
          </div>
        </div>
      </Section.Container>
    </section>
  );
}

export default Inventory;
