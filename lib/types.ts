
export type QueryProps = {
    params: {[key: string]: string}
    searchParams: { [key: string]: string }
}

export type NavigationProps = {
    name: string;
    link: string;
    active: boolean;
    onLeft: boolean;
    onRight: boolean;
};