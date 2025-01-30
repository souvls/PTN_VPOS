// import React from "react";
// import { Switch } from "@nextui-org/react";

// export default function App() {
//     const [isSelected, setIsSelected] = React.useState<boolean>();
//     React.useEffect(() => {
//         const value = localStorage.getItem('autoqty');
//         if (value) {
//             setIsSelected(JSON.parse(value))
//         }
//     }, [])
//     const handleChange = (e: boolean) => {
//         setIsSelected(e);
//         localStorage.setItem("autoqty", JSON.stringify(e));
//     }
//     return (
//         <div className="flex flex-col gap-2">
//             <Switch isSelected={isSelected} onValueChange={handleChange}>
//                 ຈຳນວນສິນຄ້າ ອັດຕະໂນມັດ
//             </Switch>
//         </div>
//     )
// }
