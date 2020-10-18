import React, { useState } from "react";
import Screen from "../components/Screen";
import AppButton from "../components/AppButton";
import routes from "../navigation/routes";
import DraggableFlatListItem from "../components/DraggableFlatListItem";
import DraggableFlatListPicker from "../components/DraggableFlatListPicker";
import initialCauses from "../data/initialCauses";
import { Auth } from "aws-amplify";

function UpdateCauseScreen({ navigation }) {
  const [causes, setCauses] = useState(initialCauses);
  renderItem = ({ item, id, drag, isActive }) => {
    // Update colors to cascading rainbow
    return (
      <DraggableFlatListItem
        onLongPress={drag}
        title={item.label}
        icon={item.cause}
      ></DraggableFlatListItem>
    );
  };

  const handleSubmit = async () => {
    var causesOut = "";
    for (var i = 0; i < causes.length; i++) {
      causesOut = causesOut.concat(causes[i].cause);
      causesOut = causesOut.concat(",");
    }
    const currentUser = await Auth.currentAuthenticatedUser();
    Auth.updateUserAttributes(currentUser, { "custom:causes": causesOut });
    navigation.goBack();
  };

  return (
    <>
      <Screen>
        <DraggableFlatListPicker
          data={causes}
          renderItem={renderItem}
          keyExtractor={(item, index) => `draggable-item-${item.id}`}
          onDragEnd={({ data }) => {
            setCauses(data);
          }}
        />
        <AppButton title="Update Causes" onPress={handleSubmit}></AppButton>
      </Screen>
    </>
  );
}

export default UpdateCauseScreen;
