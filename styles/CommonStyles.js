import { StyleSheet } from 'react-native';

const CommonStyles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: 'white',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
        color:'black'
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 15,
    },
    input: {
        flex: 1,
        height: 40,
        paddingHorizontal: 10,
    },
    inputError: {
        borderColor: 'red',
    },
    icon: {
        paddingHorizontal: 10,
    },
    eyeIcon: {
        paddingHorizontal: 10,
    },
    errorText: {
        color: 'red',
        marginBottom: 10,
    },
    navigationText: {
        textAlign: 'center',
        marginTop: 10,
        color: '#007BFF',
    },
    button: {
        backgroundColor: '#007BFF',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 20,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        textTransform: 'uppercase',
    }
});

export default CommonStyles;
