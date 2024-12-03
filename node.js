const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const session = require('express-session');

app.use(bodyParser.json());
app.use(session({ secret: 'geheim', resave: false, saveUninitialized: true }));

// Datenbank-Mockup (ersetze durch echte Datenbank wie MongoDB)
const users = [
  { username: 'lehrer1', password: 'passwort123', role: 'lehrer' },
  { username: 'schueler1', password: 'passwort456', role: 'schueler' },
];

// Login-Route
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);

  if (user) {
    req.session.user = user;
    res.json({
      success: true,
      redirectURL: user.role === 'lehrer' ? '/lehrer/dashboard.html' : '/schueler/dashboard.html',
    });
  } else {
    res.json({ success: false, message: 'Ungültige Anmeldedaten' });
  }
});

app.listen(3000, () => console.log('Server läuft auf Port 3000'));
