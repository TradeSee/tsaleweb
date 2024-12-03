import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { useSwiper } from "swiper/react";
import { Button } from "./styles";

export function SliderNavigation({ isBeginning, isEnd }) {
  const swiper = useSwiper();

  return (
    <nav>
      <Button onClick={() => swiper.slidePrev()} disabled={isBeginning}>
        <ChevronLeft
          sx={
            isBeginning
              ? { color: "#366DFB", opacity: 0.4 }
              : { color: "#366DFB" }
          }
        />
      </Button>

      <Button onClick={() => swiper.slideNext()} disabled={isEnd}>
        <ChevronRight
          sx={isEnd ? { color: "#366DFB", opacity: 0.4 } : { color: "#366DFB" }}
        />
      </Button>
    </nav>
  );
}
