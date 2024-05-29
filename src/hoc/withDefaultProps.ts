import {ComponentType} from 'react';

export type OuterPropsWithDefaults<P extends {[K in keyof D]?: P[K]}, D extends {[K in keyof D]?: P[K]}> = Omit<P, keyof D> &
	Partial<Pick<P, keyof D>>

interface WithDefaultProps {
	<P extends {[K in keyof D]?: P[K]}, D extends {[K in keyof D]?: P[K]}>(defaultProps: D, Component: ComponentType<P>): ComponentType<OuterPropsWithDefaults<P, D>>
}

export const withDefaultProps = function (defaultProps: any, Component: any) {
	Component.defaultProps = defaultProps;

	return Component;
} as WithDefaultProps;
