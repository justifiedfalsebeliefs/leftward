import React from "react";
import { FlatList, StyleSheet } from "react-native";
import ActionCard from "../components/ActionCard";
import routes from "../navigation/routes";


function ActionList({ 
    itemList,
    navigation
 }) {

  return (
    <FlatList
        style={styles.list}
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
