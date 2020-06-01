export default {
    jsonToHtml: (object) => {
        let html = "";
        let textArr = [];
        object.map(item => {
            let text = "";
            item?.children.map(child => {
                text += child?.text;
            })
            textArr.push(text)
        })
        console.log(textArr)
        html = textArr.join("<br />")
        return html
    }
}