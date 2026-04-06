// import React, { useState } from 'react';
// import { User, Clock, BarChart, AlertTriangle, ChevronDown, ChevronUp } from 'lucide-react';
// import { QUESTIONS } from '../../data/constants';
// import './AdminDashboard.css';

// export const AdminDashboard = ({ results, onReset }) => { // Add onReset prop
//   const [expandedUsers, setExpandedUsers] = useState({});

//   const calculateStats = () => {
//     if (results.length === 0) {
//       return { avgScore: 0, passRate: 0, totalCompleted: 0, highestScore: 0 };
//     }
//     const totalScore = results.reduce((acc, r) => acc + r.score, 0);
//     const passedTests = results.filter(r => r.score >= 70).length;
//     const highestScore = Math.max(...results.map(r => r.score));
//     return {
//       avgScore: totalScore / results.length,
//       passRate: (passedTests / results.length) * 100,
//       totalCompleted: results.length,
//       highestScore,
//     };
//   };

//   const stats = calculateStats();

//   const getCandidateStats = (result) => {
//     const correctCount = Object.entries(result.answers).reduce((acc, [qId, answer]) => {
//       const question = QUESTIONS[parseInt(qId) - 1];
//       if (question.isFreeText) {
//         const normalizedAnswer = answer.trim().replace(/\s+/g, ' ');
//         const normalizedCorrect = question.correctAnswer.trim().replace(/\s+/g, ' ');
//         return acc + (normalizedAnswer === normalizedCorrect ? 1 : 0);
//       }
//       return acc + (question.correctAnswer === answer ? 1 : 0);
//     }, 0);
//     return { correctCount, wrongCount: QUESTIONS.length - correctCount };
//   };

//   const toggleExpand = (user) => {
//     setExpandedUsers(prev => ({ ...prev, [user]: !prev[user] }));
//   };

//   const sortedResults = [...results].sort((a, b) => b.score - a.score);

//   return (
//     <div className="admin-container">
//       <div className="stats-grid">
//         <div className="stat-card">
//           <p className="stat-label">Average Score</p>
//           <p className="stat-value">{stats.avgScore.toFixed(1)}%</p>
//         </div>
//         <div className="stat-card">
//           <p className="stat-label">Tests Completed</p>
//           <p className="stat-value">{stats.totalCompleted}/{results.length}</p>
//         </div>
//         <div className="stat-card">
//           <p className="stat-label">Pass Rate</p>
//           <p className="stat-value">{stats.passRate.toFixed(1)}%</p>
//         </div>
//         <div className="stat-card">
//           <p className="stat-label">Highest Score</p>
//           <p className="stat-value">{stats.highestScore.toFixed(1)}%</p>
//         </div>
//       </div>

//       <div className="results-section">
//         <div className="section-header">
//           <h2 className="section-title">Candidate Assessment Results</h2>
//           <button className="reset-button" onClick={onReset}>
//             Reset All Results
//           </button>
//         </div>
//         <div className="results-list">
//           {sortedResults.map((result, index) => {
//             const { correctCount, wrongCount } = getCandidateStats(result);
//             const isExpanded = expandedUsers[result.user];
//             return (
//               <div key={index} className="result-item">
//                 <div className="result-header" onClick={() => toggleExpand(result.user)}>
//                   <div className="user-info">
//                     <User size={24} />
//                     <div>
//                       <h3>{result.user} {index === 0 && <span className="top-performer">(Top Performer)</span>}</h3>
//                       <p>Completed: {new Date(result.date).toLocaleDateString()}</p>
//                     </div>
//                   </div>
//                   <div className="result-details">
//                     <div><Clock size={16} /><span>{Math.floor(result.timeSpent / 60)}m {result.timeSpent % 60}s</span></div>
//                     <div><BarChart size={16} /><span className={`score ${result.score >= 70 ? 'score-pass' : 'score-fail'}`}>{result.score.toFixed(1)}%</span></div>
//                     <div><AlertTriangle size={16} /><span>{result.violations} Violations</span></div>
//                     {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
//                   </div>
//                 </div>
//                 {isExpanded && (
//                   <div className="result-expanded">
//                     <div className="stats-summary">
//                       <p>Correct Answers: <span className="correct">{correctCount}</span></p>
//                       <p>Wrong Answers: <span className="wrong">{wrongCount}</span></p>
//                       <p>Section Scores:</p>
//                       <ul>
//                         {Object.entries(result.sections).map(([section, score]) => (
//                           <li key={section}>{section.charAt(0).toUpperCase() + section.slice(1)}: {score.toFixed(1)}%</li>
//                         ))}
//                       </ul>
//                     </div>
//                     <div className="questions-list">
//                       <h4>Question Details</h4>
//                       <table className="question-table">
//                         <thead>
//                           <tr>
//                             <th>Question</th>
//                             <th>Marked Answer</th>
//                             <th>Correct Answer</th>
//                             <th>Status</th>
//                           </tr>
//                         </thead>
//                         <tbody>
//                           {QUESTIONS.map((q) => {
//                             const markedAnswer = result.answers[q.id];
//                             const isCorrect = q.isFreeText
//                               ? markedAnswer?.trim().replace(/\s+/g, ' ') === q.correctAnswer.trim().replace(/\s+/g, ' ')
//                               : markedAnswer === q.correctAnswer;
//                             return (
//                               <tr key={q.id}>
//                                 <td>{q.question}</td>
//                                 <td>{q.isFreeText ? <pre>{markedAnswer || 'Not answered'}</pre> : q.options ? q.options[markedAnswer] || 'Not answered' : 'Not answered'}</td>
//                                 <td>{q.isFreeText ? <pre>{q.correctAnswer}</pre> : q.options[q.correctAnswer]}</td>
//                                 <td className={isCorrect ? 'status-correct' : 'status-wrong'}>{isCorrect ? 'Correct' : 'Wrong'}</td>
//                               </tr>
//                             );
//                           })}
//                         </tbody>
//                       </table>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </div>
//   );
// };

