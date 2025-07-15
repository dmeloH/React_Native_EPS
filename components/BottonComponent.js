import { TouchableOpacity, Text, StyleSheet } from "react-native";

export default function CustomButton({ title, onPress, style, textStyle }) {
    return (
        <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
            <Text style={[styles.text, textStyle]}>{title}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: "#7E60BF",
        paddingVertical: 14,
        paddingHorizontal: 28,
        borderRadius: 12,
        alignItems: "center",
        justifyContent: "center",
        marginVertical: 16,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 4,
    },
    text: {
        color: "#FFFFFF",
        fontSize: 16,
        fontWeight: "600",
        letterSpacing: 0.5,
    },
});
