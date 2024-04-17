import SearchResult, {
  Props as SearchResultProps,
} from "../search/SearchResult.tsx";
import { type SectionProps } from "@deco/deco";
export type Props = SearchResultProps;
function WishlistGallery(props: SectionProps<typeof loader>) {
  const isEmpty = !props.page || props.page.products.length === 0;
  if (isEmpty) {
    return (
      <div class="container mx-4 sm:mx-auto">
        <div class="mx-10 my-20 flex flex-col gap-4 justify-center items-center">
          <span class="font-medium text-2xl">Tu Garaje está vacío</span>
          <span>
            Inicia sesión y guarda vehículos en tu Garaje para acceder rápido
            más tarde.
          </span>
        </div>
      </div>
    );
  }
  return <SearchResult {...props} />;
}
export const loader = (props: Props, req: Request) => {
  return {
    ...props,
    url: req.url,
  };
};
export default WishlistGallery;
