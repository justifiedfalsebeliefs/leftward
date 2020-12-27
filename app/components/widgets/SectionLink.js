import React from "react";
import {Layout, Text, Button} from '@ui-kitten/components';
import WidgetContainer from "./WidgetContainer";
import { MaterialCommunityIcons } from '@expo/vector-icons'; 

function SectionLink({image, title, buttonTitle, onPress}) {
    return (
    <WidgetContainer>
        <Layout style={{alignItems:'center', height:295}}>
        <MaterialCommunityIcons name="image-size-select-large" size={150} color="black" />
      <Text category='h1' 
      style={{
        textAlign:"center",
        marginVertical:20,
        fontWeight:'bold'
      }}>{title}</Text>
      <Button onPress={() => onPress()}>{buttonTitle}</Button>
      </Layout>
      </WidgetContainer>
      );
}

export default SectionLink;
