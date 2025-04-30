import createCache from "@emotion/cache";
import rtlPlugin from "stylis-plugin-rtl";
import { prefixer } from "stylis";

const isRtl = true;

const createEmotionCache = () => {
  return createCache({
    key: isRtl ? "mui-rtl" : "mui",
    stylisPlugins: isRtl ? [prefixer, rtlPlugin] : [],
  });
};

export default createEmotionCache;
