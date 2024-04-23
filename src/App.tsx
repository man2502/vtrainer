import AppLayout from "Components/layouts/AppLayout";
import { FC } from "react";



const App: FC = () => {
    return (
        <div className="h-screen w-full bg-gray-100">
            <AppLayout>
                main page
            </AppLayout>
        </div>
    )
}


export default App