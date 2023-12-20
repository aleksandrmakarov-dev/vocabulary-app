"use client";
import { Button } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { motion, AnimatePresence } from "framer-motion";

interface CarouselProps<T> extends React.HTMLAttributes<HTMLDivElement> {
  items: T[];
  render: (item: T) => React.ReactNode;
  loop?: boolean;
}

export default function Carousel<T>(props: CarouselProps<T>) {
  const { items, render, loop, ...other } = props;

  const x = 250;

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [animation, setAnimation] = useState<any>({
    initial: {
      x: -x,
    },
    animate: { x: 0 },
    exit: { opacity: 0, x: x },
  });

  const prevIndex = useRef<number>(0);

  useEffect(() => {
    const newX = prevIndex.current > currentIndex ? -x : x;

    const newAnimation = {
      initial: {
        x: newX,
      },
      animate: { x: 0 },
      exit: { opacity: 0, x: -newX },
    };

    setAnimation(newAnimation);

    prevIndex.current = currentIndex;
  }, [currentIndex]);

  const onNext = () => {
    setCurrentIndex((prev) => {
      if (prev + 1 >= items.length) {
        return loop ? 0 : prev;
      }

      return prev + 1;
    });
  };

  const onPrev = () => {
    setCurrentIndex((prev) => {
      if (prev - 1 < 0) {
        return loop ? items.length - 1 : prev;
      }

      return prev - 1;
    });
  };

  return (
    <div {...other}>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          {...animation}
          transition={{ duration: 0.25 }}
        >
          {render(items[currentIndex])}
        </motion.div>
      </AnimatePresence>
      <div className="mt-3 w-full flex justify-between">
        <Button
          startIcon={<ChevronLeftIcon />}
          variant="contained"
          disableElevation
          onClick={onPrev}
          disabled={loop ? false : currentIndex === 0}
        >
          Prev
        </Button>
        <Button
          endIcon={<ChevronRightIcon />}
          variant="contained"
          disableElevation
          onClick={onNext}
          disabled={loop ? false : currentIndex === items.length - 1}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
