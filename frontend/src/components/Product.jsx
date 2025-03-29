import React, { useRef } from "react";
import { motion,useInView } from "motion/react";

const Product = () => {

    const ref=useRef(null)

    const isInView = useInView(ref ,{once:true})

  return (
    <motion.div
      initial={{
        opacity: 0,
        translateY: 100,
      }}
      animate={isInView?{opacity: 1,
        translateY:0}:{}}
      className="flex flex-col-reverse sm:flex-row justify-center items-center text-white bg-[url(/public/product_bg.png)] pl-3 py-2  rounded-2xl "
      ref={ref}
      transition={{
        duration:0.7,

      }}
    >
      <div className="flex flex-col gap-2 ">
        <p className="text-xl">Wheat</p>
        <div className="flex gap-6 justify-between items-center ">
          <div>
            <p className="font-semibold uppercase">Pinecode</p>
            <p>333516</p>
          </div>
          <div>
            <p className="font-semibold uppercase">Total Quality</p>
            <p>6 TON</p>
          </div>
        </div>
        <div>
          <p className="uppercase font-semibold">Description</p>
          <p className="text-wrap max-w-3xs">
            Date of production, etc and this the place where we can write the
            description of the code
          </p>
        </div>
      </div>
      <div className="scale-70">
        <img src="/qr.png" alt="" />
      </div>
    </motion.div>
  );
};

export default Product;
