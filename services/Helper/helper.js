import { toast } from 'react-toastify';
import moment from 'moment';

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
    },

    formatMention: (string, mentions) => {
        mentions.map(m => {
            string = string.replace(m.name, `<Username name="${m.name}" id="${m.id}"/>`)
        })
        string.replace("\n", "")
        string.replace("p", "div")
        return string;
    },

    formatCreatedTime: (time) => {
        let now = moment();
        var hours = moment.duration(now.diff(moment(time))).asHours();
        if (hours < 20) {
            return moment(time).fromNow(true)
        } else {
            return moment(time).format("HH:mm MMM D YYYY")
        }

    }
}