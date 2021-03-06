import React, { useEffect, useState } from 'react';
import { View, Text, Vibration, StyleSheet } from 'react-native';
import { Toggle, Button } from '@ui-kitten/components';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { GLOBAL_FUNCTIONS, GLOBAL_VARIABLES } from './App';

function DarkModeToggle() {
    const [checked, setChecked] = React.useState(GLOBAL_VARIABLES.GeneralSettings.darkMode);
    const onCheckedChange = (isChecked) => {
        setChecked(isChecked);
        GLOBAL_FUNCTIONS.SetGeneralSetting("darkMode", isChecked);
    };
    return (
        <View style={styles.setting}>
            <MaterialCommunityIcons name="theme-light-dark" style={styles.settingIcon} />
            <View style={{ flex: 11, flexDirection: "row" }}>
                <Text style={styles.settingText}>Dark Mode</Text>
                <Toggle checked={checked} onChange={onCheckedChange} style={{ flex: 4 }}></Toggle>
            </View>
        </View>
    );
};
function VibrationToggle() {
    const [checked, setChecked] = React.useState(GLOBAL_VARIABLES.GeneralSettings.vibration);
    const onCheckedChange = (isChecked) => {
        setChecked(isChecked);
        GLOBAL_FUNCTIONS.SetGeneralSetting("vibration", isChecked);
        if (isChecked) {
            Vibration.vibrate(100);
        }
    };
    return (
        <View style={styles.setting}>
            <MaterialCommunityIcons name="vibrate" style={styles.settingIcon} />
            <View style={{ flex: 11, flexDirection: "row" }}>
                <Text style={styles.settingText}>Vibration</Text>
                <Toggle checked={checked} onChange={onCheckedChange} style={{ flex: 4 }}></Toggle>
            </View>
        </View>
    );
};
function Difficulty() {
    const [selectedDifficulty, setSelectedDifficulty] = React.useState(GLOBAL_VARIABLES.GeneralSettings.difficulty);

    function changeDifficulty(difficulty) {
        setSelectedDifficulty(difficulty);
        GLOBAL_FUNCTIONS.SetGeneralSetting("difficulty", difficulty);
    }
    return (
        <View style={styles.setting}>
            <MaterialCommunityIcons name="gauge-low" style={styles.settingIcon} />
            <View style={{ flex: 11, flexDirection: "row" }}>
                <Text style={styles.settingText}>Difficulty</Text>
                <View style={{ flex: 16, flexDirection: "row" }}>
                    <Button style={{ marginRight: 5 }} size="small" onPress={() => { changeDifficulty("easy") }} appearance={selectedDifficulty == "easy" ? 'filled' : 'outline'} status='success'>Easy</Button>
                    <Button style={{ marginRight: 5 }} size="small" onPress={() => { changeDifficulty("normal") }} appearance={selectedDifficulty == "normal" ? 'filled' : 'outline'} status='warning'>Normal</Button>
                    <Button style={{ marginRight: 5 }} size="small" onPress={() => { changeDifficulty("hard") }} appearance={selectedDifficulty == "hard" ? 'filled' : 'outline'} status='danger'>Hard</Button>
                </View>
            </View>
        </View >
    );
};

function Settings() {
    return (
        <View>
            <DarkModeToggle />
            <VibrationToggle />
            <Difficulty />
        </View>
    );
}
const styles = StyleSheet.create({
    setting: {
        flexDirection: "row",
        borderBottomColor: "gray",
        borderBottomWidth: 1,
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 20,
        alignSelf: "center"
    },
    settingIcon: {
        fontSize: 20,
        flex: 1,
        alignSelf: "center"
    },
    settingText: {
        fontSize: 20,
        flex: 10,
        alignSelf: "center",
    }
});

export default Settings