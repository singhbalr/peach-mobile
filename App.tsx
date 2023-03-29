import "react-native-gesture-handler";
import React from "react";
import { StatusBar, useColorScheme, LogBox } from "react-native";
import SplashScreen from "react-native-splash-screen";
/**
 * ? Local Imports
 */
import Navigation from "./src/navigation";
import { isAndroid } from "@freakycoder/react-native-helpers";
import { Provider } from "react-redux";
import { store, persistor } from "./src/redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { Provider as PaperProvider } from "react-native-paper";
import { theme } from "./src/shared/theme/paperTheme";
import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  ApolloProvider,
  split,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { WebSocketLink } from "@apollo/client/link/ws";
import { getMainDefinition } from "@apollo/client/utilities";
LogBox.ignoreAllLogs();

const App = () => {
  const scheme = useColorScheme();
  const isDarkMode = scheme === "dark";

  const WS_URL = "peach-bio-api-testing.wistkey.com";

  const wsLink = new WebSocketLink({
    uri: `wss://${WS_URL}/graphql`,
    options: {
      reconnect: true,
    },
  });

  const httpLink = createHttpLink({
    uri: `https://${WS_URL}/graphql`,
  });

  const authLink = setContext((_, { headers }) => {
    const token = false;
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
      },
    };
  });

  const splitLink = split(
    ({ query }) => {
      const definition = getMainDefinition(query);
      return (
        definition.kind === "OperationDefinition" &&
        definition.operation === "subscription"
      );
    },
    wsLink,
    authLink.concat(httpLink),
  );

  const client = new ApolloClient({
    link: splitLink,
    cache: new InMemoryCache(),
  });

  React.useEffect(() => {
    StatusBar.setBarStyle(isDarkMode ? "light-content" : "light-content");
    if (isAndroid) {
      StatusBar.setBackgroundColor("rgba(0,0,0,0)");
      StatusBar.setTranslucent(true);
    }

    setTimeout(() => {
      SplashScreen.hide();
    }, 750);
  }, [scheme, isDarkMode]);

  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <PaperProvider theme={theme}>
            <ApolloProvider client={client}>
              <Navigation />
            </ApolloProvider>
          </PaperProvider>
        </PersistGate>
      </Provider>
    </>
  );
};

export default App;
