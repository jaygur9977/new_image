
// import React, { useState } from 'react';
// import axios from 'axios';
// import { AiOutlineLoading3Quarters, AiOutlineDelete } from 'react-icons/ai';
// import { v4 as uuidv4 } from 'uuid';
// import { jsPDF } from 'jspdf';


// const Home = () => {
//   const [user, setUser] = useState(null);
//   const [previewFiles, setPreviewFiles] = useState([]);
//   const [uploadStatus, setUploadStatus] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [extractedTexts, setExtractedTexts] = useState({});
//   const [generatedAnswers, setGeneratedAnswers] = useState({});
//   const [purpose, setPurpose] = useState('');
//   const [answerType, setAnswerType] = useState('');
//   const [projectDetails, setProjectDetails] = useState({ paragraphs: 3, words: 300 });



//   const handleFileChange = (event) => {
//     const files = event.target.files;
//     if (files && files.length > 0) {
//       const newPreviewFiles = [];
//       for (let i = 0; i < files.length; i++) {
//         const file = files[i];
//         newPreviewFiles.push({
//           id: uuidv4(),
//           name: file.name,
//           url: URL.createObjectURL(file),
//           uploaded: false,
//         });
//       }
//       setPreviewFiles((prevFiles) => [...prevFiles, ...newPreviewFiles]);
//     }
//   };

//   const handleUpload = async () => {
//     setLoading(true);
//     const formData = new FormData();
//     const files = document.querySelector('input[type="file"]').files;

//     for (let i = 0; i < files.length; i++) {
//       formData.append('files', files[i]);
//     }

//     if (user) {
//       formData.append('userId', user.sub);
//     }

//     try {
//       const response = await axios.post('https://image-backed.onrender.com/upload', formData, {
//         headers: { 'Content-Type': 'multipart/form-data' },
//       });
//       setUploadStatus('Files uploaded successfully!');

//       const updatedFiles = previewFiles.map((file) => ({ ...file, uploaded: true }));
//       setPreviewFiles(updatedFiles);

//       const texts = {};
//       response.data.savedFiles.forEach((file) => {
//         texts[file.originalName] = file.extractedText;
//       });
//       setExtractedTexts(texts);
//     } catch (error) {
//       console.error(error);
//       setUploadStatus('Failed to upload files. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDeletePhoto = (id) => {
//     const updatedFiles = previewFiles.filter((file) => file.id !== id);
//     setPreviewFiles(updatedFiles);
//   };

//   const handleSubmit = async (fileName, text) => {
//     const userQuestion = document.querySelector(`textarea[name="question-${fileName}"]`).value;

//     if (!userQuestion.trim()) {
//       alert('Please enter a question');
//       return;
//     }

//     try {
//       const response = await axios.post('https://image-backed.onrender.com/api/ask', {
//         text,
//         question: userQuestion,
//         purpose,
//         answerType,
//         projectDetails,
//       });

//       setGeneratedAnswers((prevAnswers) => ({
//         ...prevAnswers,
//         [fileName]: response.data.answer,
//       }));
//     } catch (error) {
//       console.error('Error submitting question:', error);
//       alert('Failed to get answer from AI');
//     }
//   };

//   const downloadPdf = () => {
//     const doc = new jsPDF();
//     let yOffset = 20;

//     Object.entries(extractedTexts).forEach(([fileName, text], index) => {
//       const question = document.querySelector(`textarea[name="question-${fileName}"]`).value;
//       const answer = generatedAnswers[fileName];

//       doc.setFontSize(16);
//       doc.setFont('helvetica', 'bold');
//       doc.text(`Question ${index + 1}: ${question}`, 10, yOffset);
//       yOffset += 45;

//       doc.setFontSize(12);
//       doc.setFont('helvetica', 'normal');
//       const splitAnswer = doc.splitTextToSize(answer, 180);
//       doc.text(splitAnswer, 10, yOffset);
//       yOffset += splitAnswer.length * 10 + 20;

