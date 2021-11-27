export const getEnv = <T>(name: string): T | string => {
    return (process.env[`REACT_APP_${name}`] as unknown) as T;
};

export const nonmut = (obj: any): any => {
    return {
        ...obj,
    } as const;
};