import React, { useMemo, useState } from "react";
import { View, FlatList, Image, TouchableWithoutFeedback } from "react-native";
import { useTheme } from "@react-navigation/native";
// import Icon from "react-native-dynamic-vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import * as NavigationService from "react-navigation-helpers";
import RNBounceable from "@freakycoder/react-native-bounceable";
import Icon from "react-native-dynamic-vector-icons";
/**
 * ? Local Imports
 */

import createStyles from "./NotificationScreen.style";
import DashboardBody from "./component/DashboardBody";
import BodyOverlay from "./component/BodyOverlay";
// import MockData from "./mock/MockData";
// import CardItem from "./components/card-item/CardItem";

/**
 * ? Shared Imports
 */
import { PRIVATESCREENS } from "@shared-constants";
import Text from "@shared-components/text-wrapper/TextWrapper";
import fonts from "@fonts";
import { BlurView } from "@react-native-community/blur";

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
  // const handleItemPress = () => {
  //   NavigationService.push(PRIVATESCREENS.DETAIL);
  // };

  /* -------------------------------------------------------------------------- */
  /*                               Render Methods                               */
  /* -------------------------------------------------------------------------- */

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
      <Icon
        name={"md-notifications-outline"}
        type="Ionicons"
        color={colors.iconBlack}
        size={30}
      />
    </View>
  );
  const onBodyPartsPress = (parts: string) => {
    console.log(parts);
    setCurrentBody(parts);
    setShowOverlay(true);
  };

  const onListSelect = (parts: string) => {
    setShowOverlay(false);
    console.log(parts);
  };

  const bodyparts = [
    {
      name: "brain",
    },
    {
      name: "hair",
    },
    {
      name: "eye",
    },
    {
      name: "nose",
    },
    {
      name: "brain",
    },
    {
      name: "hair",
    },
    {
      name: "eye",
    },
    {
      name: "nose",
    },
  ];
  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <View style={{ marginTop: 50, marginBottom: 40 }}>
        <Text>click the body part</Text>
        <Text>to see the detail</Text>
      </View>
      <View style={{ flex: 1 }}>
        {/* <Image
          style={{ flex: 1, width: 300 }}
          source={require("./../../assets/dashboard/body.png")}
          resizeMode="cover"
        /> */}
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
              bodyparts={bodyparts}
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
