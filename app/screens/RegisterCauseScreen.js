import React, { useState } from "react";
import Screen from "../components/Screen";
import AppButton from "../components/AppButton";
import routes from "../navigation/routes";
import DraggableFlatListItem from "../components/DraggableFlatListItem";
import DraggableFlatListPicker from "../components/DraggableFlatListPicker";
import initialCauses from "../values/initialCauses";

function RegisterCauseScreen({ navigation }) {
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
          title="NEXT"
          onPress={() =>
            navigation.navigate(routes.REGISTERACT, { causes: causes })
          }
        ></AppButton>
        {/* <AppButton
          title="Confirm Registration"
          onPress={() => navigation.navigate(routes.REGISTERCONFIRM)}
        ></AppButton> */}
      </Screen>
    </>
  );
}

export default RegisterCauseScreen;
