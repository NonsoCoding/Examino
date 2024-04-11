import { useContext } from "react";
import { ActivityIndicator, Modal, View, Text } from "react-native";
import { AppContext } from "./Globalvariables";
import { Theme } from "./Theme";


export function Preloader() {
    const {preloader} = useContext(AppContext)
    return (
        <>
        <Modal
        visible={preloader}
        transparent={true}
        
        >
            <View style={{
                flex: 1, paddingTop: 20, justifyContent: "center", alignItems: 'center',
            backgroundColor: "#ffffffcd"
        }}>
            <Text style={{fontFamily: Theme.fonts.text500}}>Loading</Text>
            <ActivityIndicator size="large" color={Theme.colors.primary} />
            </View>
        </Modal>
        </>
    )
}