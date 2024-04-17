import type { HTMLWidget, ImageWidget } from "apps/admin/widgets.ts";
import type { SiteNavigationElement } from "apps/commerce/types.ts";
import Image from "apps/website/components/Image.tsx";
import Alert from "../../components/header/Alert.tsx";
import Menu from "../../components/header/Menu.tsx";
import NavItem from "../../components/header/NavItem.tsx";
import Searchbar, {
  type SearchbarProps,
} from "../../components/search/Searchbar/Form.tsx";
import Drawer from "../../components/ui/Drawer.tsx";
import Icon from "../../components/ui/Icon.tsx";
import Modal from "../../components/ui/Modal.tsx";
import {
  HEADER_HEIGHT_DESKTOP,
  HEADER_HEIGHT_MOBILE,
  NAVBAR_HEIGHT_MOBILE,
  SEARCHBAR_DRAWER_ID,
  SEARCHBAR_POPUP_ID,
  SIDEMENU_CONTAINER_ID,
  SIDEMENU_DRAWER_ID,
} from "../../constants.ts";
import { useDevice } from "@deco/deco/hooks";
import { type LoadingFallbackProps } from "@deco/deco";

export interface Logo {
  src: ImageWidget;
  alt: string;
  width?: number;
  height?: number;
}

export interface HeaderAction {
  label: string;
  href: string;
}

export interface SectionProps {
  alerts?: HTMLWidget[];
  /**
   * @title Navigation items
   * @description Navigation items used both on mobile and desktop menus
   */
  navItems?: SiteNavigationElement[] | null;
  /**
   * @title Searchbar
   * @description Searchbar configuration
   */
  searchbar: SearchbarProps;
  /** @title Logo */
  logo: Logo;
  /**
   * @title Primary CTA
   * @description Main call-to-action button on the header
   */
  primaryCta?: HeaderAction;
  /**
   * @title Secondary CTA
   * @description Secondary action link on the header
   */
  secondaryCta?: HeaderAction;
  /**
   * @title Mi Garaje
   * @description Enlace a vehículos guardados
   */
  garage?: HeaderAction;
  /**
   * @description Usefull for lazy loading hidden elements, like hamburguer menus etc
   * @hide true */
  loading?: "eager" | "lazy";
}

type Props = Omit<SectionProps, "alert">;

const Desktop = ({
  navItems,
  logo,
  searchbar,
  loading,
  primaryCta,
  secondaryCta,
  garage,
}: Props) => (
  <>
    <Modal id={SEARCHBAR_POPUP_ID}>
      <div
        class="absolute top-0 bg-base-100 container"
        style={{ marginTop: HEADER_HEIGHT_MOBILE }}
      >
        {loading === "lazy"
          ? (
            <div class="flex justify-center items-center">
              <span class="loading loading-spinner" />
            </div>
          )
          : <Searchbar {...searchbar} />}
      </div>
    </Modal>

    <div class="flex flex-col gap-3 pt-5 container border-b border-base-300">
      <div class="flex items-center justify-between gap-6">
        <div class="flex items-center gap-8">
          <a href="/" aria-label="Store logo" class="inline-flex">
            <Image
              src={logo.src}
              alt={logo.alt}
              width={logo.width || 120}
              height={logo.height || 28}
            />
          </a>
          <nav class="hidden lg:flex">
            <ul class="flex">
              {navItems?.slice(0, 8).map((item) => <NavItem item={item} />)}
            </ul>
          </nav>
        </div>

        <div class="flex items-center gap-2">
          <label
            for={SEARCHBAR_POPUP_ID}
            class="btn btn-ghost btn-sm no-animation gap-2"
            aria-label="Abrir buscador"
          >
            <Icon id="search" />
            <span class="hidden xl:inline">Buscar vehículos</span>
          </label>
          <a
            href={garage?.href ?? "/garage"}
            class="btn btn-ghost btn-sm no-animation gap-2"
            aria-label={garage?.label ?? "Mi Garaje"}
          >
            <Icon id="favorite" />
            <span class="hidden xl:inline">{garage?.label ?? "Mi Garaje"}</span>
          </a>
          {secondaryCta && (
            <a
              href={secondaryCta.href}
              class="btn btn-ghost btn-sm no-animation"
            >
              {secondaryCta.label}
            </a>
          )}
          {primaryCta && (
            <a
              href={primaryCta.href}
              class="btn btn-primary btn-sm no-animation"
            >
              {primaryCta.label}
            </a>
          )}
        </div>
      </div>

      <div class="hidden lg:flex justify-between items-center pb-4">
        <span class="text-xs text-base-400 uppercase tracking-[0.3em]">
          Compraventa de vehículos
        </span>
        <div class="text-xs text-base-400">
          Abierto hoy 9:00 - 19:00
        </div>
      </div>
    </div>
  </>
);

