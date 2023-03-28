import React, { useMemo, useState } from "react";
import {
  View,
  FlatList,
  Image,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native";
import { useTheme } from "@react-navigation/native";
// import Icon from "react-native-dynamic-vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import RNBounceable from "@freakycoder/react-native-bounceable";
import Icon from "react-native-dynamic-vector-icons";
import * as NavigationService from "react-navigation-helpers";
import { useDispatch } from "react-redux";
/**
 * ? Local Imports
 */

import createStyles from "./NotificationScreen.style";
import DashboardBody from "./component/DashboardBody";
import BodyOverlay from "./component/BodyOverlay";
import { setPassword, setUsername, setLoggedInState } from "../auth/rx/reducer";
// import MockData from "./mock/MockData";
// import CardItem from "./components/card-item/CardItem";

/**
 * ? Shared Imports
 */
import { PRIVATESCREENS } from "@shared-constants";
import Text from "@shared-components/text-wrapper/TextWrapper";
import fonts from "@fonts";
import { BlurView } from "@react-native-community/blur";

import bodyList from "./dummy/dummyData.json";

const profileURI =
  // eslint-disable-next-line max-len
  "https://images.unsplash.com/photo-1544568100-847a948585b9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2574&q=80";

interface ProfileScreenProps {}

const ProfileScreen: React.FC<ProfileScreenProps> = () => {
  const theme = useTheme();
  const { colors } = theme;
  const styles = useMemo(() => createStyles(theme), [theme]);
  const [showOverlay, setShowOverlay] = useState(true);
  const [currentBody, setCurrentBody] = useState("");
  const dispatch = useDispatch();
  /* -------------------------------------------------------------------------- */
  /*                               Render Methods                               */
  /* -------------------------------------------------------------------------- */

  const handleLogout = async () => {
    dispatch(setUsername(""));
    dispatch(setPassword(""));
    dispatch(setLoggedInState(false));
  };

  const MenuButton = () => (
    <RNBounceable>
      <Icon name="menu" type="Ionicons" color={colors.iconBlack} size={30} />
    </RNBounceable>
  );

  const Header = () => (
    <View style={styles.header}>
      <MenuButton />
      <View style={{ marginLeft: 10 }}>
        <Text>Welcome,</Text>
        <Text>Peach Bio's User</Text>
      </View>
      <View style={{ flexGrow: 10 }} />
      <TouchableOpacity onPress={handleLogout}>
        <Icon
          name={"md-notifications-outline"}
          type="Ionicons"
          color={colors.iconBlack}
          size={30}
        />
      </TouchableOpacity>
    </View>
  );
  const onBodyPartsPress = (parts: string) => {
    setCurrentBody(parts);
    setShowOverlay(true);
  };

  const onListSelect = (parts: string, medicalReport: any) => {
    setShowOverlay(false);
    NavigationService.push(PRIVATESCREENS.MEDICAL_RECORD, {
      medicalReport,
      parts,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <View style={{ marginTop: 50, marginBottom: 40 }}>
        <Text>click the body part</Text>
        <Text>to see the detail</Text>
      </View>
      <View style={{ flex: 1 }}>
        <DashboardBody
          showOverlay={false}
          onBodyPartsPress={onBodyPartsPress}
        />
      </View>
      {showOverlay && (
        <View style={styles.overlay}>
          <BlurView
            style={styles.overlayContainer}
            blurType="light"
            blurAmount={5}
            reducedTransparencyFallbackColor="white"
          >
            <BodyOverlay
              bodyparts={bodyList}
              selectedBodyParts={currentBody}
              onListSelect={onListSelect}
            />
          </BlurView>
        </View>
      )}
    </SafeAreaView>
  );
};

export default ProfileScreen;