//       if (yOffset > 280) {
//         doc.addPage();
//         yOffset = 20;
//       }
//     });

//     doc.save('Answer.pdf');
//   };

//   return (
//     <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center relative overflow-hidden pt-6">
//       <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
//         <div className="absolute -top-20 -left-20 w-96 h-96 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full opacity-20 animate-float"></div>
//         <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-gradient-to-r from-green-400 to-teal-500 rounded-full opacity-20 animate-float-reverse"></div>
//       </div>

//       <div className="relative z-10 text-center pb-4 text-gray-500 w-full">
//         <h1 className="text-6xl sm:text-8xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600 animate-text-glow">
//           AI-Powered Image Recognizer
//         </h1>

//         <p className="mt-6 text-xl sm:text-2xl text-gray-400 max-w-2xl mx-auto animate-fade-in">
//           Harness the power of artificial intelligence to analyze and recognize images with unparalleled accuracy.
//         </p>


//           <>


//             <div className="mt-8">
//               <h2 className="text-2xl font-semibold text-gray-300 mb-4">What is the purpose of this photo?</h2>
//               <div className="flex flex-col sm:flex-row gap-4 justify-center">
//                 <button
//                   onClick={() => setPurpose('education')}
//                   className={`px-4 py-4 text-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg transition-all duration-300 shadow-lg ${purpose === 'education' ? 'ring-4 ring-blue-400' : 'hover:from-blue-500 hover:to-purple-500 hover:scale-105 hover:shadow-xl'}`}
//                 >
//                   Education
//                 </button>
//                 <button
//                   onClick={() => setPurpose('finance')}
//                   className={`px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-green-600 to-teal-600 rounded-lg transition-all duration-300 shadow-lg ${purpose === 'finance' ? 'ring-4 ring-green-400' : 'hover:from-green-700 hover:to-teal-700 hover:scale-105 hover:shadow-xl'}`}
//                 >
//                   Finance
//                 </button>
//                 <button
//                   onClick={() => setPurpose('health')}
//                   className={`px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-red-600 to-pink-600 rounded-lg transition-all duration-300 shadow-lg ${purpose === 'health' ? 'ring-4 ring-red-400' : 'hover:from-red-700 hover:to-pink-700 hover:scale-105 hover:shadow-xl'}`}
//                 >
//                   Health
//                 </button>
//               </div>
//             </div>

//             {purpose === 'education' && (
//               <div className="mt-8">
//                 <h2 className="text-2xl font-semibold text-gray-300 mb-4">What type of answer do you want?</h2>
//                 <div className="flex flex-col sm:flex-row gap-4 justify-center">
//                   <button
//                     onClick={() => setAnswerType('short')}
//                     className={`px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg transition-all duration-300 shadow-lg ${answerType === 'short' ? 'ring-4 ring-blue-400' : 'hover:from-blue-700 hover:to-purple-700 hover:scale-105 hover:shadow-xl'}`}
//                   >
//                     Short Answer
//                   </button>
//                   <button
//                     onClick={() => setAnswerType('one-word')}
//                     className={`px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-green-600 to-teal-600 rounded-lg transition-all duration-300 shadow-lg ${answerType === 'one-word' ? 'ring-4 ring-green-400' : 'hover:from-green-700 hover:to-teal-700 hover:scale-105 hover:shadow-xl'}`}
//                   >
//                     One-Word Answer
//                   </button>
//                   <button
//                     onClick={() => setAnswerType('long')}
//                     className={`px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-red-600 to-pink-600 rounded-lg transition-all duration-300 shadow-lg ${answerType === 'long' ? 'ring-4 ring-red-400' : 'hover:from-red-700 hover:to-pink-700 hover:scale-105 hover:shadow-xl'}`}
//                   >
//                     Long Answer
//                   </button>
//                   <button
//                     onClick={() => setAnswerType('project')}
//                     className={`px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-yellow-600 to-orange-600 rounded-lg transition-all duration-300 shadow-lg ${answerType === 'project' ? 'ring-4 ring-yellow-400' : 'hover:from-yellow-700 hover:to-orange-700 hover:scale-105 hover:shadow-xl'}`}
//                   >
//                     Project
//                   </button>
//                 </div>
//               </div>
//             )}

