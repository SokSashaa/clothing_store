// Type definitions for react-input-mask 2.0
// Project: https://github.com/sanniassin/react-input-mask
// Definitions by: Alexandre Paré <https://github.com/apare>
//                 Dima Danylyuk <https://github.com/dima7a14>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// TypeScript Version: 2.9
//
// edited

import * as React from 'react';

type Omit<T extends object, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export interface Selection {
	start: number;
	end: number;
}

export interface InputState {
	value: string;
	selection: Selection | null;
}

export interface MaskOptions {
	mask: string;
	maskChar: string;
	alwaysShowMask: boolean;
	formatChars: Record<string, string>;
	permanents: number[];
}

export interface ReactInputMaskRenderProp {
	/**
	 * To use another component instead of regular <input /> pass render function
	 * as a children. Function receives props argument which contains props that
	 * aren't used by react-input-mask's internals. I.e. it passes down every prop
	 * except the following ones:
	 * onChange, onPaste, onMouseDown, onFocus, onBlur, value, disabled, readOnly.
	 * These properties, if used, should always be passed directly to react-input-mask
	 * instead of children and shouldn't be altered in chldren's function.
	 */
	(
		inputProps: Omit<
			React.InputHTMLAttributes<HTMLInputElement>,
			'onChange' | 'onPaste' | 'onMouseDown' | 'onFocus' | 'onBlur' | 'value' | 'disabled' | 'readOnly'
			>
	) : React.ReactNode
}

export interface ReactInputMaskOwnProps {
	/**
	 * Mask string. Format characters are:
	 * * `9`: `0-9`
	 * * `a`: `A-Z, a-z`
	 * * `\*`: `A-Z, a-z, 0-9`
	 *
	 * Any character can be escaped with backslash, which usually will appear as double backslash in JS strings.
	 * For example, German phone mask with unremoveable prefix +49 will look like `mask="+4\\9 99 999 99"` or
	 * `mask={"+4\\\\9 99 999 99"}`
	 */
	mask: string;
	/**
	 * Character to cover unfilled editable parts of mask. Default character is "_". If set to null, unfilled parts
	 * will be empty, like in ordinary input.
	 */
	maskChar?: string | null;
	/**
	 * Defines format characters with characters as keys and corresponding RegExp string as values. Default ones:
	 * ```
	 * {
	 *   "9": "[0-9]",
	 *   "a": "[A-Za-z]",
	 *   "*": "[A-Za-z0-9]"
	 * }```
	 */
	formatChars?: { [key: string]: string };
	/**
	 * Show mask even in empty input without focus.
	 */
	alwaysShowMask?: boolean;
	/**
	 * Use inputRef instead of ref if you need input node to manage focus, selection, etc.
	 */
	inputRef?: React.Ref<HTMLInputElement>;

	/**
	 * In case you need to implement more complex masking behavior, you can provide
	 * beforeMaskedValueChange function to change masked value and cursor position
	 * before it will be applied to the input.
	 */
	beforeMaskedValueChange?(
		newState: InputState,
		oldState: InputState,
		userInput: string,
		maskOptions: MaskOptions,
	): InputState;

	children?: React.ReactNode | ReactInputMaskRenderProp

}

export interface ReactInputMaskProps extends ReactInputMaskOwnProps,
                                             Omit<React.InputHTMLAttributes<HTMLInputElement>, 'children'> {}



declare class ReactInputMask extends React.Component<ReactInputMaskProps> {
}

export default ReactInputMask;
