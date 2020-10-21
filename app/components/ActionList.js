import React from "react";
import Constants from 'expo-constants';
import { FlatList, StyleSheet, RefreshControl  } from "react-native";
import ActionCard from "../components/ActionCard";
import routes from "../navigation/routes";


function ActionList({ 
    itemList,
    navigation,
    doOnRefresh
 }) {
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

  return (
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
            //imageUrl={item.images[0].url}
            onPress={() => navigation.navigate(routes.ACTION_DETAILS, item)}
            cause={item.causeTitle}
            reward={item.reward}
            actionType={item.actionType}
            organization={item.organizationTitle}
            //thumbnailUrl
        />
        )}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    height: 50,
  },
});

export default ActionList;
