import React, {useMemo} from "react";
import {SafeAreaView} from "react-native-safe-area-context";
import {ScrollView, Text, View} from "react-native";
import {useTheme} from "@react-navigation/native";
import createStyles from "./Sidebar.style";

const Sidebar: React.FC = (props) => {
  const theme = useTheme();
  const { colors } = theme;
  const styles = useMemo(() => createStyles(theme), [theme]);
  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.contentView}>
          <Text>Name</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Sidebar;