//             {answerType === 'project' && (
//               <div className="mt-8">
//                 <h2 className="text-2xl font-bold text-gray-300 mb-4">Project Details</h2>
//                 <div className="flex flex-col sm:flex-row gap-4 justify-center">
//                   <div className="p-4 bg-gray-800 rounded-lg">
//                     <label className="block text-gray-400 mb-2">Number of Paragraphs</label>
//                     <input
//                       type="number"
//                       min="1"
//                       max="10"
//                       className="p-2 rounded-lg bg-gray-700 text-white w-full"
//                       value={projectDetails.paragraphs}
//                       onChange={(e) => setProjectDetails({ 
//                         ...projectDetails, 
//                         paragraphs: Math.max(1, Math.min(10, parseInt(e.target.value) || 1)) 
//                       })}
//                     />
//                   </div>
//                   <div className="p-4 bg-gray-800 rounded-lg">
//                     <label className="block text-gray-400 mb-2">Number of Words</label>
//                     <input
//                       type="number"
//                       min="50"
//                       max="2000"
//                       className="p-2 rounded-lg bg-gray-700 text-white w-full"
//                       value={projectDetails.words}
//                       onChange={(e) => setProjectDetails({ 
//                         ...projectDetails, 
//                         words: Math.max(50, Math.min(2000, parseInt(e.target.value) || 100)) 
//                       })}
//                     />
//                   </div>
//                 </div>
//               </div>
//             )}

//             <div className="mt-12 animate-fade-in-up">
//               <div className="flex flex-col sm:flex-row gap-4 justify-center">
//                 <label className="inline-flex items-center px-4 py-4 text-lg font-semibold text-white bg-gradient-to-r from-gray-600 to-gray-700 rounded-lg cursor-pointer hover:from-gray-500 hover:to-gray-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
//                   <span className="mr-3 text-2xl">📁</span> Upload Files
//                   <input
//                     type="file"
//                     className="hidden"
//                     id="upload-files"
//                     multiple
//                     onChange={handleFileChange}
//                     accept="image/*"
//                   />
//                 </label>
//               </div>
//             </div>

//             {previewFiles.length > 0 && (
//               <div className="mt-8 w-full max-w-6xl mx-auto animate-fade-in">
//                 <h2 className="text-2xl font-semibold text-gray-300 mb-4">Your Files:</h2>
//                 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//                   {previewFiles.map((file) => (
//                     <div
//                       key={file.id}
//                       className="relative aspect-square overflow-hidden rounded-lg shadow-lg group"
//                     >
//                       <img
//                         src={file.url}
//                         alt={file.name}
//                         className={`w-full h-full object-cover transition-opacity ${file.uploaded ? 'opacity-50' : 'group-hover:opacity-80'}`}
//                       />
//                       <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 text-white p-2 text-sm truncate">
//                         {file.name}
//                       </div>
//                       <button
//                         onClick={() => handleDeletePhoto(file.id)}
//                         className="absolute top-2 right-2 p-2 bg-red-600 rounded-full hover:bg-red-700 transition-all duration-300 opacity-0 group-hover:opacity-100"
//                       >
//                         <AiOutlineDelete className="text-white" />
//                       </button>
//                     </div>
//                   ))}
//                 </div>

