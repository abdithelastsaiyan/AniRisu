import {
  Alert,
  Button,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import auth from "@react-native-firebase/auth";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const { top } = useSafeAreaInsets();

  const handleSignIn = () => {
    auth()
      .signInWithEmailAndPassword(email, pass)
      .then(() => {
        console.log("anmelden erfolgreich");
        router.replace("/(tabs)/home");
      })
      .catch((error) => Alert.alert("Fehler:" + error));
  };

  return (
    <View className="flex-1 bg-red-500 px-5" style={{ paddingTop: top }}>
      <Image
        source={require("../../assets/images/logo.png")}
        resizeMode="contain"
        style={{ width: 125, height: 125, tintColor: "#fff", marginTop: 15 }}
      />
      <Text className="mt-2 text-xl native:text-2xl font-bold tracking-tighter sm:text-2xl md:text-4xl lg:text-5xl text-white">
        Willkommen bei AniRisu!
      </Text>
      <Text className="font-light my-1 leading-5 text-lg tracking-tighter sm:text-2xl md:text-4xl lg:text-5xl text-white">
        Melde dich jetzt an, die Community wartet auf dich!
      </Text>
      <View className="mt-10 items-center" style={{}}>
        <TextInput
          onChangeText={setEmail}
          value={email}
          placeholder="E-Mail"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          placeholderTextColor={"#ffffff90"}
          style={styles.textInput}
        />
        <TextInput
          onChangeText={setPass}
          value={pass}
          placeholder="Password"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
          secureTextEntry
          placeholderTextColor={"#ffffff90"}
          style={styles.textInput}
          className="mt-5"
        />
        <TouchableOpacity
          className="mt-12 px-10 py-4 bg-white rounded-full"
          onPress={handleSignIn}
          activeOpacity={0.75}
        >
          <Text className="text-xl font-bold">Anmelden</Text>
        </TouchableOpacity>
      </View>
      <View className="self-center absolute bottom-12 items-center">
        <Text className="text-white">Noch kein Teil der Community?</Text>
        <Text className="text-white font-bold underline mt-1">
          Konto erstellen!
        </Text>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  textInput: {
    borderColor: "#fff",
    borderWidth: 2,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#ffffff70",
    paddingLeft: 15,
    color: "#fff",
    fontWeight: "500",
    width: "100%",
  },
});
