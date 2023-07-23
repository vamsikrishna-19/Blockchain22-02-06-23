// import React, { useEffect, useState } from 'react';

// const ProgressBar = () => {
//   const [progress, setProgress] = useState(0);
//   const [timer, setTimer] = useState(null);

//   useEffect(() => {
//     setTimer(
//       setInterval(() => {
//         // Increment the progress by 10% every second
//         setProgress((prevProgress) => prevProgress + 20);
//       }, 500)
//     );

//     // Clear the timer when the component unmounts or when progress reaches 100%
//     return () => {
//       clearInterval(timer);
//     };
//   }, []);

//   useEffect(() => {
//     // When progress reaches 100%, stop the timer
//     if (progress === 100) {
//       clearInterval(timer);
//     }
//   }, [progress, timer]);

//   // Determine the color based on progress value
//   // const getColor = () => {
//   //   if (progress < 33) {
//   //     return 'red';
//   //   } else if (progress < 66 && progress>33) {
//   //     return 'yellow';
//   //   } else {
//   //     return 'green';
//   //   }
//   // };

//   return (
//     <>
//       <div className='container ' >

//     <div className="progress-bar " style={{border:'1px', background:""}}>
//       <div className="progress" style={{ width: `${progress}%`, background: "light-blue" }}></div>
//     </div>
//       </div>
//     </>
//   );
// };

// export default ProgressBar;
