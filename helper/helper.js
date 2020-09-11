import Color from 'color';
import store from '../store/store';
import { msgToIFrame } from './callbackUtils';
import { displayView } from '../actions/stepActions';

export default {
  capitalizeOnlyFirstChar: (str) => {
    str = str.toLowerCase();
    return str.split(' ').filter(Boolean).map(word => (
      word[0].toUpperCase() + word.slice(1)
    )).join(' ');
  },

  getRandomInt: (max, min) => {
    if (min) return Math.floor(Math.random() * (max - Math.floor(min) + 1)) + Math.floor(min);
    return Math.floor(Math.random() * Math.floor(max));
  },

  updateItemColor: (items, targetId, newColor) => {
    return items.map(item => item.id === targetId ? { ...item, color: newColor } : item);
  },

  openBase64(base64URL, fileType) { // Display a base64 URL inside an iframe in another window.
    const win = window.open();
    if (fileType === 'image') win.document.write(`<img src="${base64URL}" style="border:0; top:0px; left:0px; bottom:0px; right:0px; max-width:100%; max-height:100%;"/>`);
    else win.document.write(`<iframe src="${base64URL}" frameborder="0" style="border:0; top:0px; left:0px; bottom:0px; right:0px; width:100%; height:100%;" allowfullscreen></iframe>`);
  },
  shortenFileName(str, maxLen) {
    if (str.length <= maxLen) return str;

    let firstHalf = str.split('.');
    const end = `.${firstHalf.pop()}`;

    firstHalf = firstHalf.join('').split('');
    const secondHalf = firstHalf.splice(firstHalf.length / 2);

    let i = firstHalf.length + secondHalf.length + end.length + 3;
    let popFirstHalf = false;
    while (i > maxLen) {
      if (popFirstHalf) firstHalf.pop();
      else if (secondHalf.length > 1) secondHalf.shift();
      popFirstHalf = !popFirstHalf;
      i -= 1;
    }
    return `${firstHalf.join('')}...${secondHalf.join('')}${end}`;
  },
  hoverColor(buttonColor) {
    let color = buttonColor ? `${buttonColor}` : '#080808';
    let lightenFactor;
    let hoverColor = Color(`${color}`).darken(0.2).hex();
    if (color === '#000000') {
      color = '#080808';
      lightenFactor = 6;
      hoverColor = Color(color).lighten(lightenFactor).hex();
    }
    return hoverColor;
  },
  dataToCallback(type, obj) {
    const stepReducer = store.getState().stepReducer;
    const disputeReducer = store.getState().disputeReducer;
    const isWebView = stepReducer.keys.isWebview;
    const userId = stepReducer.userInfo ? stepReducer.userInfo._id : null;
    const step_name = stepReducer.currentStep ? stepReducer.currentStep.stepName : null;
    const institution_name = disputeReducer.bankFullName;
    const time = Date.now();
    if (isWebView) {
      // communication between chatbot and app through url
      const baseURL = `chatbot://${type}?user_id=${userId}&step_name=${step_name}&type=${type}`;
      if (type === 'exit') {
        window.location.href = baseURL;
        store.dispatch(displayView(false));
      } else if (type === 'success') {
        window.location.href = `${baseURL}&nodes=${obj.linkedNode}&institution_name=${institution_name}`;
      } else if (type === 'error') {
        window.location.href = `${baseURL}&error_code=${obj.err_code}&http_code=${obj.http_code}&error_message=${obj.error_message}&institution_name=${institution_name}&time=${time}`;
      }
    } else {
      const exit_obj = {
        userId,
        institution_name,
        step_name,
        type
      };
      const dataObj = { ...exit_obj, ...obj };
      msgToIFrame(exit_obj.type, dataObj);
    }
  }
};