import React, { useState } from 'react';
import { User, Clock, BarChart, AlertTriangle, ChevronDown, ChevronUp, Volume2, Calendar, CheckCircle, UserPlus, Trash2, Users, BookOpen, Edit3, Plus, Eye, Save, X, Code } from 'lucide-react';
import { DOMAINS, getQuestionsForDomain } from '../../data/constants';
import { AdminCamera } from '../Camera/AdminCamera';
import './AdminDashboard.css';

export const AdminDashboard = ({ results, onReset, onUpdateResult, scheduledStartTime, scheduledEndTime, onScheduleUpdate, candidates = [], onAddCandidate, onBulkAddCandidates, onRemoveCandidate, questionsByDomain = {}, onSaveQuestions, onResetQuestions, customQuestionsByDomain = {} }) => {
  const [expandedUsers, setExpandedUsers] = useState({});
  const [showLiveMonitoring, setShowLiveMonitoring] = useState(true);
  const [scheduleInput, setScheduleInput] = useState('');
  const [endTimeInput, setEndTimeInput] = useState('');
  const [scheduleSaved, setScheduleSaved] = useState(false);

  // Candidate management state
  const [newName, setNewName] = useState('');
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newDomain, setNewDomain] = useState('');
  const [candidateError, setCandidateError] = useState('');
  const [candidateSuccess, setCandidateSuccess] = useState('');
  const [bulkInput, setBulkInput] = useState('');
  const [bulkError, setBulkError] = useState('');
  const [bulkSuccess, setBulkSuccess] = useState('');
  const [showCandidateList, setShowCandidateList] = useState(false);

  // Question management state
  const [qDomain, setQDomain] = useState('');
  const [qJsonInput, setQJsonInput] = useState('');
  const [qJsonError, setQJsonError] = useState('');
  const [qJsonSuccess, setQJsonSuccess] = useState('');
  const [showQuestionManager, setShowQuestionManager] = useState(false);
  const [qViewMode, setQViewMode] = useState('list'); // 'list' or 'json'
  const [editingQuestion, setEditingQuestion] = useState(null); // index being edited
  const [editForm, setEditForm] = useState({ question: '', options: ['', '', '', ''], correctAnswer: 1, isFreeText: false, isCoding: false, freeTextAnswer: '' });
  const [showAddForm, setShowAddForm] = useState(false);
  const [addForm, setAddForm] = useState({ question: '', options: ['', '', '', ''], correctAnswer: 1, type: 'mcq', freeTextAnswer: '' });

  // Coding marks allocation state
  const [codingMarks, setCodingMarks] = useState({});

  const handleAddNewCandidate = () => {
    setCandidateError('');
    if (!newName.trim() || !newUsername.trim() || !newPassword.trim() || !newDomain) {
      setCandidateError('All fields are required.');
      return;
    }
    if (candidates.some(c => c.username === newUsername.trim())) {
      setCandidateError('Username already exists.');
      return;
    }
    onAddCandidate({
      name: newName.trim(),
      username: newUsername.trim(),
      password: newPassword.trim(),
      domain: newDomain
    });
    setNewName('');
    setNewUsername('');
    setNewPassword('');
    setNewDomain('');
    setCandidateSuccess('Candidate added successfully!');
    setTimeout(() => setCandidateSuccess(''), 3000);
  };

  const parseBulkCandidates = (rawText) => {
    const lines = rawText
      .split(/\r?\n/)
      .map(line => line.trim())
      .filter(Boolean);

    if (lines.length === 0) {
      return { candidates: [], errors: ['No data found in bulk input.'] };
    }

    const parsed = [];
    const errors = [];
    const seenUsernames = new Set(candidates.map(c => c.username.toLowerCase()));

    lines.forEach((line, index) => {
      const parts = line.split(',').map(part => part.trim());

      if (index === 0 && /^name$/i.test(parts[0]) && /^username$/i.test(parts[1])) {
        return;
      }

      if (parts.length < 3) {
        errors.push(`Line ${index + 1}: Need at least name, username, password.`);
        return;
      }

      const [name, username, password, rawDomain] = parts;
      const domain = rawDomain || 'General';

      if (!name || !username || !password) {
        errors.push(`Line ${index + 1}: Name, username, and password are required.`);
        return;
      }

      if (!DOMAINS.includes(domain)) {
        errors.push(`Line ${index + 1}: Invalid domain '${domain}'.`);
        return;
      }

      const normalizedUsername = username.toLowerCase();
      if (seenUsernames.has(normalizedUsername)) {
        errors.push(`Line ${index + 1}: Duplicate username '${username}'.`);
        return;
      }

      seenUsernames.add(normalizedUsername);
      parsed.push({ name, username, password, domain });
    });

    return { candidates: parsed, errors };
  };

  const handleBulkFileUpload = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setBulkInput(String(reader.result || ''));
      setBulkError('');
      setBulkSuccess('');
    };
    reader.onerror = () => {
      setBulkError('Failed to read the uploaded file.');
    };
    reader.readAsText(file);
  };

  const handleBulkAdd = async () => {
    setBulkError('');
    setBulkSuccess('');

    const { candidates: parsedCandidates, errors } = parseBulkCandidates(bulkInput);
    if (errors.length > 0) {
      setBulkError(errors.slice(0, 4).join(' | '));
      return;
    }

    if (parsedCandidates.length === 0) {
      setBulkError('No valid candidate rows found.');
      return;
    }

    const result = await onBulkAddCandidates(parsedCandidates);
    if (!result?.success) {
      setBulkError('Bulk upload failed. Please try again.');
      return;
    }

    setBulkInput('');
    setBulkSuccess(`${result.count} candidates added successfully.`);
    setTimeout(() => setBulkSuccess(''), 3000);
  };

  const handleLoadCurrentQuestions = () => {
    setQJsonError('');
    setQJsonSuccess('');
    if (!qDomain) {
      setQJsonError('Please select a domain first.');
      return;
    }
    const questions = questionsByDomain[qDomain] || [];
    // Convert 0-based correctAnswer to 1-based for display (skip coding questions)
    const displayQuestions = questions.map(({ id, isCoding, ...rest }) => {
      if (isCoding || (!rest.options && !rest.isFreeText && rest.correctAnswer === undefined)) {
        return { question: rest.question };
      }
      return {
        ...rest,
        correctAnswer: rest.isFreeText ? rest.correctAnswer : rest.correctAnswer + 1,
      };
    });
    setQJsonInput(JSON.stringify(displayQuestions, null, 2));
  };

  const handleSaveQuestionsForDomain = async () => {
    setQJsonError('');
    setQJsonSuccess('');
    if (!qDomain) {
      setQJsonError('Please select a domain first.');
      return;
    }
    if (!qJsonInput.trim()) {
      setQJsonError('Please enter question data in JSON format.');
      return;
    }
    let parsed;
    try {
      parsed = JSON.parse(qJsonInput);
    } catch {
      setQJsonError('Invalid JSON. Please check your format and try again.');
      return;
    }
    if (!Array.isArray(parsed)) {
      setQJsonError('Questions must be a JSON array [...]. Wrap your questions in square brackets.');
      return;
    }
    if (parsed.length === 0) {
      setQJsonError('At least one question is required.');
      return;
    }
    for (let i = 0; i < parsed.length; i++) {
      const q = parsed[i];
      if (!q.question || typeof q.question !== 'string') {
        setQJsonError(`Question ${i + 1}: "question" field is required and must be a string.`);
        return;
      }
      // Coding question: only has "question" field
      const isCoding = !q.options && !q.isFreeText && q.correctAnswer === undefined;
      if (isCoding) {
        // Valid coding question — no further checks needed
      } else if (q.isFreeText) {
        if (!q.correctAnswer || typeof q.correctAnswer !== 'string') {
          setQJsonError(`Question ${i + 1}: Free-text question requires a "correctAnswer" string.`);
          return;
        }
      } else {
        if (!Array.isArray(q.options) || q.options.length < 2) {
          setQJsonError(`Question ${i + 1}: "options" must be an array with at least 2 items.`);
          return;
        }
        if (typeof q.correctAnswer !== 'number' || q.correctAnswer < 1 || q.correctAnswer > q.options.length) {
          setQJsonError(`Question ${i + 1}: "correctAnswer" must be between 1 and ${q.options.length} (option number).`);
          return;
        }
      }
    }
    // Convert 1-based correctAnswer to 0-based for internal storage (skip coding questions)
    const questionsWithIds = parsed.map((q, i) => {
      const isCoding = !q.options && !q.isFreeText && q.correctAnswer === undefined;
      const entry = { question: q.question, id: i + 1 };
      if (isCoding) {
        entry.isCoding = true;
      } else if (q.isFreeText) {
        entry.isFreeText = true;
        entry.correctAnswer = q.correctAnswer;
      } else {
        entry.options = q.options;
        entry.correctAnswer = q.correctAnswer - 1;
      }
      return entry;
    });
    const result = await onSaveQuestions(qDomain, questionsWithIds);
    if (result?.success) {
      setQJsonSuccess(`${questionsWithIds.length} questions saved for "${qDomain}"!`);
      setTimeout(() => setQJsonSuccess(''), 5000);
    } else {
      setQJsonError('Failed to save questions. Please try again.');
    }
  };

  const getQuestionsForDomain = (domain) => {
    return questionsByDomain[domain] || [];
  };

  const handleDeleteSingleQuestion = async (index) => {
    if (!qDomain) return;
    const currentQuestions = [...getQuestionsForDomain(qDomain)];
    currentQuestions.splice(index, 1);
    // Re-assign IDs
    const updated = currentQuestions.map((q, i) => {
      const clean = { question: q.question, id: i + 1 };
      if (q.isCoding) clean.isCoding = true;
      else if (q.isFreeText) { clean.isFreeText = true; clean.correctAnswer = q.correctAnswer; }
      else { clean.options = q.options; clean.correctAnswer = q.correctAnswer; }
      return clean;
    });
    if (updated.length === 0) {
      const result = await onResetQuestions(qDomain);
      if (result?.success) {
        setQJsonSuccess('Last question removed. Domain cleared.');
        setTimeout(() => setQJsonSuccess(''), 3000);
      }
    } else {
      const result = await onSaveQuestions(qDomain, updated);
      if (result?.success) {
        setQJsonSuccess('Question deleted successfully.');
        setTimeout(() => setQJsonSuccess(''), 3000);
      }
    }
  };

  const handleStartEdit = (index) => {
    const q = getQuestionsForDomain(qDomain)[index];
    if (!q) return;
    const isCoding = q.isCoding || (!q.options && !q.isFreeText && q.correctAnswer === undefined);
    setEditForm({
      question: q.question,
      options: q.options ? [...q.options] : ['', '', '', ''],
      correctAnswer: isCoding ? 1 : (q.isFreeText ? 1 : q.correctAnswer + 1),
      isFreeText: !!q.isFreeText,
      isCoding: isCoding,
      freeTextAnswer: q.isFreeText ? q.correctAnswer : '',
    });
    setEditingQuestion(index);
  };

  const handleSaveEdit = async () => {
    if (editingQuestion === null || !qDomain) return;
    const currentQuestions = [...getQuestionsForDomain(qDomain)];
    let updated;
    if (editForm.isCoding) {
      updated = { question: editForm.question, isCoding: true, id: editingQuestion + 1 };
    } else if (editForm.isFreeText) {
      updated = { question: editForm.question, isFreeText: true, correctAnswer: editForm.freeTextAnswer, id: editingQuestion + 1 };
    } else {
      const opts = editForm.options.filter(o => o.trim());
      if (opts.length < 2) { setQJsonError('MCQ needs at least 2 options.'); return; }
      if (editForm.correctAnswer < 1 || editForm.correctAnswer > opts.length) { setQJsonError(`correctAnswer must be between 1 and ${opts.length}.`); return; }
      updated = { question: editForm.question, options: opts, correctAnswer: editForm.correctAnswer - 1, id: editingQuestion + 1 };
    }
    currentQuestions[editingQuestion] = updated;
    const reIndexed = currentQuestions.map((q, i) => {
      const clean = { question: q.question, id: i + 1 };
      if (q.isCoding) clean.isCoding = true;
      else if (q.isFreeText) { clean.isFreeText = true; clean.correctAnswer = q.correctAnswer; }
      else { clean.options = q.options; clean.correctAnswer = q.correctAnswer; }
      return clean;
    });
    const result = await onSaveQuestions(qDomain, reIndexed);
    if (result?.success) {
      setEditingQuestion(null);
      setQJsonSuccess('Question updated successfully.');
      setTimeout(() => setQJsonSuccess(''), 3000);
    }
  };

  const handleAddQuestion = async () => {
    if (!qDomain) { setQJsonError('Please select a domain first.'); return; }
    const currentQuestions = [...getQuestionsForDomain(qDomain)];
    let newQ;
    if (addForm.type === 'coding') {
      newQ = { question: addForm.question, isCoding: true };
    } else if (addForm.type === 'freetext') {
      newQ = { question: addForm.question, isFreeText: true, correctAnswer: addForm.freeTextAnswer };
    } else {
      const opts = addForm.options.filter(o => o.trim());
      if (opts.length < 2) { setQJsonError('MCQ needs at least 2 options.'); return; }
      if (addForm.correctAnswer < 1 || addForm.correctAnswer > opts.length) { setQJsonError(`correctAnswer must be between 1 and ${opts.length}.`); return; }
      newQ = { question: addForm.question, options: opts, correctAnswer: addForm.correctAnswer - 1 };
    }
    if (!newQ.question?.trim()) { setQJsonError('Question text is required.'); return; }
    currentQuestions.push(newQ);
    const reIndexed = currentQuestions.map((q, i) => {
      const clean = { question: q.question, id: i + 1 };
      if (q.isCoding) clean.isCoding = true;
      else if (q.isFreeText) { clean.isFreeText = true; clean.correctAnswer = q.correctAnswer; }
      else { clean.options = q.options; clean.correctAnswer = q.correctAnswer; }
      return clean;
    });
    const result = await onSaveQuestions(qDomain, reIndexed);
    if (result?.success) {
      setShowAddForm(false);
      setAddForm({ question: '', options: ['', '', '', ''], correctAnswer: 1, type: 'mcq', freeTextAnswer: '' });
      setQJsonSuccess('Question added successfully.');
      setTimeout(() => setQJsonSuccess(''), 3000);
    }
  };

  const handleResetQuestionsForDomain = async () => {
    setQJsonError('');
    setQJsonSuccess('');
    if (!qDomain) {
      setQJsonError('Please select a domain first.');
      return;
    }
    const result = await onResetQuestions(qDomain);
    if (result?.success) {
      setQJsonInput('');
      setQJsonSuccess(`Questions for "${qDomain}" have been removed.`);
      setTimeout(() => setQJsonSuccess(''), 4000);
    } else {
      setQJsonError('Failed to remove questions. Please try again.');
    }
  };

  const handleSaveSchedule = () => {
    if (!scheduleInput && !endTimeInput) return;
    onScheduleUpdate(scheduleInput || null, endTimeInput || null);
    setScheduleSaved(true);
    setTimeout(() => setScheduleSaved(false), 3000);
  };

  const handleClearSchedule = () => {
    onScheduleUpdate(null, null);
    setScheduleInput('');
    setEndTimeInput('');
    setScheduleSaved(false);
  };

  const calculateStats = () => {
    if (results.length === 0) {
      return { avgScore: 0, passRate: 0, totalCompleted: 0, highestScore: 0, terminationRate: 0 };
    }
    const totalScore = results.reduce((acc, r) => acc + r.score, 0);
    const passedTests = results.filter(r => r.score >= 70).length;
    const highestScore = Math.max(...results.map(r => r.score));
    const terminatedTests = results.filter(r => r.submittedBy === 'terminated').length;
    return {
      avgScore: totalScore / results.length,
      passRate: (passedTests / results.length) * 100,
      totalCompleted: results.length,
      highestScore,
      terminationRate: (terminatedTests / results.length) * 100
    };
  };

  const stats = calculateStats();

  const getResultQuestions = (result) => {
    const domain = result?.domain || 'General';
    return questionsByDomain[domain] || getQuestionsForDomain(domain);
  };

  const getCandidateStats = (result) => {
    const resultQuestions = getResultQuestions(result);
    let correctCount = 0;
    let codingCount = 0;
    resultQuestions.forEach(question => {
      const isCoding = question.isCoding || (!question.options && !question.isFreeText && question.correctAnswer === undefined);
      if (isCoding) {
        codingCount++;
        // Check if admin has allocated marks for this coding question
        const codingScore = result.codingScores?.[question.id];
        if (codingScore === 1) correctCount++;
        return;
      }
      const answer = result.answers?.[question.id];
      if (answer === undefined) return;
      if (question.isFreeText) {
        const normalizedAnswer = answer.trim().replace(/\s+/g, ' ');
        const normalizedCorrect = question.correctAnswer.trim().replace(/\s+/g, ' ');
        if (normalizedAnswer === normalizedCorrect) correctCount++;
      } else {
        if (question.correctAnswer === answer) correctCount++;
      }
    });
    return { correctCount, wrongCount: resultQuestions.length - correctCount, codingCount };
  };

  const toggleExpand = (user) => {
    setExpandedUsers(prev => ({ ...prev, [user]: !prev[user] }));
  };

  const sortedResults = [...results].sort((a, b) => b.score - a.score);

  return (
    <div className="admin-container">
      {/* Schedule Test Panel */}
      <div className="schedule-panel">
        <div className="schedule-panel-header">
          <Calendar size={20} />
          <h2>Test Schedule Settings</h2>
        </div>

        {/* Active schedule status */}
        {(scheduledStartTime || scheduledEndTime) && (
          <div className="schedule-status-row">
            {scheduledStartTime && (
              <div className="schedule-current">
                <CheckCircle size={16} className="schedule-active-icon" />
                <span>Opens: <strong>{new Date(scheduledStartTime).toLocaleString()}</strong></span>
              </div>
            )}
            {scheduledEndTime && (
              <div className="schedule-current schedule-end">
                <CheckCircle size={16} className="schedule-active-icon schedule-end-icon" />
                <span>Closes: <strong>{new Date(scheduledEndTime).toLocaleString()}</strong></span>
              </div>
            )}
          </div>
        )}

        <div className="schedule-fields">
          <div className="schedule-field">
            <label className="schedule-label">Test Opens (Start Time)</label>
            <input
              type="datetime-local"
              className="schedule-input"
              value={scheduleInput}
              onChange={(e) => setScheduleInput(e.target.value)}
            />
          </div>
          <div className="schedule-field">
            <label className="schedule-label">Test Closes (End Time)</label>
            <input
              type="datetime-local"
              className="schedule-input"
              value={endTimeInput}
              onChange={(e) => setEndTimeInput(e.target.value)}
            />
          </div>
        </div>

        <div className="schedule-controls">
          <button
            className="schedule-save-btn"
            onClick={handleSaveSchedule}
            disabled={!scheduleInput && !endTimeInput}
          >
            {scheduleSaved ? '✓ Saved!' : 'Save Schedule'}
          </button>
          {(scheduledStartTime || scheduledEndTime) && (
            <button
              className="schedule-clear-btn"
              onClick={handleClearSchedule}
            >
              Clear Schedule
            </button>
          )}
        </div>
        <p className="schedule-note">
          Candidates can only access the test between the open and close times. After close time, the test locks automatically.
        </p>
      </div>

      {/* Manage Candidates Panel */}
      <div className="schedule-panel">
        <div className="schedule-panel-header">
          <Users size={20} />
          <h2>Manage Candidates</h2>
          <button
            className="toggle-list-btn"
            onClick={() => setShowCandidateList(!showCandidateList)}
          >
            {showCandidateList ? 'Hide List' : `View Added (${candidates.length})`}
          </button>
        </div>

        {/* Add new candidate form */}
        <div className="candidate-form">
          <div className="schedule-fields">
            <div className="schedule-field">
              <label className="schedule-label">Full Name</label>
              <input
                type="text"
                className="schedule-input"
                placeholder="e.g. John Doe"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
              />
            </div>
            <div className="schedule-field">
              <label className="schedule-label">Username / Email</label>
              <input
                type="text"
                className="schedule-input"
                placeholder="e.g. john@example.com"
                value={newUsername}
                onChange={(e) => setNewUsername(e.target.value)}
              />
            </div>
            <div className="schedule-field">
              <label className="schedule-label">Password</label>
              <input
                type="text"
                className="schedule-input"
                placeholder="e.g. John@123"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            <div className="schedule-field">
              <label className="schedule-label">Domain</label>
              <select
                className="schedule-input"
                value={newDomain}
                onChange={(e) => setNewDomain(e.target.value)}
              >
                <option value="">Select domain</option>
                {DOMAINS.map((domain) => (
                  <option key={domain} value={domain}>{domain}</option>
                ))}
              </select>
            </div>
          </div>

          {candidateError && <p className="candidate-error">{candidateError}</p>}
          {candidateSuccess && <p className="candidate-success">{candidateSuccess}</p>}

          <div className="schedule-controls" style={{ marginTop: '0.75rem' }}>
            <button
              className="schedule-save-btn"
              onClick={handleAddNewCandidate}
            >
              <UserPlus size={15} style={{ marginRight: '6px' }} />
              Add Candidate
            </button>
          </div>
        </div>

        <div className="bulk-upload-section">
          <h3 className="bulk-title">Bulk Upload Candidates</h3>
          <p className="bulk-help">Format per line: Name, Username, Password, Domain (Domain optional, defaults to General)</p>
          <textarea
            className="bulk-textarea"
            rows={6}
            value={bulkInput}
            onChange={(e) => setBulkInput(e.target.value)}
            placeholder={'John Doe,john@example.com,John@123,AIML\nJane Doe,jane@example.com,Jane@123,AIDS'}
          />
          <div className="bulk-controls">
            <input
              type="file"
              accept=".csv,.txt"
              onChange={handleBulkFileUpload}
              className="bulk-file-input"
            />
            <button className="schedule-save-btn" onClick={handleBulkAdd}>
              Bulk Add Candidates
            </button>
          </div>
          {bulkError && <p className="candidate-error">{bulkError}</p>}
          {bulkSuccess && <p className="candidate-success">{bulkSuccess}</p>}
        </div>

        {/* Candidates list */}
        {showCandidateList && (
          <div className="candidate-list">
            {candidates.length === 0 ? (
              <p className="schedule-note" style={{ marginTop: '0.5rem' }}>No candidates added yet.</p>
            ) : (
              <table className="candidate-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Username</th>
                    <th>Domain</th>
                    <th>Password</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {candidates.map((c, idx) => (
                    <tr key={c.id}>
                      <td>{idx + 1}</td>
                      <td>{c.name}</td>
                      <td>{c.username}</td>
                      <td>{c.domain || 'General'}</td>
                      <td><span className="password-mask">{c.password}</span></td>
                      <td>
                        <button
                          className="remove-candidate-btn"
                          onClick={() => onRemoveCandidate(c.id)}
                          title="Remove candidate"
                        >
                          <Trash2 size={14} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
      </div>

      {/* Manage Questions Panel */}
      <div className="schedule-panel">
        <div className="schedule-panel-header">
          <BookOpen size={20} />
          <h2>Manage Questions</h2>
        </div>

        <div className="question-manager-body">
          {/* Domain selector */}
          <div className="schedule-fields" style={{ marginBottom: '1rem' }}>
            <div className="schedule-field">
              <label className="schedule-label">Select Domain</label>
              <select
                className="schedule-input"
                value={qDomain}
                onChange={(e) => { setQDomain(e.target.value); setQJsonError(''); setQJsonSuccess(''); }}
              >
                <option value="">-- Choose a domain --</option>
                {DOMAINS.map((d) => (
                  <option key={d} value={d}>
                    {d}{customQuestionsByDomain[d] ? ' ✓' : ' (no questions)'}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* View mode toggle */}
          <div className="q-view-toggle">
            <button
              className={`q-view-btn ${qViewMode === 'list' ? 'active' : ''}`}
              onClick={() => setQViewMode('list')}
            >
              <Eye size={14} /> View Questions
            </button>
            <button
              className={`q-view-btn ${qViewMode === 'json' ? 'active' : ''}`}
              onClick={() => setQViewMode('json')}
            >
              <Code size={14} /> JSON Editor
            </button>
          </div>

          {qJsonError && <p className="candidate-error" style={{ marginTop: '0.5rem' }}>{qJsonError}</p>}
          {qJsonSuccess && <p className="candidate-success" style={{ marginTop: '0.5rem' }}>{qJsonSuccess}</p>}

          {qViewMode === 'list' ? (
            <div className="q-list-view">
              {/* Questions list */}
              {qDomain && getQuestionsForDomain(qDomain).length > 0 ? (
                <div className="q-list">
                  {getQuestionsForDomain(qDomain).map((q, idx) => {
                    const isCoding = q.isCoding || (!q.options && !q.isFreeText && q.correctAnswer === undefined);
                    const isEditing = editingQuestion === idx;

                    if (isEditing) {
                      return (
                        <div key={idx} className="q-item editing">
                          <div className="q-edit-form">
                            <div className="q-edit-type-row">
                              <label>Type:</label>
                              <select value={editForm.isCoding ? 'coding' : editForm.isFreeText ? 'freetext' : 'mcq'} onChange={(e) => {
                                const t = e.target.value;
                                setEditForm(f => ({ ...f, isCoding: t === 'coding', isFreeText: t === 'freetext' }));
                              }}>
                                <option value="mcq">MCQ</option>
                                <option value="freetext">Free Text</option>
                                <option value="coding">Coding</option>
                              </select>
                            </div>
                            <textarea
                              className="q-edit-input"
                              value={editForm.question}
                              onChange={(e) => setEditForm(f => ({ ...f, question: e.target.value }))}
                              placeholder="Question text"
                              rows={2}
                            />
                            {!editForm.isCoding && !editForm.isFreeText && (
                              <>
                                <div className="q-edit-options">
                                  {editForm.options.map((opt, oi) => (
                                    <div key={oi} className="q-edit-option-row">
                                      <span className="q-opt-label">{oi + 1}.</span>
                                      <input
                                        type="text"
                                        value={opt}
                                        onChange={(e) => {
                                          const newOpts = [...editForm.options];
                                          newOpts[oi] = e.target.value;
                                          setEditForm(f => ({ ...f, options: newOpts }));
                                        }}
                                        placeholder={`Option ${oi + 1}`}
                                      />
                                    </div>
                                  ))}
                                  <button className="q-add-option-btn" onClick={() => setEditForm(f => ({ ...f, options: [...f.options, ''] }))}>
                                    + Add Option
                                  </button>
                                </div>
                                <div className="q-edit-correct">
                                  <label>Correct Answer (option #):</label>
                                  <input type="number" min={1} max={editForm.options.length} value={editForm.correctAnswer}
                                    onChange={(e) => setEditForm(f => ({ ...f, correctAnswer: parseInt(e.target.value) || 1 }))} />
                                </div>
                              </>
                            )}
                            {editForm.isFreeText && (
                              <div className="q-edit-correct">
                                <label>Expected Answer:</label>
                                <input type="text" value={editForm.freeTextAnswer}
                                  onChange={(e) => setEditForm(f => ({ ...f, freeTextAnswer: e.target.value }))} />
                              </div>
                            )}
                            <div className="q-edit-actions">
                              <button className="q-save-edit-btn" onClick={handleSaveEdit}><Save size={13} /> Save</button>
                              <button className="q-cancel-edit-btn" onClick={() => setEditingQuestion(null)}><X size={13} /> Cancel</button>
                            </div>
                          </div>
                        </div>
                      );
                    }

                    return (
                      <div key={idx} className={`q-item ${isCoding ? 'coding' : q.isFreeText ? 'freetext' : 'mcq'}`}>
                        <div className="q-item-header">
                          <span className="q-number">Q{idx + 1}</span>
                          <span className={`q-type-badge ${isCoding ? 'coding' : q.isFreeText ? 'freetext' : 'mcq'}`}>
                            {isCoding ? 'Coding' : q.isFreeText ? 'Free Text' : 'MCQ'}
                          </span>
                          <div className="q-item-actions">
                            <button className="q-edit-btn" onClick={() => handleStartEdit(idx)} title="Edit"><Edit3 size={14} /></button>
                            <button className="q-delete-btn" onClick={() => handleDeleteSingleQuestion(idx)} title="Delete"><Trash2 size={14} /></button>
                          </div>
                        </div>
                        <p className="q-item-text">{q.question}</p>
                        {!isCoding && !q.isFreeText && q.options && (
                          <div className="q-item-options">
                            {q.options.map((opt, oi) => (
                              <div key={oi} className={`q-item-option ${q.correctAnswer === oi ? 'correct' : ''}`}>
                                <span className="q-opt-num">{oi + 1}.</span> {opt}
                                {q.correctAnswer === oi && <CheckCircle size={14} className="q-correct-icon" />}
                              </div>
                            ))}
                          </div>
                        )}
                        {q.isFreeText && (
                          <p className="q-item-answer"><strong>Expected:</strong> {q.correctAnswer}</p>
                        )}
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="q-empty-state">
                  {qDomain ? <p>No questions uploaded for <strong>{qDomain}</strong> yet.</p> : <p>Select a domain to view questions.</p>}
                </div>
              )}

              {/* Add question form */}
              {qDomain && (
                <div className="q-add-section">
                  {showAddForm ? (
                    <div className="q-item editing">
                      <div className="q-edit-form">
                        <h4 style={{ margin: '0 0 0.5rem', color: '#4f46e5' }}>Add New Question</h4>
                        <div className="q-edit-type-row">
                          <label>Type:</label>
                          <select value={addForm.type} onChange={(e) => setAddForm(f => ({ ...f, type: e.target.value }))}>
                            <option value="mcq">MCQ</option>
                            <option value="freetext">Free Text</option>
                            <option value="coding">Coding</option>
                          </select>
                        </div>
                        <textarea
                          className="q-edit-input"
                          value={addForm.question}
                          onChange={(e) => setAddForm(f => ({ ...f, question: e.target.value }))}
                          placeholder="Enter your question text..."
                          rows={2}
                        />
                        {addForm.type === 'mcq' && (
                          <>
                            <div className="q-edit-options">
                              {addForm.options.map((opt, oi) => (
                                <div key={oi} className="q-edit-option-row">
                                  <span className="q-opt-label">{oi + 1}.</span>
                                  <input
                                    type="text"
                                    value={opt}
                                    onChange={(e) => {
                                      const newOpts = [...addForm.options];
                                      newOpts[oi] = e.target.value;
                                      setAddForm(f => ({ ...f, options: newOpts }));
                                    }}
                                    placeholder={`Option ${oi + 1}`}
                                  />
                                </div>
                              ))}
                              <button className="q-add-option-btn" onClick={() => setAddForm(f => ({ ...f, options: [...f.options, ''] }))}>
                                + Add Option
                              </button>
                            </div>
                            <div className="q-edit-correct">
                              <label>Correct Answer (option #):</label>
                              <input type="number" min={1} max={addForm.options.length} value={addForm.correctAnswer}
                                onChange={(e) => setAddForm(f => ({ ...f, correctAnswer: parseInt(e.target.value) || 1 }))} />
                            </div>
                          </>
                        )}
                        {addForm.type === 'freetext' && (
                          <div className="q-edit-correct">
                            <label>Expected Answer:</label>
                            <input type="text" value={addForm.freeTextAnswer}
                              onChange={(e) => setAddForm(f => ({ ...f, freeTextAnswer: e.target.value }))} />
                          </div>
                        )}
                        <div className="q-edit-actions">
                          <button className="q-save-edit-btn" onClick={handleAddQuestion}><Plus size={13} /> Add Question</button>
                          <button className="q-cancel-edit-btn" onClick={() => setShowAddForm(false)}><X size={13} /> Cancel</button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <button className="q-add-new-btn" onClick={() => setShowAddForm(true)}>
                      <Plus size={16} /> Add New Question
                    </button>
                  )}
                </div>
              )}

              {/* Bulk actions */}
              {qDomain && customQuestionsByDomain[qDomain] && (
                <div className="q-bulk-actions">
                  <button
                    className="schedule-clear-btn"
                    onClick={handleResetQuestionsForDomain}
                    style={{ display: 'flex', alignItems: 'center', gap: '5px' }}
                  >
                    <Trash2 size={14} /> Delete All Questions
                  </button>
                  <span className="q-count">{getQuestionsForDomain(qDomain).length} question(s)</span>
                </div>
              )}
            </div>
          ) : (
            /* JSON Editor mode */
            <div className="q-json-view">
              <div className="question-format-guide">
                <p className="bulk-help" style={{ marginBottom: '0.4rem' }}>
                  Paste your questions as a JSON array. Each question must follow this structure:
                </p>
                <pre className="question-format-pre">{`[
  {
    "question": "MCQ question text here",
    "options": ["Option A", "Option B", "Option C", "Option D"],
    "correctAnswer": 1
  },
  {
    "question": "Free-text question example",
    "isFreeText": true,
    "correctAnswer": "expected exact answer"
  },
  {
    "question": "Write a function to reverse a string."
  }
]`}</pre>
                <p className="bulk-help" style={{ marginTop: '0.3rem', color: '#6366f1' }}>
                  <strong>Note:</strong> MCQ correctAnswer uses option number (1 = first, 2 = second). Coding questions only need the "question" field.
                </p>
              </div>

              <textarea
                className="bulk-textarea question-json-textarea"
                rows={14}
                value={qJsonInput}
                onChange={(e) => setQJsonInput(e.target.value)}
                placeholder={'[\n  {\n    "question": "Your question text here",\n    "options": ["Option A", "Option B", "Option C", "Option D"],\n    "correctAnswer": 1\n  }\n]'}
                spellCheck={false}
              />

              <div className="schedule-controls" style={{ marginTop: '0.85rem', flexWrap: 'wrap' }}>
                <button className="schedule-save-btn" onClick={handleSaveQuestionsForDomain}>Save Questions</button>
                <button className="toggle-list-btn" style={{ padding: '0.5rem 1rem' }} onClick={handleLoadCurrentQuestions}>Load Current Questions</button>
                {qDomain && customQuestionsByDomain[qDomain] && (
                  <button className="schedule-clear-btn" onClick={handleResetQuestionsForDomain} style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <Trash2 size={14} /> Delete All Questions
                  </button>
                )}
              </div>
            </div>
          )}

          <p className="schedule-note" style={{ marginTop: '0.75rem' }}>
            Candidates can only take the test if questions have been uploaded for their domain.
          </p>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <p className="stat-label">Average Score</p>
          <p className="stat-value">{stats.avgScore.toFixed(1)}%</p>
        </div>
        <div className="stat-card">
          <p className="stat-label">Tests Completed</p>
          <p className="stat-value">{stats.totalCompleted}</p>
        </div>
        <div className="stat-card">
          <p className="stat-label">Pass Rate</p>
          <p className="stat-value">{stats.passRate.toFixed(1)}%</p>
        </div>
        <div className="stat-card">
          <p className="stat-label">Test Termination Rate</p>
          <p className="stat-value">{stats.terminationRate.toFixed(1)}%</p>
        </div>
      </div>

      {showLiveMonitoring && (
        <AdminCamera results={results} />
      )}

      <div className="results-section">
        <div className="section-header">
          <h2 className="section-title">Candidate Assessment Results</h2>
          <div className="admin-controls">
            <button 
              className="toggle-monitoring-button"
              onClick={() => setShowLiveMonitoring(!showLiveMonitoring)}
            >
              {showLiveMonitoring ? 'Hide Live Monitoring' : 'Show Live Monitoring'}
            </button>
            <button className="reset-button" onClick={onReset}>
              Reset All Results
            </button>
          </div>
        </div>
        <div className="results-list">
          {sortedResults.map((result, index) => {
            const { correctCount, wrongCount } = getCandidateStats(result);
            const expandKey = result.id || `${result.user}_${index}`;
            const isExpanded = expandedUsers[expandKey];
            const isTerminated = result.submittedBy === 'terminated';
            
            return (
              <div key={result.id || index} className={`result-item ${isTerminated ? 'terminated' : ''}`}>
                <div className="result-header" onClick={() => toggleExpand(expandKey)}>
                  <div className="user-info">
                    <User size={24} />
                    <div>
                      <h3>
                        {result.user} 
                        {index === 0 && !isTerminated && <span className="top-performer">(Top Performer)</span>}
                        {isTerminated && <span className="terminated-badge">TERMINATED</span>}
                      </h3>
                      <p>Domain: {result.domain || 'General'}</p>
                      <p>Completed: {new Date(result.date).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div className="result-details">
                    <div><Clock size={16} /><span>{Math.floor(result.timeSpent / 60)}m {result.timeSpent % 60}s</span></div>
                    <div><BarChart size={16} /><span className={`score ${result.score >= 70 ? 'score-pass' : 'score-fail'}`}>{result.score.toFixed(1)}%</span></div>
                    <div><AlertTriangle size={16} /><span>{result.violations} Tab Violations</span></div>
                    <div><Volume2 size={16} /><span>{result.noiseViolations || 0} Noise Violations</span></div>
                    {(result.cameraViolations > 0 || result.behaviorViolations > 0 || result.faceViolations > 0) && (
                      <div><AlertTriangle size={16} /><span>{(result.cameraViolations || 0) + (result.behaviorViolations || 0) + (result.faceViolations || 0)} Behavior Violations</span></div>
                    )}
                    {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </div>
                </div>
                {isExpanded && (
                  <div className="result-expanded">
                    {isTerminated && (
                      <div className="termination-alert">
                        <AlertTriangle size={18} />
                        <span>
                          This test was terminated due to integrity violations. Reason: {result.terminationReason || 'Multiple violations detected'}
                          {(result.cameraViolations > 0 || result.behaviorViolations > 0 || result.faceViolations > 0) && (
                            <span style={{ display: 'block', marginTop: '4px' }}>
                              Camera: {result.cameraViolations || 0} | Behavior: {result.behaviorViolations || 0} | Face: {result.faceViolations || 0}
                            </span>
                          )}
                        </span>
                      </div>
                    )}
                    
                    <div className="stats-summary">
                      <p>Correct Answers: <span className="correct">{correctCount}</span></p>
                      <p>Wrong Answers: <span className="wrong">{wrongCount}</span></p>
                    </div>
                    <div className="questions-list">
                      <h4>Question Details</h4>
                      <table className="question-table">
                        <thead>
                          <tr>
                            <th>Question</th>
                            <th>Marked Answer</th>
                            <th>Correct Answer</th>
                            <th>Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {getResultQuestions(result).map((q) => {
                            const isCoding = q.isCoding || (!q.options && !q.isFreeText && q.correctAnswer === undefined);
                            const markedAnswer = result.answers?.[q.id];
                            const codingScore = result.codingScores?.[q.id];
                            const isCorrect = isCoding
                              ? codingScore === 1
                              : q.isFreeText
                                ? markedAnswer?.trim().replace(/\s+/g, ' ') === q.correctAnswer.trim().replace(/\s+/g, ' ')
                                : markedAnswer === q.correctAnswer;
                            const markKey = `${result.id}_${q.id}`;
                            return (
                              <tr key={q.id}>
                                <td>{q.question}</td>
                                <td>{isCoding ? <pre style={{ margin: 0, whiteSpace: 'pre-wrap', maxHeight: 200, overflow: 'auto' }}>{markedAnswer || 'Not answered'}</pre> : q.isFreeText ? <pre>{markedAnswer || 'Not answered'}</pre> : q.options ? q.options[markedAnswer] || 'Not answered' : 'Not answered'}</td>
                                <td>{isCoding ? <em>Manual review</em> : q.isFreeText ? <pre>{q.correctAnswer}</pre> : q.options ? q.options[q.correctAnswer] : '—'}</td>
                                <td className={isCoding ? '' : isCorrect ? 'status-correct' : 'status-wrong'}>
                                  {isCoding ? (
                                    <div className="coding-mark-controls">
                                      {codingScore !== undefined ? (
                                        <span className={codingScore === 1 ? 'status-correct' : 'status-wrong'}>
                                          {codingScore === 1 ? 'Correct' : 'Wrong'}
                                        </span>
                                      ) : (
                                        <>
                                          <button className="mark-correct-btn" onClick={async () => {
                                            const scores = { ...(result.codingScores || {}), [q.id]: 1 };
                                            const totalQ = getResultQuestions(result).length;
                                            const newCorrect = getCandidateStats({ ...result, codingScores: scores }).correctCount;
                                            const newScore = (newCorrect / totalQ) * 100;
                                            await onUpdateResult(result.id, { codingScores: scores, score: newScore });
                                          }}>✓ Correct</button>
                                          <button className="mark-wrong-btn" onClick={async () => {
                                            const scores = { ...(result.codingScores || {}), [q.id]: 0 };
                                            const totalQ = getResultQuestions(result).length;
                                            const newCorrect = getCandidateStats({ ...result, codingScores: scores }).correctCount;
                                            const newScore = (newCorrect / totalQ) * 100;
                                            await onUpdateResult(result.id, { codingScores: scores, score: newScore });
                                          }}>✗ Wrong</button>
                                        </>
                                      )}
                                    </div>
                                  ) : isCorrect ? 'Correct' : 'Wrong'}
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};