//                 <button
//                   onClick={handleUpload}
//                   disabled={loading || previewFiles.every((file) => file.uploaded)}
//                   className={`mt-6 px-8 py-4 text-lg font-semibold text-white rounded-lg transition-all duration-300 transform shadow-lg flex items-center justify-center gap-2 mx-auto ${
//                     loading || previewFiles.every((file) => file.uploaded)
//                       ? 'bg-gray-600 cursor-not-allowed'
//                       : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 hover:scale-105 hover:shadow-xl'
//                   }`}
//                 >
//                   {loading ? (
//                     <>
//                       <AiOutlineLoading3Quarters className="animate-spin" />
//                       Uploading...
//                     </>
//                   ) : (
//                     'Upload Files'
//                   )}
//                 </button>
//               </div>
//             )}

//             {Object.keys(extractedTexts).length > 0 && (
//               <div className="mt-8 w-full max-w-6xl mx-auto animate-fade-in">
//                 <h2 className="text-2xl font-semibold text-gray-300 mb-4">Extracted Texts:</h2>
//                 {Object.entries(extractedTexts).map(([fileName, text]) => (
//                   <div key={fileName} className="mb-8 bg-gray-800 rounded-lg p-6 shadow-xl">
//                     <h3 className="text-xl font-semibold text-gray-300 mb-2">{fileName}</h3>
//                     <div className="bg-gray-700 p-4 rounded-lg mb-4">
//                       <p className="text-gray-300 whitespace-pre-wrap">{text}</p>
//                     </div>
//                     <textarea
//                       className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg p-4 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                       name={`question-${fileName}`}
//                       placeholder="Ask your question about this text..."
//                       rows="3"
//                     />
//                     <button
//                       onClick={() => handleSubmit(fileName, text)}
//                       className="px-6 py-3 bg-gradient-to-r from-green-600 to-teal-600 text-white font-semibold rounded-lg hover:from-green-700 hover:to-teal-700 transition-all duration-300"
//                     >
//                       Get Answer
//                     </button>
//                     {generatedAnswers[fileName] && (
//                       <div className="mt-4 bg-gray-700 p-4 rounded-lg border border-gray-600">
//                         <h4 className="text-lg font-semibold text-gray-300 mb-2">AI Answer:</h4>
//                         <p className="text-gray-200 whitespace-pre-wrap">{generatedAnswers[fileName]}</p>
//                       </div>
//                     )}
//                   </div>
//                 ))}
//               </div>
//             )}

//             {Object.keys(generatedAnswers).length > 0 && (
//               <div className="mt-8 mb-12">
//                 <button
//                   onClick={downloadPdf}
//                   className="px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-yellow-600 to-orange-600 rounded-lg hover:from-yellow-700 hover:to-orange-700 transition-all duration-300 shadow-lg hover:shadow-xl"
//                 >
//                   Download PDF Report
//                 </button>

//                 <h2 className='font bold text 4xl text-red-400 pt-4'>Sorry only English translate pdf is downlode</h2>
//               </div>
//             )}

//             {uploadStatus && (
//               <div className={`mt-6 text-xl font-semibold ${
//                 uploadStatus.includes('success') ? 'text-green-500' : 'text-red-500'
//               } animate-fade-in`}>
//                 {uploadStatus}
//               </div>
//             )}
//           </>

//       </div>

//       <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-gray-900 to-transparent z-0">
//         <div className="grid grid-cols-6 gap-4 opacity-30">
//           {[...Array(30)].map((_, i) => (
//             <div
//               key={i}
//               className="w-4 h-4 bg-blue-500 rounded-full animate-pulse"
//               style={{ animationDelay: `${i * 0.1}s` }}
//             ></div>
//           ))}
//         </div>
//       </div>

//       <footer className="w-full text-center text-gray-600 py-4">
//         © {new Date().getFullYear()} AI Tech Solutions. All Rights Reserved.
//       </footer>
//     </div>
//   );
// };

// export default Home;



