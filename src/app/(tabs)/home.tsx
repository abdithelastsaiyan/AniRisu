import { Link } from "expo-router";
import React, { useState, useEffect } from "react";
import { FlatList, Image, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useColorScheme } from "nativewind";
import firestore from "@react-native-firebase/firestore";

export default function Page() {
  const { top } = useSafeAreaInsets();
  const [news, setNews] = useState([]);

  useEffect(() => {
    const unsubscribe = firestore()
      .collection("newsletters")
      .onSnapshot((snapshot) => {
        const docs = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setNews(docs);
      });

    // Clean up listener on unmount
    return () => unsubscribe();
  }, []);

  return (
    <View className="flex-1 dark:bg-zinc-900" style={{ paddingTop: top }}>
      <Header />
      <FlatList
        data={news}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    </View>
  );
}

function Header() {
  const { colorScheme } = useColorScheme();
  return (
    <View className="items-center border-b-[0.25px] border-gray-200 dark:border-zinc-950 pb-3">
      <Image
        source={require("../../assets/images/logo.png")}
        resizeMode="contain"
        style={{
          height: 50,
          width: 50,
          tintColor: colorScheme === "dark" ? "#fff" : "#000",
        }}
      />
    </View>
  );
}

const renderItem = ({ item }) => (
  <Text style={{}}>
    {item.id}: {JSON.stringify(item)}
  </Text>
);
