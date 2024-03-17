// import React, { useState } from "react";
// import MonacoEditor from "react-monaco-editor";

// const PythonEditor = () => {
//   const [code, setCode] = useState("");
//   const [output, setOutput] = useState("");
//   const [error, setError] = useState("");

//   const onChange = (newValue) => {
//     setCode(newValue);
//   };

//   const executeCode = async () => {
//     try {
//       const response = await fetch("http://localhost:5000/api/execute-python", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ code }),
//       });

//       if (!response.ok) {
//         throw new Error("Failed to execute Python code");
//       }

//       const data = await response.json();
//       setOutput(data.output);
//       setError("");
//     } catch (error) {
//       setError(error.message);
//       setOutput("");
//     }
//   };

//   return (
//     <div>
//       <div>
//         <div className="bg-[#444444] flex justify-between ">
//           <div>
//             {" "}
//             <p className="text-white ml-5  font-bold text-sm mt-2 mr-4">
//               This is a Python code editor
//             </p>
//           </div>
//           <div>
//             <button
//               className="bg-blue-500 text-white hover:bg-blue-800  text-base px-2 py-1 my-1  font-bold mr-4 rounded-sm"
//               onClick={executeCode}
//             >
//               Run
//             </button>
//           </div>
//         </div>
//         <div className="h-[400px]">
//           <MonacoEditor
//             language="python"
//             theme="vs-dark"
//             value={code}
//             options={{
//               selectOnLineNumbers: true,
//               automaticLayout: true,
//             }}
//             onChange={onChange}
//           />
//           <div className="bg-[#444444] text-white px-4 py-2 h-[162px] ">
//             <h2 className="font-bold text-sm  mb-2">Output Console :</h2>
//             {output && <div>Output: {output}</div>}
//             {error && <div>Error: {error}</div>}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
// export default PythonEditor;
