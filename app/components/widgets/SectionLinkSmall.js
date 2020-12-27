import React from "react";
import {Layout, Text, Button} from '@ui-kitten/components';
import WidgetContainer from "./WidgetContainer";
import { MaterialCommunityIcons } from '@expo/vector-icons';

function SectionLink({image, title, buttonTitle, onPress}) {
    return (
    <WidgetContainer>
        <Layout style={{alignItems:'center', height:160, flex:1}}>
        <Layout style={{alignItems:'center', flexDirection:'row', flex:1}}>
        
      <Text category='h3' 
      style={{
        width:'75%',
        textAlign:"left",
        marginVertical:20,
        fontWeight:'bold'
      }}>{title}</Text>
      <MaterialCommunityIcons name="image-size-select-large" size={75} color="black" />
      </Layout>
    <Button onPress={() => onPress()}>{buttonTitle}</Button>
      </Layout>
      </WidgetContainer>
      );
}

export default SectionLink;
