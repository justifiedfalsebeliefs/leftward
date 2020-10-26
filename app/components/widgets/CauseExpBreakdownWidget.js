import React from "react";
import { StyleSheet, View, Text } from "react-native";
import routes from "../../navigation/routes";
import ListItem from "../lists/ListItem"
import Icon from "../Icon"
import colors from "../../config/colors"
import { StackedBarChart,  XAxis } from 'react-native-svg-charts'

function CauseExpBreakdownWidget({
    userExperience,
    navigation
}) {
if(typeof userExperience !== 'undefined'){
    // onPress={() => navigation.navigate(routes.EXPBREAKDOWNDETAILS)}
    const data = [
        {
            cause: new Date(2015, 0, 1),
            apples: 3840,
            bananas: 1920,
            cherries: 960,
            dates: 400,
            oranges: 400,
        },
        {
            cause: new Date(2015, 1, 1),
            apples: 1600,
            bananas: 1440,
            cherries: 960,
            dates: 400,
        },
        {
            cause: new Date(2015, 2, 1),
            apples: 640,
            bananas: 960,
            cherries: 3640,
            dates: 400,
        },
        {
            cause: new Date(2015, 3, 1),
            apples: 3320,
            bananas: 480,
            cherries: 640,
            dates: 400,
        },
    ]

    const colors = ['#7b4173', '#a55194', '#ce6dbd', '#de9ed6']
    const keys = ['apples', 'bananas', 'cherries', 'dates']
  return (
      <View>
 <StackedBarChart
                style={{ height: 150 }}
                keys={keys}
                colors={colors}
                data={data}
                showGrid={false}
                contentInset={{ top: 1, bottom: 0 }}
            />
             <XAxis
                    //style={{ marginHorizontal: -10 }}
                    data={data}
                    xAccessor={ ({ item }) => item.cause }
                    formatLabel={(value) => value.toString()}
                    //contentInset={{ left: 10, right: 10 }}
                    svg={{ fontSize: 10, fill: 'black' }}
                />
  </View>
  
    );
}else return (<View style={styles.levelContainer}>
    <Text >{`Loading`}</Text>
</View>)

}

const styles = StyleSheet.create({
    
});

export default CauseExpBreakdownWidget;
