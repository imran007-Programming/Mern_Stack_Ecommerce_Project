import React, { useEffect, useMemo, useCallback, useState } from "react";
import "./Catslider.scss";
import useEmblaCarousel from "embla-carousel-react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { adminGetCategory } from "../../redux/Slice/categorySlice/categorySlice";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";

const Catslider = () => {
  const [bgColor] = useState([
    "#F2FCE4",
    "#FFFCEB",
    "#ECFFEC",
    "#FEEFEA",
    "#FFF3EB",
    "#FFF3FF",
    "#F2FCE4",
    "#FEEFEA",
    "#FFFCEB",
    "#feefea",
    "#fff3eb",
    "#fffceb",
    "#f2fce4",
  ]);

  const { CategoryData = [], loading } = useSelector((state) => state.category);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(adminGetCategory());
  }, [dispatch]);

  // Embla options
  const emblaOptions = useMemo(
    () => ({
      loop: true,
      align: "start",
      dragFree: true,
      containScroll: "trimSnaps",
    }),
    []
  );

  const [emblaRef, emblaApi] = useEmblaCarousel(emblaOptions);

  const scrollPrev = useCallback(
    () => emblaApi && emblaApi.scrollPrev(),
    [emblaApi]
  );
  const scrollNext = useCallback(
    () => emblaApi && emblaApi.scrollNext(),
    [emblaApi]
  );

  // Autoplay
  useEffect(() => {
    if (emblaApi) {
      const interval = setInterval(() => {
        emblaApi.scrollNext();
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [emblaApi]);

  return (
    <div className="catSlideSection">
      <h1 className="text-2xl text-start font-semibold my-3">
        Features Categories
      </h1>

      <div className="embla">
        <div className="embla__viewport" ref={emblaRef}>
          <div className="embla__container">
            {loading
              ? // Skeleton loader
                Array.from({ length: 8 }).map((_, index) => (
                  <div className="embla__slide" key={index}>
                    <div className="flex flex-col justify-center items-center rounded-xl p-4 animate-pulse bg-gray-100">
                      <div className="w-20 h-20 bg-gray-300 rounded-lg"></div>
                      <div className="w-24 h-4 bg-gray-300 mt-3 rounded"></div>
                      <div className="w-16 h-3 bg-gray-300 mt-2 rounded"></div>
                    </div>
                  </div>
                ))
              : CategoryData.length > 0 &&
                CategoryData.map((item, index) => (
                  <div className="embla__slide" key={item?._id || index}>
                    <Link to={`/allproducts?categoryId=${item?._id}`}>
                      <div
                        className="flex flex-col justify-center items-center rounded-xl p-4"
                        style={{
                          backgroundColor: bgColor[index % bgColor.length],
                        }}
                      >
                        <div className="w-full flex justify-center">
                          <img
                            className="object-contain h-20 w-auto"
                            src={item?.catimage}
                            alt={item?.categoryName || "Category"}
                            loading="lazy"
                          />
                        </div>
                        <h5 className="text-sm pt-3">{item?.categoryName}</h5>
                        {item?.products?.length > 1 ? (
                          <p className="mx-2 text-sm">
                            {item.products.length}
                            <span>(items)</span>
                          </p>
                        ) : (
                          <p className="text-sm">
                            {item?.products?.length || 0}
                            <span>(item)</span>
                          </p>
                        )}
                      </div>
                    </Link>
                  </div>
                ))}
          </div>
        </div>

        {/* Arrows */}
        {!loading && (
          <div className="embla__controls">
            <button
              className="embla__prev"
              onClick={scrollPrev}
              aria-label="Previous"
            >
              <FaArrowLeft size={14} />
            </button>
            <button
              className="embla__next"
              onClick={scrollNext}
              aria-label="Next"
            >
              <FaArrowRight size={14} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Catslider;
