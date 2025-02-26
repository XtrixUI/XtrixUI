import { pluginReact } from "@rsbuild/plugin-react";
import { defineConfig } from "@rslib/core";

export default defineConfig({
  source: {
    entry: {
      index: ["./src/**"],
      //Components
      Accordion: ["./src/UI/Components/Accordion/index.ts"],
      Alert: ["./src/UI/Components/Alert/index.ts"],
      AspectRatio: ["./src/UI/Components/AspectRatio/index.ts"],
      Avatar: ["./src/UI/Components/Avatar/index.ts"],
      Badge: ["./src/UI/Components/Badge/index.ts"],
      BentoGrid: ["./src/UI/Components/BentoGrid/index.ts"],
      BorderBeam: ["./src/UI/Components/BorderBeam/index.ts"],
      Breadcrumb: ["./src/UI/Components/Breadcrumb/index.ts"],
      Button: ["./src/UI/Components/Button/index.ts"],
      Calender: ["./src/UI/Components/Calender/index.ts"],
      Card: ["./src/UI/Components/Card/index.ts"],
      Carousel: ["./src/UI/Components/Carousel/index.ts"],
      Checkbox: ["./src/UI/Components/Checkbox/index.ts"],
      Collapsible: ["./src/UI/Components/Collapsible/index.ts"],
      Combobox: ["./src/UI/Components/Combobox/index.ts"],
      ContextMenu: ["./src/UI/Components/ContextMenu/index.ts"],
      CopyToClipboard: ["./src/UI/Components/CopyToClipboard/index.ts"],
      Dialog: ["./src/UI/Components/Dialog/index.ts"],
      Drawer: ["./src/UI/Components/Drawer/index.ts"],
      GradientBG: ["./src/UI/Components/GradientBG/index.ts"],
      HoverCard: ["./src/UI/Components/HoverCard/index.ts"],
      Input: ["./src/UI/Components/Input/index.ts"],
      InputFloatingLabel: ["./src/UI/Components/InputFloatingLabel/index.ts"],
      InputIcon: ["./src/UI/Components/InputIcon/index.ts"],
      InputOTP: ["./src/UI/Components/InputOTP/index.ts"],
      KeyboardKey: ["./src/UI/Components/KeyboardKey/index.ts"],
      Link: ["./src/UI/Components/Link/index.ts"],
      Loading: ["./src/UI/Components/Loading/index.ts"],
      MagicCard: ["./src/UI/Components/MagicCard/index.ts"],
      Marquee: ["./src/UI/Components/Marquee/index.ts"],
      Meteors: ["./src/UI/Components/Meteors/index.ts"],
      Pagination: ["./src/UI/Components/Pagination/index.ts"],
      Particles: ["./src/UI/Components/Particles/index.ts"],
      Popover: ["./src/UI/Components/Popover/index.ts"],
      Progress: ["./src/UI/Components/Progress/index.ts"],
      RainbowButton: ["./src/UI/Components/RainbowButton/index.ts"],
      Ratings: ["./src/UI/Components/Ratings/index.ts"],
      Resizable: ["./src/UI/Components/Resizable/index.ts"],
      ReviewCard: ["./src/UI/Components/ReviewCard/index.ts"],
      RippleButton: ["./src/UI/Components/RippleButton/index.ts"],
      ScrollArea: ["./src/UI/Components/ScrollArea/index.ts"],
      Select: ["./src/UI/Components/Select/index.ts"],
      Separator: ["./src/UI/Components/Separator/index.ts"],
      Sheet: ["./src/UI/Components/Sheet/index.ts"],
      Skeleton: ["./src/UI/Components/Skeleton/index.ts"],
      Slider: ["./src/UI/Components/Slider/index.ts"],
      Sonner: ["./src/UI/Components/Sonner/index.ts"],
      SpotlightHover: ["./src/UI/Components/SpotlightHover/index.ts"],
      Switch: ["./src/UI/Components/Switch/index.ts"],
      Table: ["./src/UI/Components/Table/index.ts"],
      TableOfContents: ["./src/UI/Components/TableOfContents/index.ts"],
      Tabs: ["./src/UI/Components/Tabs/index.ts"],
      Textarea: ["./src/UI/Components/Textarea/index.ts"],
      TiltHover: ["./src/UI/Components/TiltHover/index.ts"],
      Timeline: ["./src/UI/Components/Timeline/index.ts"],
      Toast: ["./src/UI/Components/Toast/index.ts"],
      Toggle: ["./src/UI/Components/Toggle/index.ts"],
      Tooltip: ["./src/UI/Components/Tooltip/index.ts"],
      User: ["./src/UI/Components/User/index.ts"],
      //Providers
      ThemeProvider: ["./src/UI/Providers/ThemeProvider/index.ts"],
      XtrixUIProvider: ["./src/UI/Providers/XtrixUIProvider/index.ts"],
      //Configs
      TailwindConfig: ["./src/UI/Configs/TailwindConfig/index.ts"],
    },
  },
  lib: [
    {
      bundle: false,
      dts: true,
      format: "esm",
    },
  ],
  output: {
    target: "web",
  },
  plugins: [
    pluginReact({
      swcReactOptions: {
        runtime: "classic",
      },
    }),
  ],
});
