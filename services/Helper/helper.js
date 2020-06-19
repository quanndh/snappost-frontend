import { toast } from 'react-toastify';

export default {
    formatSecond: seconds => {
        seconds = Math.floor(seconds);
        if (seconds < 60) {
            if (seconds < 10) {
                return "0:0" + seconds;
            } else {
                return "0:" + seconds;
            }
        } else {
            let minute = seconds / 60;
            let second = seconds % 60;
            let hour;
            if (minute <= 60) {
                hour = minute / 60;
                minute = minute % 60;
                return hour + ':' + minute + ':' + second;
            } else {
                return minute + ":" + second;
            }
        }

    },

    activateToast: (type, message) => {
        toast[type](message)
    }
}