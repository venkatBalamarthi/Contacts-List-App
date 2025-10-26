import {Dimensions} from "react-native";

const {width, height} = Dimensions.get('window')
// Define base dimensions (e.g., dimensions of a standard screen like iPhone 11)
const BASE_WIDTH = 375; // Base width for scaling
const BASE_HEIGHT = 812; // Base height for scaling

const normalizeSize = (size: number) => {
    const scale = Math.min(width / BASE_WIDTH, height / BASE_HEIGHT);
    return Math.round(size * scale);
}


export const isValidEmail = (email: string = '') => {
    if (!email?.length) {
        return false
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
export const isValidMobileNumber = (mobileNumber: string = '') => {
    if (!mobileNumber?.length) {
        return false
    }
    const mobileRegex = /^[6-9]\d{9}$/;
    return mobileRegex.test(mobileNumber);
}
export default normalizeSize;