import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { AiOutlineLoading3Quarters, AiOutlineDelete } from 'react-icons/ai';
import { v4 as uuidv4 } from 'uuid';
import { jsPDF } from 'jspdf';
import { AiOutlineDownload } from 'react-icons/ai';

const Home = () => {
  const [user, setUser] = useState(null);
  const [previewFiles, setPreviewFiles] = useState([]);
  const [uploadStatus, setUploadStatus] = useState('');
  const [loading, setLoading] = useState(false);
  const [extractedTexts, setExtractedTexts] = useState({});
  const [generatedAnswers, setGeneratedAnswers] = useState({});
  const [purpose, setPurpose] = useState('');
  const [answerType, setAnswerType] = useState('');
  const [projectDetails, setProjectDetails] = useState({ paragraphs: 3, words: 300 });
  const [autoGenerate, setAutoGenerate] = useState(false);


  const downloadAnswer = (fileName, answer) => {
    const doc = new jsPDF();
    a
    doc.setProperties({
      title: `Analysis for ${fileName}`,
      subject: 'AI Document Analysis',
      author: 'AI Document Analyzer',
    });

    doc.setFontSize(16);
    doc.setTextColor(40, 40, 40);
    doc.text(`Document: ${fileName}`, 15, 20);

    doc.setFontSize(14);
    doc.text('AI Analysis Results:', 15, 30);

    doc.setFontSize(12);
    doc.setTextColor(60, 60, 60);

    const splitText = doc.splitTextToSize(answer, 180);
    let yPosition = 40;

    splitText.forEach((line) => {
      if (yPosition > 270) {
        doc.addPage();
        yPosition = 20;
      }
      doc.text(line, 15, yPosition);
      yPosition += 7;
    });

    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text('Generated by AI Document Analyzer',
      doc.internal.pageSize.width / 2,
      doc.internal.pageSize.height - 10,
      { align: 'center' }
    );

    doc.save(`${fileName.replace(/\.[^/.]+$/, "")}-analysis.pdf`);
  };


  useEffect(() => {
    if (autoGenerate && Object.keys(extractedTexts).length > 0) {
      Object.entries(extractedTexts).forEach(([fileName, text]) => {
        generateDefaultAnswer(fileName, text);
      });
      setAutoGenerate(false);
    }
  }, [extractedTexts, autoGenerate]);

  const handleFileChange = (event) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const newPreviewFiles = [];
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        newPreviewFiles.push({
          id: uuidv4(),
          name: file.name,
          url: URL.createObjectURL(file),
          uploaded: false,
        });
      }
      setPreviewFiles((prevFiles) => [...prevFiles, ...newPreviewFiles]);
    }
  };

  const handleUpload = async () => {
    setLoading(true);
    const formData = new FormData();
    const files = document.querySelector('input[type="file"]').files;

    for (let i = 0; i < files.length; i++) {
      formData.append('files', files[i]);
    }

    if (user) {
      formData.append('userId', user.sub);
    }

    try {
      const response = await axios.post('https://image-backed.onrender.com/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setUploadStatus('Files uploaded successfully!');

      const updatedFiles = previewFiles.map((file) => ({ ...file, uploaded: true }));
      setPreviewFiles(updatedFiles);

      const texts = {};
      response.data.savedFiles.forEach((file) => {
        texts[file.originalName] = file.extractedText;
      });
      setExtractedTexts(texts);
      setAutoGenerate(true);
    } catch (error) {
      console.error(error);
      setUploadStatus('Failed to upload files. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const generateDefaultAnswer = async (fileName, text) => {
    let defaultQuestion = "";

    if (purpose === 'education') {
      if (answerType === 'short') {
        defaultQuestion = "Provide a short summary of this educational content";
      } else if (answerType === 'one-word') {
        defaultQuestion = "What is the main topic of this content? Answer in one word.";
      } else if (answerType === 'long') {
        defaultQuestion = "Explain this educational content in detail";
      } else if (answerType === 'project') {
        defaultQuestion = `Create a detailed project report with ${projectDetails.paragraphs} paragraphs and approximately ${projectDetails.words} words`;
      } else {
        defaultQuestion = "Summarize the key educational points from this content";
      }
    } else if (purpose === 'finance') {
      defaultQuestion = "Analyze the financial data in this document and provide key insights";
    } else if (purpose === 'health') {
      defaultQuestion = "Explain the medical information in this document in clear terms";
    } else {
      defaultQuestion = "Summarize the key points from this document";
    }

    try {
      const response = await axios.post('https://image-backed.onrender.com/api/ask', {
        text,
        question: defaultQuestion,
        purpose,
        answerType,
        projectDetails,
      });

      setGeneratedAnswers((prevAnswers) => ({
        ...prevAnswers,
        [fileName]: response.data.answer,
      }));
    } catch (error) {
      console.error('Error generating default answer:', error);
    }
  };

  const handleSubmit = async (fileName, text, customQuestion = null) => {
    const question = customQuestion || document.querySelector(`textarea[name="question-${fileName}"]`).value;

    if (!question.trim()) {
      alert('Please enter a question');
      return;
    }

    try {
      const response = await axios.post('https://image-backed.onrender.com/api/ask', {
        text,
        question,
        purpose,
        answerType,
        projectDetails,
      });

      setGeneratedAnswers((prevAnswers) => ({
        ...prevAnswers,
        [fileName]: response.data.answer,
      }));
    } catch (error) {
      console.error('Error submitting question:', error);
      alert('Failed to get answer from AI');
    }
  };

  const handleDeletePhoto = (id) => {
    const updatedFiles = previewFiles.filter((file) => file.id !== id);
    setPreviewFiles(updatedFiles);
  };



  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center relative overflow-hidden pt-6">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        <div className="absolute -top-20 -left-20 w-96 h-96 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full opacity-20 animate-float"></div>
        <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-gradient-to-r from-green-400 to-teal-500 rounded-full opacity-20 animate-float-reverse"></div>
      </div>

      <div className="relative z-10 text-center pb-4 text-gray-500 w-full">
        <h1 className="text-6xl sm:text-8xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600 animate-text-glow">
          AI Document Analyzer
        </h1>

        <p className="mt-6 text-xl sm:text-2xl text-gray-400 max-w-2xl mx-auto animate-fade-in">
          Upload documents and get instant AI-powered analysis based on your needs.
        </p>

        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-gray-300 mb-4">What is the purpose of your document?</h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setPurpose('education')}
              className={`px-4 py-4 text-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg transition-all duration-300 shadow-lg ${purpose === 'education' ? 'ring-4 ring-blue-400' : 'hover:from-blue-500 hover:to-purple-500 hover:scale-105 hover:shadow-xl'}`}
            >
              Education
            </button>
            <button
              onClick={() => setPurpose('finance')}
              className={`px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-green-600 to-teal-600 rounded-lg transition-all duration-300 shadow-lg ${purpose === 'finance' ? 'ring-4 ring-green-400' : 'hover:from-green-700 hover:to-teal-700 hover:scale-105 hover:shadow-xl'}`}
            >
              Finance
            </button>
            <button
              onClick={() => setPurpose('health')}
              className={`px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-red-600 to-pink-600 rounded-lg transition-all duration-300 shadow-lg ${purpose === 'health' ? 'ring-4 ring-red-400' : 'hover:from-red-700 hover:to-pink-700 hover:scale-105 hover:shadow-xl'}`}
            >
              Health
            </button>
          </div>
        </div>

        {purpose === 'education' && (
          <div className="mt-8">
            <h2 className="text-2xl font-semibold text-gray-300 mb-4">What type of analysis do you need?</h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => setAnswerType('short')}
                className={`px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg transition-all duration-300 shadow-lg ${answerType === 'short' ? 'ring-4 ring-blue-400' : 'hover:from-blue-700 hover:to-purple-700 hover:scale-105 hover:shadow-xl'}`}
              >
                Short Summary
              </button>
              <button
                onClick={() => setAnswerType('one-word')}
                className={`px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-green-600 to-teal-600 rounded-lg transition-all duration-300 shadow-lg ${answerType === 'one-word' ? 'ring-4 ring-green-400' : 'hover:from-green-700 hover:to-teal-700 hover:scale-105 hover:shadow-xl'}`}
              >
                Main Topic
              </button>
              <button
                onClick={() => setAnswerType('long')}
                className={`px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-red-600 to-pink-600 rounded-lg transition-all duration-300 shadow-lg ${answerType === 'long' ? 'ring-4 ring-red-400' : 'hover:from-red-700 hover:to-pink-700 hover:scale-105 hover:shadow-xl'}`}
              >
                Detailed Explanation
              </button>
              <button
                onClick={() => setAnswerType('project')}
                className={`px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-yellow-600 to-orange-600 rounded-lg transition-all duration-300 shadow-lg ${answerType === 'project' ? 'ring-4 ring-yellow-400' : 'hover:from-yellow-700 hover:to-orange-700 hover:scale-105 hover:shadow-xl'}`}
              >
                Project Report
              </button>
            </div>
          </div>
        )}

        {answerType === 'project' && (
          <div className="mt-8">
            <h2 className="text-2xl font-bold text-gray-300 mb-4">Project Details</h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <div className="p-4 bg-gray-800 rounded-lg">
                <label className="block text-gray-400 mb-2">Number of Paragraphs</label>
                <input
                  type="number"

                  className="p-2 rounded-lg bg-gray-700 text-white w-full"
                  value={projectDetails.paragraphs}
                  onChange={(e) => setProjectDetails({
                    ...projectDetails,
                    paragraphs: parseInt(e.target.value)
                  })}
                />
              </div>
              <div className="p-4 bg-gray-800 rounded-lg">
                <label className="block text-gray-400 mb-2">Number of Words</label>
                <input
                  type="number"
                  className="p-2 rounded-lg bg-gray-700 text-white w-full"
                  value={projectDetails.words}
                  onChange={(e) => setProjectDetails({
                    ...projectDetails,
                    words: parseInt(e.target.value)
                  })}
                />
              </div>
            </div>
          </div>
        )}

        <div className="mt-12 animate-fade-in-up">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <label className="inline-flex items-center px-4 py-4 text-lg font-semibold text-white bg-gradient-to-r from-gray-600 to-gray-700 rounded-lg cursor-pointer hover:from-gray-500 hover:to-gray-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
              <span className="mr-3 text-2xl">📁</span> Upload Documents
              <input
                type="file"
                className="hidden"
                id="upload-files"
                multiple
                onChange={handleFileChange}
                accept="image/*,.pdf,.doc,.docx"
              />
            </label>
          </div>
        </div>

        {previewFiles.length > 0 && (
          <div className="mt-8 w-full max-w-6xl mx-auto animate-fade-in">
            <h2 className="text-2xl font-semibold text-gray-300 mb-4">Your Documents:</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {previewFiles.map((file) => (
                <div
                  key={file.id}
                  className="relative aspect-square overflow-hidden rounded-lg shadow-lg group"
                >
                  {file.name.endsWith('.pdf') ? (
                    <div className="w-full h-full bg-red-100 flex items-center justify-center">
                      <span className="text-4xl">📄</span>
                    </div>
                  ) : (
                    <img
                      src={file.url}
                      alt={file.name}
                      className={`w-full h-full object-cover transition-opacity ${file.uploaded ? 'opacity-50' : 'group-hover:opacity-80'}`}
                    />
                  )}
                  <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 text-white p-2 text-sm truncate">
                    {file.name}
                  </div>
                  <button
                    onClick={() => handleDeletePhoto(file.id)}
                    className="absolute top-2 right-2 p-2 bg-red-600 rounded-full hover:bg-red-700 transition-all duration-300 opacity-0 group-hover:opacity-100"
                  >
                    <AiOutlineDelete className="text-white" />
                  </button>
                </div>
              ))}
            </div>

            <button
              onClick={handleUpload}
              disabled={loading || previewFiles.every((file) => file.uploaded)}
              className={`mt-6 px-8 py-4 text-lg font-semibold text-white rounded-lg transition-all duration-300 transform shadow-lg flex items-center justify-center gap-2 mx-auto ${loading || previewFiles.every((file) => file.uploaded)
                  ? 'bg-gray-600 cursor-not-allowed'
                  : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 hover:scale-105 hover:shadow-xl'
                }`}
            >
              {loading ? (
                <>
                  <AiOutlineLoading3Quarters className="animate-spin" />
                  Uploading...
                </>
              ) : (
                'Upload Documents'
              )}
            </button>
          </div>
        )}

        {Object.keys(extractedTexts).length > 0 && (
          <div className="mt-8 w-full max-w-6xl mx-auto animate-fade-in">
            <h2 className="text-2xl font-semibold text-gray-300 mb-4">Document Analysis:</h2>
            {Object.entries(extractedTexts).map(([fileName, text]) => (
              <div key={fileName} className="mb-8 bg-gray-800 rounded-lg p-6 shadow-xl">
                <h3 className="text-xl font-semibold text-gray-300 mb-2">{fileName}</h3>
                <div className="bg-gray-700 p-4 rounded-lg mb-4 max-h-60 overflow-y-auto">
                  <p className="text-gray-300 whitespace-pre-wrap">{text}</p>
                </div>
                <textarea
                  className="w-full bg-gray-700 text-white border border-gray-600 rounded-lg p-4 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  name={`question-${fileName}`}
                  placeholder="Ask additional questions about this document..."
                  rows="3"
                />
                <div className="flex gap-4">
                  <button
                    onClick={() => handleSubmit(fileName, text)}
                    className="px-6 py-3 bg-gradient-to-r from-green-600 to-teal-600 text-white font-semibold rounded-lg hover:from-green-700 hover:to-teal-700 transition-all duration-300"
                  >
                    Get Additional Answer
                  </button>
                  <button
                    onClick={() => handleSubmit(fileName, text, "Summarize the key points")}
                    className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
                  >
                    Quick Summary
                  </button>
                </div>
                {generatedAnswers[fileName] && (
                  <div className="mt-4 bg-gray-700 p-4 rounded-lg border border-gray-600">
                    <h4 className="text-lg font-semibold text-gray-300 mb-2">AI Analysis:</h4>
                    <p className="text-gray-200 whitespace-pre-wrap">{generatedAnswers[fileName]}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}



        {generatedAnswers[fileName] && (
          <button
            onClick={() => downloadAnswer(fileName, generatedAnswers[fileName])}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all"
            title="Download as PDF"
          >
            <AiOutlineDownload /> Download Analysis
          </button>
        )}


        {uploadStatus && (
          <div className={`mt-6 text-xl font-semibold ${uploadStatus.includes('success') ? 'text-green-500' : 'text-red-500'
            } animate-fade-in`}>
            {uploadStatus}
          </div>
        )}
      </div>

      <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-gray-900 to-transparent z-0">
        <div className="grid grid-cols-6 gap-4 opacity-30">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="w-4 h-4 bg-blue-500 rounded-full animate-pulse"
              style={{ animationDelay: `${i * 0.1}s` }}
            ></div>
          ))}
        </div>
      </div>

      <footer className="w-full text-center text-gray-600 py-4">
        © {new Date().getFullYear()} AI Document Analyzer. All Rights Reserved.
      </footer>
    </div>
  );
};

export default Home;