import { toast } from 'react-toastify';

export default {
    jsonToHtml: (object) => {
        // let html = "";
        // let textArr = [];
        // let row = 0;
        // object.map(item => {
        //     if (row >= 9) {
        //         return
        //     }
        //     let text = "";
        //     item?.children.map(child => {
        //         text += child?.text;
        //     })
        //     row++;
        //     textArr.push(text)
        // })
        // html = textArr.join("<br />")
        // if (row >= 9) {
        //     html += " <a class='link'>Read more...</a>"
        // }
        // return html
    },

    activateToast: (type, message) => {
        toast[type](message)
    }
}