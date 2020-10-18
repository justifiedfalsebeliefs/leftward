import React, { useState } from "react";
import Screen from "../components/Screen";
import AppButton from "../components/AppButton";
import routes from "../navigation/routes";
import DraggableFlatListItem from "../components/DraggableFlatListItem";
import DraggableFlatListPicker from "../components/DraggableFlatListPicker";
import initialCauses from "../data/initialCauses";

function RegisterCauseScreen({ navigation }) {
  const [causes, setCauses] = useState(initialCauses);
  renderItem = ({ item, id, drag, isActive }) => {
    return (
      <DraggableFlatListItem
        onLongPress={drag}
        title={item.label}
        icon={item.cause}
      ></DraggableFlatListItem>
    );
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
        <AppButton
          title="Next"
          onPress={() =>
            navigation.navigate(routes.REGISTERACT, { causes: causes })
          }
        ></AppButton>
      </Screen>
    </>
  );
}

export default RegisterCauseScreen;