const Mobile = ({
  logo,
  searchbar,
  navItems,
  loading,
  primaryCta,
  garage,
}: Props) => (
  <>
    <Drawer
      id={SEARCHBAR_DRAWER_ID}
      aside={
        <Drawer.Aside title="Buscar" drawer={SEARCHBAR_DRAWER_ID}>
          <div class="w-screen overflow-y-auto">
            {loading === "lazy"
              ? (
                <div class="h-full w-full flex items-center justify-center">
                  <span class="loading loading-spinner" />
                </div>
              )
              : <Searchbar {...searchbar} />}
          </div>
        </Drawer.Aside>
      }
    />
    <Drawer
      id={SIDEMENU_DRAWER_ID}
      aside={
        <Drawer.Aside title="Menú" drawer={SIDEMENU_DRAWER_ID}>
          {loading === "lazy"
            ? (
              <div
                id={SIDEMENU_CONTAINER_ID}
                class="h-full flex items-center justify-center"
                style={{ minWidth: "100vw" }}
              >
                <span class="loading loading-spinner" />
              </div>
            )
            : <Menu navItems={navItems ?? []} />}
        </Drawer.Aside>
      }
    />

    <div
      class="grid place-items-center w-screen px-5 gap-4"
      style={{
        height: NAVBAR_HEIGHT_MOBILE,
        gridTemplateColumns: "min-content auto min-content min-content",
      }}
    >
      <label
        for={SIDEMENU_DRAWER_ID}
        class="btn btn-square btn-sm btn-ghost"
        aria-label="open menu"
      >
        <Icon id="menu" />
      </label>

      {logo && (
        <a
          href="/"
          class="flex-grow inline-flex items-center justify-center"
          style={{ minHeight: NAVBAR_HEIGHT_MOBILE }}
          aria-label="Store logo"
        >
          <Image
            src={logo.src}
            alt={logo.alt}
            width={logo.width || 110}
            height={logo.height || 22}
          />
        </a>
      )}

      <label
        for={SEARCHBAR_DRAWER_ID}
        class="btn btn-square btn-sm btn-ghost"
        aria-label="abrir buscador"
      >
        <Icon id="search" />
      </label>
      <a
        href={garage?.href ?? "/garage"}
        class="btn btn-square btn-sm btn-ghost"
        aria-label={garage?.label ?? "Mi Garaje"}
      >
        <Icon id="favorite" />
      </a>
    </div>

    {primaryCta && (
      <div class="px-5 pb-5">
        <a href={primaryCta.href} class="btn btn-primary w-full no-animation">
          {primaryCta.label}
        </a>
      </div>
    )}
  </>
);

function Header({
  alerts = [],
  logo = {
    src: "/image/am-autos-logo.png",
    width: 120,
    height: 22,
    alt: "Logo",
  },
  primaryCta = { label: "Reservar prueba", href: "/test-drive" },
  secondaryCta = { label: "Financiación", href: "/finance" },
  garage = { label: "Mi Garaje", href: "/garage" },
  ...props
}: Props) {
  const device = useDevice();
  return (
    <header
      style={{
        height: device === "desktop"
          ? HEADER_HEIGHT_DESKTOP
          : HEADER_HEIGHT_MOBILE,
      }}
    >
      <div class="bg-base-100 fixed w-full z-40">
        {alerts.length > 0 && <Alert alerts={alerts} />}
        {device === "desktop"
          ? (
            <Desktop
              logo={logo}
              primaryCta={primaryCta}
              secondaryCta={secondaryCta}
              garage={garage}
              {...props}
            />
          )
          : (
            <Mobile
              logo={logo}
              primaryCta={primaryCta}
              garage={garage}
              {...props}
            />
          )}
      </div>
    </header>
  );
}

export const LoadingFallback = (props: LoadingFallbackProps<Props>) => (
  // deno-lint-ignore no-explicit-any
  <Header {...props as any} loading="lazy" />
);

export default Header;
