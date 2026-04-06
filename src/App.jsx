// import React, { useState, useEffect } from 'react';
// import { Login } from './components/Login/Login';
// import { Header } from './components/Header/Header';
// import { TestInterface } from './components/TestInterface/TestInterface';
// import { AdminDashboard } from './components/AdminDashboard/AdminDashboard';
// import { db } from './firebase';
// import { collection, addDoc, getDocs, deleteDoc, query, orderBy } from 'firebase/firestore';
// import './App.css';

// const App = () => {
//   const [user, setUser] = useState(null);
//   const [results, setResults] = useState([]);

//   // Fetch results from Firebase when admin logs in
//   useEffect(() => {
//     if (user?.type === 'admin') {
//       fetchResults();
//     }
//   }, [user]);

//   const fetchResults = async () => {
//     try {
//       const resultsQuery = query(collection(db, 'results'), orderBy('date', 'desc'));
//       const querySnapshot = await getDocs(resultsQuery);
//       const resultsData = querySnapshot.docs.map(doc => ({
//         id: doc.id,
//         ...doc.data()
//       }));
//       setResults(resultsData);
//     } catch (error) {
//       console.error('Error fetching results:', error);
//     }
//   };

//   const handleLogin = (userData) => {
//     setUser(userData);
//   };

//   const handleLogout = () => {
//     setUser(null);
//     setResults([]); // Clear results on logout
//   };

//   const handleTestComplete = async (result) => {
//     const updatedResult = { 
//       ...result, 
//       date: new Date().toISOString(),
//       timestamp: new Date() // Adding timestamp for Firebase ordering
//     };

//     try {
//       await addDoc(collection(db, 'results'), updatedResult);

//       // If admin is viewing, refresh the results
//       if (user?.type === 'admin') {
//         fetchResults();
//       }
//     } catch (error) {
//       console.error('Error saving test result:', error);
//     }
//   };

//   const handleReset = async () => {
//     try {
//       const querySnapshot = await getDocs(collection(db, 'results'));
//       const deletePromises = querySnapshot.docs.map(doc => deleteDoc(doc.ref));
//       await Promise.all(deletePromises);
//       setResults([]); // Clear results in state
//     } catch (error) {
//       console.error('Error resetting results:', error);
//     }
//   };

//   if (!user) {
//     return <Login onLogin={handleLogin} />;
//   }

//   return (
//     <div className="app">
//       <Header user={user} onLogout={handleLogout} />
//       <main className="main-content">
//         {user.type === 'admin' ? (
//           <AdminDashboard results={results} onReset={handleReset} />
//         ) : (
//           <TestInterface user={user} onComplete={handleTestComplete} />
//         )}
//       </main>
//     </div>
//   );
// };

// export default App;


import React, { useState, useEffect, useMemo } from 'react';
import { Login } from './components/Login/Login';
import { Header } from './components/Header/Header';
import { TestInterface } from './components/TestInterface/TestInterface';
import { AdminDashboard } from './components/AdminDashboard/AdminDashboard';
import { db } from './firebase';
import { collection, addDoc, getDocs, deleteDoc, query, orderBy, setDoc, doc, getDoc } from 'firebase/firestore';
import { DOMAINS } from './data/constants';
import './App.css';

