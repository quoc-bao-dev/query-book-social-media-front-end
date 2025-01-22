export const getFirstCharacter = (name: string): string => {
    return name
        .split(' ')
        .map((word) => word.charAt(0))
        .join(' ');
};
