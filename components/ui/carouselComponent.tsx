import { animate } from "framer-motion";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../../shadcn/components/ui/carousel";

export default function CarouselComponent({
  elements,
}: {
  elements: JSX.Element[];
}) {
  return (
    <Carousel
    >
      <CarouselContent>
        {elements.map((el) => (
          <CarouselItem className="basis-[1/6] pl-4 md:basis-[1/2] lg:basis-1/3">
            {el}
          </CarouselItem>
        ))}
      </CarouselContent>
      {/* <CarouselPrevious />
      <CarouselNext /> */}
    </Carousel>
  );
}
