import React from 'react';
import {
	useForm,
	useField,
	lengthMoreThan,
	notEmpty,
	numericString
} from '@shopify/react-form';

const inquiryOption = [
	{label: 'ご注文前', value: 'ご注文前'},
	{label: 'ご注文後', value: 'ご注文後'},
	{label: 'お届け後', value: 'お届け後'},
	{label: 'その他', value: 'その他'}
];

export const Form = () => {
	// fields, submit, submitting, dirty, reset, submitErrors
	const { fields, submit } = useForm({
		fields: {
			name: useField({
				value: '',
				validates: [
					notEmpty('必須項目です'),
				]
			}),
			phone: useField({
				value: '',
				validates: [
					notEmpty('必須項目です'),
					(phone) => {
						const num = phone.replace(/[━.*‐.*―.*－.*\-.*ー.*\-]/gi,'');
						if (!num.match(/^(0[5-9]0[0-9]{8}|0[1-9][1-9][0-9]{7})$/)) return '数字とハイフンで入力してください';
					},
				]
			}),
			mail: useField({
				value: '',
				validates: [
					notEmpty('必須項目です'),
					(mail) => {
						if (!mail.match(/.+@.+\..+/)) return 'メールアドレスの形式で入力してください';
					},
				]
			}),
			inquiry: useField({
				value: '',
				validates: []
			}),
		},
		onSubmit: async (fieldValues) => {
			console.log(fieldValues);
			await new Promise((resolve) => setTimeout(resolve, 2000));
			const result = fieldValues.inquiry === 'お届け後'
				?
					{
						status: 'fail' as const,
						errors: [
							{message: '氏名は必須項目です', field: ['name']},
							{message: '電話版号は必須項目です', field: ['phone']},
						]
					}
				: {
					status: "success" as const
				}
			;
			return result;
		}
	});

	return (
		<form method="post" action="/contact#contact_form" id="ContactForm" accept-charset="UTF-8" className="contact-form" onSubmit={submit}>
			<input type="hidden" name="form_type" value="contact" />
			<input type="hidden" name="utf8" value="✓" />
			<div className="contact__fields">
				<div className="field">
					<input
						type="text"
						className="field__input"
						autoComplete="name"
						id="ContactForm-name"
						name="contact[お名前]"
						{...fields.name}
					/>
					<label className="field__label" htmlFor="ContactForm-name">氏名</label>
				</div>
				<div className="contact__button">
					<button type="submit" className="button">送信する</button>
				</div>
			</div>
		</form>
	)
}