const App = () => {
  const [user, setUser] = useState(() => {
    try {
      const storedUser = localStorage.getItem('auth_user');
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (error) {
      console.error('Error restoring user session:', error);
      return null;
    }
  });
  const [results, setResults] = useState([]);
  const [terminatedUsers, setTerminatedUsers] = useState([]);
  const [loginError, setLoginError] = useState(null);
  const [scheduledStartTime, setScheduledStartTime] = useState(null);
  const [scheduledEndTime, setScheduledEndTime] = useState(null);
  const [settingsLoaded, setSettingsLoaded] = useState(false);
  const [candidates, setCandidates] = useState([]);
  const [customQuestionsByDomain, setCustomQuestionsByDomain] = useState({});
  const [questionsLoaded, setQuestionsLoaded] = useState(false);

  // Fetch candidates and questions on app mount
  useEffect(() => {
    fetchCandidates();
    fetchCustomQuestions();
  }, []);

  // Fetch results, terminated users, and settings from Firebase when user logs in
  useEffect(() => {
    if (user?.type === 'admin') {
      fetchResults();
      fetchTerminatedUsers();
    }
    if (user) {
      fetchSettings();
    }
  }, [user]);

  const fetchCustomQuestions = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'customQuestions'));
      const customQ = {};
      querySnapshot.docs.forEach(d => {
        customQ[d.id] = d.data().questions;
      });
      setCustomQuestionsByDomain(customQ);
    } catch (error) {
      console.error('Error fetching custom questions:', error);
    } finally {
      setQuestionsLoaded(true);
    }
  };

  const handleSaveQuestions = async (domain, questions) => {
    try {
      await setDoc(doc(db, 'customQuestions', domain), { questions });
      setCustomQuestionsByDomain(prev => ({ ...prev, [domain]: questions }));
      return { success: true };
    } catch (error) {
      console.error('Error saving questions:', error);
      return { success: false };
    }
  };

  const handleResetQuestions = async (domain) => {
    try {
      await deleteDoc(doc(db, 'customQuestions', domain));
      setCustomQuestionsByDomain(prev => {
        const next = { ...prev };
        delete next[domain];
        return next;
      });
      return { success: true };
    } catch (error) {
      console.error('Error resetting questions:', error);
      return { success: false };
    }
  };

  const fetchCandidates = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'candidates'));
      const data = querySnapshot.docs.map(d => ({ id: d.id, ...d.data() }));
      setCandidates(data);
    } catch (error) {
      console.error('Error fetching candidates:', error);
    }
  };

  const handleAddCandidate = async (candidate) => {
    try {
      const docRef = await addDoc(collection(db, 'candidates'), candidate);
      setCandidates(prev => [...prev, { id: docRef.id, ...candidate }]);
    } catch (error) {
      console.error('Error adding candidate:', error);
    }
  };

  const handleBulkAddCandidates = async (candidateList) => {
    try {
      const createdCandidates = await Promise.all(
        candidateList.map(async (candidate) => {
          const docRef = await addDoc(collection(db, 'candidates'), candidate);
          return { id: docRef.id, ...candidate };
        })
      );

      setCandidates(prev => [...prev, ...createdCandidates]);
      return { success: true, count: createdCandidates.length };
    } catch (error) {
      console.error('Error bulk adding candidates:', error);
      return { success: false, count: 0 };
    }
  };

  const handleRemoveCandidate = async (id) => {
    try {
      await deleteDoc(doc(db, 'candidates', id));
      setCandidates(prev => prev.filter(c => c.id !== id));
    } catch (error) {
      console.error('Error removing candidate:', error);
    }
  };

  const fetchSettings = async () => {
    try {
      const settingsRef = doc(db, 'admin', 'settings');
      const settingsDoc = await getDoc(settingsRef);
      if (settingsDoc.exists()) {
        const data = settingsDoc.data();
        setScheduledStartTime(data.scheduledStartTime || null);
        setScheduledEndTime(data.scheduledEndTime || null);
      }
    } catch (error) {
      console.error('Error fetching settings:', error);
    } finally {
      setSettingsLoaded(true);
    }
  };

  const handleScheduleUpdate = async (startTime, endTime) => {
    try {
      const settingsRef = doc(db, 'admin', 'settings');
      await setDoc(settingsRef, {
        scheduledStartTime: startTime || null,
        scheduledEndTime: endTime || null
      }, { merge: true });
      setScheduledStartTime(startTime || null);
      setScheduledEndTime(endTime || null);
    } catch (error) {
      console.error('Error saving schedule:', error);
    }
  };

  const fetchResults = async () => {
    try {
      const resultsQuery = query(collection(db, 'results'), orderBy('date', 'desc'));
      const querySnapshot = await getDocs(resultsQuery);
      const resultsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setResults(resultsData);
    } catch (error) {
      console.error('Error fetching results:', error);
    }
  };

  const fetchTerminatedUsers = async () => {
    try {
      // Check if the 'admin' collection and 'terminatedUsers' document exist
      const adminCollectionRef = collection(db, 'admin');
      const terminatedUsersRef = doc(adminCollectionRef, 'terminatedUsers');

      const terminatedUsersDoc = await getDoc(terminatedUsersRef);

      if (terminatedUsersDoc.exists()) {
        setTerminatedUsers(terminatedUsersDoc.data().usernames || []);
      } else {
        // Create the document if it doesn't exist
        await setDoc(terminatedUsersRef, { usernames: [] });
        setTerminatedUsers([]);
      }
    } catch (error) {
      console.error('Error fetching terminated users:', error);
      // Continue with empty array to not block the app
      setTerminatedUsers([]);
    }
  };

  const handleLogin = async (userData) => {
    setLoginError(null);

    // Re-validate Firebase candidate credentials against latest DB state.
    // This ensures deleted candidates cannot log in with stale cached data.
    if (userData.type === 'employee' && userData.authSource === 'candidate') {
      try {
        const querySnapshot = await getDocs(collection(db, 'candidates'));
        const stillExists = querySnapshot.docs
          .map(d => d.data())
          .some(c =>
            c.username === userData.username &&
            c.password === userData.password &&
            (c.domain || 'General') === (userData.domain || 'General')
          );

        if (!stillExists) {
          setLoginError('This account was removed by admin. Please contact administrator.');
          return;
        }
      } catch (error) {
        console.error('Error re-validating candidate during login:', error);
        setLoginError('Unable to validate account right now. Please try again.');
        return;
      }
    }

    // Check if user is in the terminated list
    if (userData.type === 'employee') {
      try {
        // Create the 'admin' collection and 'terminatedUsers' document if they don't exist
        try {
          const terminatedUsersRef = doc(db, 'admin', 'terminatedUsers');
          const terminatedUsersDoc = await getDoc(terminatedUsersRef);

          if (terminatedUsersDoc.exists()) {
            const terminatedList = terminatedUsersDoc.data().usernames || [];
            if (terminatedList.includes(userData.username)) {
              setLoginError('Your account has been locked due to test integrity violations. Please contact your administrator.');
              return;
            }
          } else {
            // Create the document with an empty array if it doesn't exist
            await setDoc(terminatedUsersRef, { usernames: [] });
          }
        } catch (error) {
          console.error('Error checking terminated users:', error);
          // If we can't check the terminated list, log the error but still let the user log in
          // In a production app, you might want to be more strict about this
        }
      } catch (error) {
        console.error('Outer error checking terminated users:', error);
      }
    }

    // Proceed with login (store minimal safe session data)
    const sessionUser = {
      type: userData.type,
      username: userData.username,
      name: userData.name,
      domain: userData.domain
    };

    setUser(sessionUser);
    localStorage.setItem('auth_user', JSON.stringify(sessionUser));
  };
  const handleLogout = () => {
    setUser(null);
    setResults([]);
    setLoginError(null);
    localStorage.removeItem('auth_user');
  };

  const handleTestComplete = async (result) => {
    const updatedResult = {
      ...result,
      domain: result.domain || user?.domain || 'General',
      date: new Date().toISOString(),
      timestamp: new Date() // Adding timestamp for Firebase ordering
    };

    try {
      // Add the test result
      await addDoc(collection(db, 'results'), updatedResult);

      // If the test was terminated, add user to terminated list
      if (result.submittedBy === 'terminated') {
        const terminatedUsersDoc = await getDoc(doc(db, 'admin', 'terminatedUsers'));
        let terminatedList = [];

        if (terminatedUsersDoc.exists()) {
          terminatedList = terminatedUsersDoc.data().usernames || [];
        }

        // Add user to terminated list if not already in it
        if (!terminatedList.includes(user.username)) {
          terminatedList.push(user.username);
          await setDoc(doc(db, 'admin', 'terminatedUsers'), { usernames: terminatedList });
        }
      }

      // If admin is viewing, refresh the results
      if (user?.type === 'admin') {
        fetchResults();
        fetchTerminatedUsers();
      }
    } catch (error) {
      console.error('Error saving test result:', error);
    }
  };

  const handleUpdateResult = async (resultId, updates) => {
    try {
      const resultRef = doc(db, 'results', resultId);
      const resultDoc = await getDoc(resultRef);
      if (!resultDoc.exists()) return { success: false };
      const current = resultDoc.data();
      await setDoc(resultRef, { ...current, ...updates });
      setResults(prev => prev.map(r => r.id === resultId ? { ...r, ...updates } : r));
      return { success: true };
    } catch (error) {
      console.error('Error updating result:', error);
      return { success: false };
    }
  };

  const handleReset = async () => {
    try {
      // Delete all results
      const querySnapshot = await getDocs(collection(db, 'results'));
      const deletePromises = querySnapshot.docs.map(doc => deleteDoc(doc.ref));
      await Promise.all(deletePromises);

      // Reset terminated users list
      await setDoc(doc(db, 'admin', 'terminatedUsers'), { usernames: [] });

      // Update state
      setResults([]);
      setTerminatedUsers([]);
    } catch (error) {
      console.error('Error resetting data:', error);
    }
  };

  const effectiveQuestionsByDomain = useMemo(() => {
    return { ...customQuestionsByDomain };
  }, [customQuestionsByDomain]);

  if (!user) {
    return <Login onLogin={handleLogin} error={loginError} candidates={candidates} />;
  }

  const activeQuestionSet = effectiveQuestionsByDomain[user?.domain || 'General'] || [];

  return (
    <div className="app">
      <Header user={user} onLogout={handleLogout} />
      <main className="main-content">
        {user.type === 'admin' ? (
          <AdminDashboard
            results={results}
            onReset={handleReset}
            onUpdateResult={handleUpdateResult}
            scheduledStartTime={scheduledStartTime}
            scheduledEndTime={scheduledEndTime}
            onScheduleUpdate={handleScheduleUpdate}
            candidates={candidates}
            onAddCandidate={handleAddCandidate}
            onBulkAddCandidates={handleBulkAddCandidates}
            onRemoveCandidate={handleRemoveCandidate}
            questionsByDomain={effectiveQuestionsByDomain}
            onSaveQuestions={handleSaveQuestions}
            onResetQuestions={handleResetQuestions}
            customQuestionsByDomain={customQuestionsByDomain}
          />
        ) : (
          <TestInterface
            user={user}
            onComplete={handleTestComplete}
            questions={activeQuestionSet}
            scheduledStartTime={scheduledStartTime}
            scheduledEndTime={scheduledEndTime}
            settingsLoaded={settingsLoaded}
            questionsLoaded={questionsLoaded}
            testAlreadyCompleted={
              localStorage.getItem(`test_completed_${user.id || user.username || user.name}`) === 'true'
            }
          />
        )}
      </main>
    </div>
  );
};

export default App;