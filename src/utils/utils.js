import {message} from "antd";

const getSimple = (address, startIndex, endIndex) => {
    const result = address.slice(0,startIndex) + '...' + address.slice(endIndex,address.length);
    return result;
}

const copyToClip = (content, messageText = "copy success") => {
    const input = document.createElement('input');
	document.body.appendChild(input);
 	input.setAttribute('value', content);
	input.select();
	if (document.execCommand('copy')) {
		document.execCommand('copy');
		message.info(messageText);
	}
    document.body.removeChild(input);
}

export {
    getSimple,
    copyToClip
}