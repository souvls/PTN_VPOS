import * as React from "react";
import { Spinner } from "@nextui-org/react";
export default function page() {
    return (
        <div className=" absolute w-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex justify-center items-center  h-screen bg-black bg-opacity-25  z-50">
            <Spinner label="ກຳລັງໂຫຼດ..." color="default" labelColor="foreground" />
        </div>
    );
}