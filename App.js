import {
    StyleSheet,
    ImageBackground,
    SafeAreaView,
    Platform,
    useWindowDimensions,
} from "react-native";
import { SafeAreaView as SafeAreaViewAndroid } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useState, useCallback, useEffect } from "react";
import {StatusBar} from "expo-status-bar"
import StartGameScreen from "./screens/StartGameScreen";
import GameScreen from "./screens/GameScreen";
import GameOverScreen from "./screens/GameOverScreen";
import { Colors } from "./constants/colors";
import fonts from "./assets/fonts";

SplashScreen.preventAutoHideAsync();

function getOrientationBasedOnWidthAndHeight(width, height) {
    return height > width ? "portrait" : "landscape";
}

export default function App() {
    const [pickedNumber, setPickedNumber] = useState();
    const [gameIsOver, setGameIsOver] = useState(false);
    const [roundsNumber, setRoundsNumber] = useState();
    const isAndroid = Platform.OS === "android";
    const [fontsLoaded, fontError] = useFonts(fonts);
    const { width, height } = useWindowDimensions();

    const deviceWindowMetadata = {
        width,
        height,
        isLandscape: width > height && width > 500,
    };

    const onLayoutRootView = useCallback(async () => {
        if (fontsLoaded || fontError) {
            await SplashScreen.hideAsync();
        }
    }, [fontsLoaded, fontError]);

    if (!fontsLoaded && !fontError) {
        return null;
    }

    function onPickNumberHandler(pickedNumber) {
        setPickedNumber(pickedNumber);
    }

    function onCorrectGuessHandler(roundsNumber) {
        setRoundsNumber(roundsNumber);
        setGameIsOver(true);
    }

    function startNewGameHandler() {
        setGameIsOver(false);
        setPickedNumber(null);
    }

    const SafeAreaViewComponent = isAndroid
        ? SafeAreaViewAndroid
        : SafeAreaView;
    const screenToShow = !pickedNumber ? (
        <StartGameScreen
            onPickNumberHandler={onPickNumberHandler}
            metadata={deviceWindowMetadata}
        />
    ) : !gameIsOver ? (
        <GameScreen
            pickedNumber={pickedNumber}
            onCorrectGuessHandler={onCorrectGuessHandler}
            metadata={deviceWindowMetadata}
        />
    ) : (
        <GameOverScreen
            userNumber={pickedNumber}
            roundsNumber={roundsNumber}
            startNewGameHandler={startNewGameHandler}
            metadata={deviceWindowMetadata}
        />
    );

    return (
        <>
        <StatusBar style="light"/>
        <LinearGradient
            onLayout={onLayoutRootView}
            colors={[Colors.primary600, Colors.accent500]}
            style={styles.root}
        >
            <SafeAreaViewComponent style={styles.root}>
                <ImageBackground
                    source={require("./assets/images/background.png")}
                    style={styles.root}
                    resizeMode="cover"
                    imageStyle={styles.backgroundImage}
                >
                    {screenToShow}
                </ImageBackground>
            </SafeAreaViewComponent>
        </LinearGradient>
        </>
        
    );
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        paddingTop: 8,
    },
    backgroundImage: {
        opacity: 0.15,
    },
});
