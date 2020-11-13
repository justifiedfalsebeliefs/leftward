import React from "react";
import Constants from 'expo-constants';
import { FlatList, StyleSheet, RefreshControl, View, Text  } from "react-native";
import ActionCard from "../components/ActionCard";
import routes from "../navigation/routes";
import ListItemDeleteAction from "../components/lists/ListItemDeleteAction"
import pushActionStatus from "../data/pushActionStatus"
import useAuth from "../auth/useAuth";
import colors from "../config/colors";
import fonts from "../config/fonts"
import Icon from "../components/Icon";

function ActionList({ 
    itemList,
    navigation,
    doOnRefresh,
    refreshParentFunction,
    title,
    icon,
    height = 400
 }) {
  const { user, logOut } = useAuth();
  const [refreshing, setRefreshing] = React.useState(false);
  const wait = (timeout) => {
    return new Promise(resolve => {
      setTimeout(resolve, timeout);
    });
  }
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    doOnRefresh()
    wait(2000).then(() => setRefreshing(false));
  }, []);

  async function handleDelete(item) {
    await pushActionStatus(user.attributes["custom:GQLuserID"], "HIDDEN", item.actionId)
    doOnRefresh()
  };


  return (
    <View style={{
      backgroundColor: colors.componentBackground,
      borderRadius: 15,
      padding: 12,
      height: height,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 5,
      },
      shadowOpacity: 0.26,
      shadowRadius: 6.68,
      elevation: 4,
    }}>
      <View style={styles.titleContainer}>
        {icon && (<Icon name={icon} size={40}></Icon>)}
        <Text style={styles.titleText}>{title}</Text>
      </View>
      <FlatList
          style={styles.list}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          data={itemList}
          keyExtractor={(item) => item.actionId.toString()}
          renderItem={({ item }) => (
          <ActionCard
              title={item.actionTitle}
              description={item.actionDescription}
              onPress={() => navigation.navigate(routes.ACTION_DETAILS, item)}
              renderRightActions={() => (
                <ListItemDeleteAction onPress={() => handleDelete(item)} />
              )}
              cause={item.causeTitle}
              reward={item.reward}
              actionType={item.actionType}
              organization={item.organizationTitle}
          />
          )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  titleContainer:{
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 15
  },
  titleText:{
    fontSize: 23,
    marginHorizontal: 10,
    fontFamily: fonts.componentTitle
  },
  list: {
    
  },
});

export default ActionList;
