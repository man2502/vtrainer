import { FC } from "react";
import { useAppSelector } from "store/hook";



interface IProps {
    children: React.ReactNode
}

const AppLayout: FC<IProps> = ({ children }: IProps) => {
    const { videos } = useAppSelector((state) => state.video)
    return (
        <div className="container mx-auto bg-white h-full p-3 relative">
            <header className="p-3">
                <h1 className="font-semibold">
                    Videos {videos.length}
                </h1>
            </header>
            {children}
            <div className="absolute bottom-6 left-0 right-0 flex justify-center">
                <button className="inline-block bg-green-500 hover:bg-green-800 duration-200 text-white w-28 py-3 rounded-md font-semibold">Start</button>
            </div>
        </div>
    )
}


export default AppLayout