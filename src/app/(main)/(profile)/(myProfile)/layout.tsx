import { PropsWithChildren } from "react"

const layout = ({ children }: PropsWithChildren) => {
    return (
        <div> layout{children}</div>
    )
}

export default layout