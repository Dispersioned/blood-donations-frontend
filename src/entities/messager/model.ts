import { AlertColor } from '@mui/material';
import { createEvent, createStore } from 'effector';

type Message = {
  type?: AlertColor;
  msg: string;
};

export const showMessage = createEvent<Message>();
export const showError = showMessage.prepend<Message>((payload) => ({ ...payload, type: 'error' }));
export const closeMessage = createEvent();

export const $shown = createStore(false);
export const $msg = createStore('');
export const $type = createStore<AlertColor | null>(null);

$shown.on(showMessage, () => true);
$shown.on(closeMessage, () => false);
$msg.on(showMessage, (_, payload) => payload.msg);
$type.on(showMessage, (_, payload) => payload.type);
