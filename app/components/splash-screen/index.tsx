/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable react-native/no-color-literals */
import Text from "@components/text"
import React from "react"
import { SafeAreaView, Dimensions, Image, View, StyleSheet } from "react-native"
import { typography, color } from "@theme"

const { width, height } = Dimensions.get("window")

const CustomSplashScreen: React.FC = () => (
  <SafeAreaView style={styles.container}>
    <View style={[styles.section, styles.top]}>
      <Image source={require("@assets/splash-image.png")} />
    </View>
    <View style={styles.section}>
      <Text tx={"slogan"} style={styles.text} />
    </View>
  </SafeAreaView>
)

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: color.palette.red,
    height,
    justifyContent: "center",
    width,
  },
  section: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    width,
  },
  text: {
    color: "#fff",
    fontFamily: typography.primary,
    fontSize: 28,
    fontWeight: "bold",
    lineHeight: 38,
    textAlign: "center",
  },
  top: {
    backgroundColor: "#fff",
  },
})

export default CustomSplashScreen
