import React, { useContext } from "react";
import { RootStoreContext } from "../store/RootStoreContext"
import { observer } from "mobx-react-lite"
import {Text, Modal} from "react-native";
import Button from "../components/Button"


function TestModal() {
    const things = useContext(RootStoreContext)
    return (
        <Modal
        animationType={"slide"}
        transparent={true}
        visible={things.testModalVisible}
        >
            <Text>Hello World!</Text>
            <Button
            title={'close test modal'}
            onPress={() => things.updateTestModalVisible(false)}></Button>
        </Modal>
);}
export default observer(TestModal);