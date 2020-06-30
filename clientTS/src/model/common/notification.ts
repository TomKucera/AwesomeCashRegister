export type NotificationTypeType = void | 'error' | 'success' | 'info';

export type NotificationAction = {
	label: string,
	fn: () => void,
};

export type NotificationType = {
	message: string,
	type: NotificationTypeType,
	secondaryAction?: NotificationAction,
};

export type ValidationError = {
	code: string,
	message?: string,
	//params?: any,
	fields?: Array<ValidationFieldError>,
};

export type ValidationFieldError = {
	name: string,
	code: string,
	message?: string,
	//params?: any,
};