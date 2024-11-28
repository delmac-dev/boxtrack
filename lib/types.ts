
export type QueryProps = {
    params: {[key: string]: string}
    searchParams: { [key: string]: string }
}

type LucideIconType = React.FunctionComponent<React.SVGProps<SVGSVGElement>>;

export type NavigationProps = {
    name: string;
    icon?: LucideIconType,
    link?: string;
    active?: boolean;
    onLeft?: boolean;
    onRight?: boolean;
};