type LoadingProps = {
    color?: string;
}

export default function LoadingSM({ color }: LoadingProps) {
    return (
        <div className="spinner-2" style={ { borderColor: color ? color : "#fff transparent" }} />
    )
}