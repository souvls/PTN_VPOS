import React from "react";
import { RadioGroup, Radio } from "@nextui-org/react";

export default function App() {
    const [selected, setSelected] = React.useState<string>("");

    React.useEffect(() => {
        const x = localStorage.getItem("papersize");
        if (x) {
            setSelected(x)
        }
    }, [])
    const handleChange = (e: string) => {
        setSelected(e);
        localStorage.setItem("papersize", e);
    }
    return (
        <div className="flex justify-start gap-3">
            <span>ຂະໜາດໃບບິນ</span>
            <RadioGroup
                value={selected}
                onValueChange={handleChange}
                orientation="horizontal"
            >
                <Radio value="A4">A4</Radio>
                <Radio value="A5">A5</Radio>
            </RadioGroup>
        </div>
    );
}
