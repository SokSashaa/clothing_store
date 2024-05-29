export const isNotFalsy = <T>(subj: T): subj is NonNullable<T> => {
	return Boolean(subj);
};
