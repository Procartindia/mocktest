export const DOMAINS = [
  'AIML',
  'AIDS',
  'Fullstack',
  'Data Science and Analytics',
  'UI/UX Design',
  'IOT and Web Connectivity',
  'Advanced IOT and Embedded',
  'Software Testing',
  'Cyber Security',
  'General'
];

export const DEFAULT_CREDENTIALS = {
  admin: { username: 'admin', password: 'admin@123' },
  employees: [
    { username: 'Test1', password: 'test123', name: 'Test', domain: 'General' },
  ],
};


// Questions are managed entirely from the Admin Dashboard and stored in Firebase.
// No hardcoded questions - admin uploads them via the JSON editor in the dashboard.
export const QUESTIONS_BY_DOMAIN = {};

export const getQuestionsForDomain = (domain = 'General') => {
  return QUESTIONS_BY_DOMAIN[domain] || [];
};
