require("./scripts/load-env.js");

const rawBundleId = "com.app.ruscalai";
const bundleId = rawBundleId;

module.exports = {
  expo: {
    name: "CaloLife",
    slug: "rus-cal-ai",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/icon.png",
    userInterfaceStyle: "automatic",
    newArchEnabled: true,
    android: {
      jsEngine: "jsc",
      package: "com.app.ruscalai",
      adaptiveIcon: {
        backgroundColor: "#E6F4FE",
        foregroundImage: "./assets/images/android-icon-foreground.png",
      },
      permissions: ["POST_NOTIFICATIONS"],
    },
    plugins: ["expo-router"],
    experiments: {
      typedRoutes: true,
    },
    extra: {
      eas: {
        projectId: "cc0f21fb-7169-4c92-9157-f87d2bf2992d"
      }
    }
  }
};
