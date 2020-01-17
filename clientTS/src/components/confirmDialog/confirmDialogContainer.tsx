import component, { IComponentProps } from './confirmDialogComponent'
import { createConfirmation } from 'react-confirm'

const confirm = createConfirmation(component);
/*
export default function(options: IComponentProps) {
	return confirm({ ...options })
};
*/

export default function(title: string, options = {okLabel: "OK", cancelLabel:"CANCEL"}) {
	return confirm({ title, ...options })
};
