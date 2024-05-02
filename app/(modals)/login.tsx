import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { useWarmUpBrowser } from "@/hooks/useWarmUpBrowser";
import { defaultStyles } from "@/constants/Styles";
import Colors from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { useOAuth } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";

enum Strategy {
  Google = "oauth_google",
  Facebook = "oauth_facebook",
  Apple = "oauth_apple",
}

const Page = () => {
  useWarmUpBrowser();

  const router = useRouter();
  const { startOAuthFlow: appleAuth } = useOAuth({
    strategy: "oauth_apple",
  });
  const { startOAuthFlow: googleAuth } = useOAuth({
    strategy: "oauth_google",
  });
  const { startOAuthFlow: facebookAuth } = useOAuth({
    strategy: "oauth_facebook",
  });

  const onSelectAuth = async (strategy: Strategy) => {
    const selectedAuth = {
      [Strategy.Google]: googleAuth,
      [Strategy.Apple]: appleAuth,
      [Strategy.Facebook]: facebookAuth,
    }[strategy];

    try {
      const { createdSessionId, setActive } = await selectedAuth();
      if (createdSessionId) {
        setActive!({ session: createdSessionId });
        router.back();
      }
    } catch (err) {
      console.error("OAuth error:", err);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        autoCapitalize="none"
        placeholder="Email"
        style={[defaultStyles.inputField, { marginBottom: 30 }]}
      />
      <TouchableOpacity style={defaultStyles.btn}>
        <Text style={defaultStyles.btnText}>Continue</Text>
      </TouchableOpacity>
      <View style={styles.separatorView}>
        <View
          style={{
            flex: 1,
            borderBottomColor: "#000",
            borderBottomWidth: StyleSheet.hairlineWidth,
          }}
        />
        <Text>OR</Text>
        <View
          style={{
            flex: 1,
            borderBottomColor: "#000",
            borderBottomWidth: StyleSheet.hairlineWidth,
          }}
        />
      </View>

      <View style={{ gap: 20 }}>
        <TouchableOpacity style={defaultStyles.btnOutline}>
          <Ionicons name="call" style={defaultStyles.btnIcon} size={22} />
          <Text style={defaultStyles.btnOutlineText}>
            Continue with Phone
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => onSelectAuth(Strategy.Google)}
          style={defaultStyles.btnOutline}
        >
          <Ionicons
            name="logo-google"
            style={defaultStyles.btnIcon}
            size={22}
          />
          <Text style={defaultStyles.btnOutlineText}>
            Continue with Google
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => onSelectAuth(Strategy.Apple)}
          style={defaultStyles.btnOutline}
        >
          <Ionicons
            name="logo-apple"
            style={defaultStyles.btnIcon}
            size={22}
          />
          <Text style={defaultStyles.btnOutlineText}>
            Continue with Apple
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => onSelectAuth(Strategy.Facebook)}
          style={defaultStyles.btnOutline}
        >
          <Ionicons
            name="logo-facebook"
            style={defaultStyles.btnIcon}
            size={22}
          />
          <Text style={defaultStyles.btnOutlineText}>
            Continue with Facebook
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 26,
  },
  separatorView: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginVertical: 30,
  },
  separator: {
    fontFamily: "mon-sb",
    color: Colors.grey,
  },
});
export default Page;
