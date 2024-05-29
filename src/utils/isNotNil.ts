export const isNotNil = <T>(subj: T): subj is NonNullable<T> => {
	return subj !== undefined && subj !== null;
};
