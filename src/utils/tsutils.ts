import {ComponentType} from 'react';

export type DeepPartial<T> = T extends Function
	? T
	: (T extends object
		? T extends unknown[]
			? DeepPartial<T[number]>[]
			: { [P in keyof T]?: DeepPartial<T[P]>; }
		: T
	);

export type ObjectOmit<T extends {}, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;

export type PropsType<T extends ComponentType<any>> = T extends ComponentType<infer P> ? P : any;

export type RequiredOne<
	T1 extends object,
	T2 extends object,
	T3 = null,
	T4 = null,
	T5 = null> =
	T3 extends null ? (T1 & Partial<T2>) | (T2 & Partial<T1>) :
		T4 extends null ? (T1 & Partial<T2 & T3>) | (T2 & Partial<T1 & T3>) | (T3 & Partial<T1 & T2>) :
			T5 extends null ? (T1 & Partial<T2 & T3 & T4>) | (T2 & Partial<T1 & T3 & T4>) | (T3 & Partial<T1 & T2 & T4>) | (T4 & Partial<T1 & T2 & T3>) :
				(T1 & Partial<T2 & T3 & T4 & T5>) | (T2 & Partial<T1 & T3 & T4 & T5>) | (T3 & Partial<T1 & T2 & T4 & T5>) | (T4 & Partial<T1 & T2 & T3 & T5>) | (T5 & Partial<T1 & T2 & T3 & T4>)

export type PartialProps<T extends object, P extends keyof T> = Partial<Pick<T, P>> & ObjectOmit<T, P>;
export type RequiredProps<T extends object, P extends keyof T> = Required<Pick<T, P>> & ObjectOmit<T, P>;

export type ValueOf<T> = T[keyof T];

export const objectKeys = Object.keys as <T extends object>(obj: T) => (keyof T)[];

interface ObjectEntries {
	<T extends object>(obj: T): Array<
	Exclude<ValueOf<{
		[K in keyof T]: [K, T[K]]
	}>, undefined>
	>
}
export const objectEntries = Object.entries as ObjectEntries;

export type Module<P = any> =
	| {
		default?: P
		[x: string]: any
	}
	| {
		exports?: P
		[x: string]: any
	};

export type KeysOfType<T, U> = { [K in keyof T]: T[K] extends U ? K : never }[keyof T];

export const hasKey = <T extends object>(object: T, key: string | number | symbol): key is keyof T => key in object;

type UnknownTypesMap = {
	string: string
	number: number
	bigint: BigInteger
	boolean: boolean
	symbol: symbol
	object: Record<string, unknown>
	function: (...ars: unknown[]) => unknown
}

export const getUnknownProp = <P extends string, T extends keyof UnknownTypesMap, D = undefined>
(subj: unknown, prop: P, type: T, d?: D) => {
	if (typeof subj === 'object' && subj !== null && hasKey(subj, prop) && typeof subj[prop] === type) {
		const r = subj[prop] as UnknownTypesMap[T];
		return r;
	}

	return d;
};

export type MaybeArray<T> = T | T[];

export type NullableObject<T> = {
	[P in keyof T]: T[P] | null;
};

export type NullableProperties<T, K extends keyof T = keyof T> = {
	[P in keyof T]: P extends K ? T[P] | null : T[P];
}

export type NonNullableProperties<T, K extends keyof T = keyof T> = {
	[P in keyof T]-?: P extends K ? NonNullable<T[P]> : T[P];
}

export type UnknownFunction = (...args: unknown[]) => unknown;

type PathImpl<T, K extends keyof T> =
	K extends string
		? T[K] extends Record<string, any>
			? T[K] extends ArrayLike<any>
				? K | `${K}.${PathImpl<T[K], Exclude<keyof T[K], keyof any[]>>}`
				: K | `${K}.${PathImpl<T[K], keyof T[K]>}`
			: K
		: never;

export type ObjectPath<T> = PathImpl<T, keyof T> | keyof T;

export type ObjectPathValue<T, P extends ObjectPath<T>> =
	P extends `${infer K}.${infer Rest}`
		? K extends keyof T
			? Rest extends ObjectPath<T[K]>
				? ObjectPathValue<T[K], Rest>
				: never
			: never
		: P extends keyof T
			? T[P]
			: never;

export const getEnumKey = <T>(enumObj: T, val: ValueOf<T>) => {
	return enumObj[val as unknown as keyof T] as unknown as keyof T;
};
