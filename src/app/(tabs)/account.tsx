import { Button, StyleSheet, Text, View } from "react-native";
import React from "react";
import auth from "@react-native-firebase/auth";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const Account = () => {
  const user = auth().currentUser;
  const router = useRouter();

  const handleLogOut = () => {
    auth()
      .signOut()
      .then(() => {
        router.replace("/(auth)/login");
        console.log("erfolgrich ausgeloggt");
      });
  };

  return (
    <View className="flex-1 justify-center items-center dark:bg-zinc-900">
      <Text className="dark:text-white">{user.email}</Text>
      <Text className="dark:text-white">{user.uid}</Text>
      <Button title="Logout" onPress={handleLogOut} />
    </View>
  );
};

export default Account;

const styles = StyleSheet.create({});
