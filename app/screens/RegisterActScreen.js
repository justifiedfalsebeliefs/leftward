import React, { useState } from "react";
import Screen from "../components/Screen";
import AppButton from "../components/AppButton";
import routes from "../navigation/routes";
import DraggableFlatListItem from "../components/DraggableFlatListItem";
import DraggableFlatListPicker from "../components/DraggableFlatListPicker";
import initialActions from "../values/initialActions";

function RegisterActScreen({ route, navigation }) {
  console.log(route.params.causes);
  const [acts, setActs] = useState(initialActions);
  renderItem = ({ item, id, drag, isActive }) => {
    // Update colors to cascading rainbow
    return (
      <DraggableFlatListItem
        onLongPress={drag}
        title={item.label}
      ></DraggableFlatListItem>
    );
  };

  return (
    <>
      <Screen>
        <DraggableFlatListPicker
          data={acts}
          renderItem={renderItem}
          keyExtractor={(item, index) => `draggable-item-${item.id}`}
          onDragEnd={({ data }) => {
            setActs(data);
          }}
        />
        <AppButton
          title="NEXT"
          onPress={() => navigation.navigate(routes.REGISTER)}
        ></AppButton>
      </Screen>
    </>
  );
}

export default RegisterActScreen;
