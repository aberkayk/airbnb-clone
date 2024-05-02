import { View, Text, StyleSheet } from "react-native";
import React from "react";

interface Props {
  listings: any;
}

const ListingsMap = ({ listings }: Props) => {
  return <View>{/* <MapView style={styles.container} /> */}</View>;
};

export default ListingsMap;

const styles = StyleSheet.create({
  container: { flex: 1 },
});
